import { Page } from "puppeteer-core";
import { IPageConfig } from "./page.interface";

/**
 * Standard configuration properties for loading a target URL.
 */
export interface IPageLoadConfig {
  /** Target destination URL */
  url: string;
  
  /** Max operation timeout in milliseconds */
  timeout?: number;
  
  /** Navigation wait constraint */
  waitUntil?: "load" | "domcontentloaded" | "networkidle0" | "networkidle2";
  
  /** Triggers autoScroll action post-load */
  autoScroll?: boolean;
  
  /** Pixels to scroll in each iteration step */
  scrollDistance?: number;
  
  /** Milliseconds delay between scrolls */
  scrollDelay?: number;
  
  /** Maximum scroll iterations allowed */
  maxScrolls?: number;
  
  /** Extra milliseconds wait duration after loading finishes */
  actionDelay?: number;
  
  /** Alias for actionDelay */
  extraDelay?: number;
  
  /** Configuration parameters for the opened page */
  pageConfig?: IPageConfig;
}

/**
 * Result schema returned by the page loader.
 */
export interface IPageLoadResult {
  /** Resolved destination URL */
  url: string;
  
  /** HTTP Response status code (e.g. 200) */
  status: number;
  
  /** Page head HTML title */
  title: string;
  
  /** Complete resolved string body */
  html: string;
  
  /** Execution time duration in milliseconds */
  loadTime: number;
}

/**
 * Helper wrapper for fully loaded pages.
 */
export interface ILoadedPageWrapper {
  page: Page;
  result: IPageLoadResult;
}
