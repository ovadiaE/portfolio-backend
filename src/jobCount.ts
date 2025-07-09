import {CheckJobCountResult} from "../models/types";
import {errorString } from '../config/error-handlers';
import {getJobCountFromDb, getJobCountFromAPI, checkLastRunDate, saveAndUpdate} from './api/queries'

import dotenv from 'dotenv';

dotenv.config();

const HOURS_BEFORE_DATA_RESET = 48;

const getJobCount = async (): Promise<CheckJobCountResult> => {
  try {
    const lastRun = await checkLastRunDate();

    if (!lastRun.success) {
      return {
        success: false,
        error: 'Failed to check time of last run in function: getJobCount',
      };
    }

    const hours = lastRun.hoursSinceLastRun;

    // CASE 1: Use DB value if it's recent
    if (hours < HOURS_BEFORE_DATA_RESET) {
      const count = await getJobCountFromDb();

      return count.success
        ? { success: true, numberOfJobs: count.numberOfJobs }
        : { success: false, error: 'Failed to retrieve job count from DB' };
    }

    // CASE 2: Pull from API and update DB
    const jobCount = await getJobCountFromAPI();

    if (!jobCount.success) {
      return { success: false, error: 'Failed to retrieve jobCount from API' };
    }

    const saved = await saveAndUpdate(jobCount.data);

    return saved
      ? { success: true, numberOfJobs: jobCount.data }
      : { success: false, error: 'Failed to update count or date in DB' };

  } catch (error) {
    return { success: false, error };
  }
};

// async function getJobCount():Promise<CheckJobCountResult>  {

//   try {
//     const lastRun = await checkLastRunDate(); 

//     if(!lastRun.success) {
//       return { success: false,  error: 'failed to check time of last run in function: getJobCount'};
//     } 
    
//     //If it's been less than 48 hours since last run, fetch data straight from DB
//     if(lastRun.hoursSinceLastRun < HOURS_BEFORE_DATA_RESET) {

//       const count = await getJobCountFromDb();

//       if(count.success) {
//         console.log('Im in the function that pulls job values straight from the db mordyyyyy')
//         return {success: true, numberOfJobs: count.numberOfJobs};
//       } 
//       else {
//         return {success: false, error: 'failed to retrieve job count from DB'}
//       };

//     } 
//     // Otherwise fetch from API and reset all values in DB
//     if(lastRun.hoursSinceLastRun >= HOURS_BEFORE_DATA_RESET ) { 
//       const jobCount = await getJobCountFromAPI(); 
      
//       if(jobCount.success) {
//         const saved = await saveAndUpdate(jobCount.data);

//         if(saved) {
//           console.log('im in the function that pulls job count from the api and resets values in the db mordyyy');
//           return {success: true, numberOfJobs: jobCount.data};
//         }
//         else {
//           return {success: false, error: "failed to update count or date string in DB"}
//         }
//       }

//       return {success: false, error:'failed to retrieve jobCount from API'};

//     }

//   }
  
//   catch(error) {
//    return {success: false, error: error};
//   }
 
//   //fallback return 
//   return { success: false, error: 'Unhandled state in getJobCount' };
// };

export default getJobCount;