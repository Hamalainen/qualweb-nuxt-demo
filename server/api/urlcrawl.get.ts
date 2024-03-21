'use strict';

import { QualWeb, generateEARLReport } from '@qualweb/core';
import type { CrawlOptions } from '@qualweb/crawler';

 const crawlDomain = async (domainToCrawl:any) => {
    const plugins = {
      // Check https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-adblocker
      adBlock: true, // Default value = false
      // Check https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth
      stealth: true // Default value = false
    };
    const qualweb = new QualWeb(plugins);

    const clusterOptions = {
      maxConcurrency: 5, // Performs several urls evaluations at the same time - the higher the number given, more resources will be used. Default value = 1
      timeout: 60 * 1000, // Timeout for loading page. Default value = 30 seconds
      monitor: true // Displays urls information on the terminal. Default value = false
    };

    const launchOptions = {
    // check https://github.com/puppeteer/puppeteer/blob/v10.1.0/docs/api.md#puppeteerlaunchoptions
      // In most cases there's no need to give additional options. Just leave the field undefined
    };

    // Starts the QualWeb core engine
    await qualweb.start(clusterOptions, launchOptions);

    // QualWeb evaluation report
    // const qualwebOptions = {
        
      const qualwebOptions =  <CrawlOptions>{
            maxDepth: -1, // max depth to search, 0 to search only the given domain. Default value = -1 (search everything)
            maxUrls: -1, // max urls to find. Default value = -1 (search everything)
            timeout: -1, // how many seconds the domain should be crawled before it ends. Default value = -1 (never stops)
            maxParallelCrawls: 10, // max urls to crawl at the same time. Default value = 5
            logging: true // logs domain, current depth, urls found and time passed to the terminal
          }
    
   
    const urls = await qualweb.crawl(domainToCrawl, qualwebOptions);

    console.log(urls);
    //  {
    //    "url": "report",
    //    "url2": "report2"
    //  }

    // Stops the QualWeb core engine
    await qualweb.stop();
    return urls
  };





export default defineEventHandler((event) => {
    const query = getQuery(event)
    return crawlDomain(query.domain)
  })