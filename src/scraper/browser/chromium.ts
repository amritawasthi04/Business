import chromium from "@sparticuz/chromium";
import fs from "fs";
import path from "path";

/**
 * Resolves browser options depending on whether the code is running on Vercel Serverless or locally.
 * @param headless Whether browser should launch in headless mode
 */
export async function getChromiumLaunchOptions(headless: boolean = true): Promise<{
  args: string[];
  defaultViewport: any;
  executablePath: string;
  headless: boolean | "shell";
}> {
  // Vercel deployment check or non-Windows system
  const isVercel = !!process.env.VERCEL || process.platform !== "win32";

  if (isVercel) {
    let executablePath = "";
    try {
      executablePath = await chromium.executablePath();
    } catch (err) {
      console.warn("Standard executablePath call failed, trying fallback bin path", err);
    }

    if (!executablePath || !fs.existsSync(executablePath)) {
      const localBinPath = path.join(process.cwd(), "node_modules/@sparticuz/chromium/bin");
      console.log("Checking fallback localBinPath:", localBinPath);
      if (fs.existsSync(localBinPath)) {
        executablePath = await chromium.executablePath(localBinPath);
      } else {
        console.error("localBinPath does not exist either!");
      }
    }

    return {
      args: chromium.args,
      defaultViewport: null, // Allow custom viewport configuration in Page manager
      executablePath,
      headless: headless ? ((chromium as any).headless as boolean | "shell") : false,
    };
  }

  // Local development lookup on Windows
  const localPaths = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    `${process.env.LOCALAPPDATA || ""}\\Google\\Chrome\\Application\\chrome.exe`,
    "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  ];

  let executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || "";
  if (!executablePath) {
    for (const path of localPaths) {
      if (path && fs.existsSync(path)) {
        executablePath = path;
        break;
      }
    }
  }

  if (!executablePath || !fs.existsSync(executablePath)) {
    throw new Error(
      "Local Google Chrome application not found. Please install Chrome or configure the PUPPETEER_EXECUTABLE_PATH environment variable."
    );
  }

  return {
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
    ],
    defaultViewport: null,
    executablePath,
    headless: headless ? "shell" : false,
  };
}
