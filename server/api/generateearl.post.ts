'use strict';

import {  generateEARLReport } from '@qualweb/core';

 const generateEarl = async (reports:any) => {
  const earlOptions = {
 
  };

  // if you want an EARL report
  const earlReports = generateEARLReport(reports, earlOptions);

  console.log(earlReports);
  return earlReports
  };

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return generateEarl(body)
  })