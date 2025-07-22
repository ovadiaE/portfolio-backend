import db from '../../config/config';
import axios from 'axios';
import dotenv from 'dotenv';
import {JobOption, CheckAPIRequestResult, CheckJobCountResult, CheckLastRunResult} from '../../models/types';
import {checkQueryResult, errorString} from '../../config/error-handlers';

dotenv.config();

const API_URL = 'https://api.apijobs.dev/v1/job/search'
const API_KEY = process.env.API_JOBS_KEY;

const SELECT_JOB_COUNT = `SELECT count FROM data`;
const UPDATE_JOB_COUNT = `UPDATE data SET count = $1`;
const UPDATE_LAST_RUN  = `UPDATE data SET last_run = $1`;
const SELECT_ALL       = `SELECT * FROM data;`;

const defaultRequestPayload = {
    sort_by: 'published_at',
    sort_order: 'desc',
    from: 0,
    q: 'software engineer',
    country: 'United States',
    employment_type: 'PERMANENT',
    facets: ['country', 'employment_type']
  };

export async function getJobCountFromAPI():Promise<CheckAPIRequestResult> { 
    try {
      if (!API_KEY) {
        throw new Error('API_JOBS_KEY not set in environment variables');
      }
  
      const response = await axios.post<JobOption>(
        API_URL,
        defaultRequestPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            'apiKey': API_KEY
          }
        }
      );
  
      const data = response.data;
      return { success: true,  data: data.total};
      
  
    } catch (error) {
        return {success: false, error: error};
    }
  }

  export async function getJobCountFromDb ():Promise<CheckJobCountResult> {
    const data = await db.query(SELECT_JOB_COUNT)

    if (!checkQueryResult (data) ) {
      return { success: false, error: "failed to retrieve data from getJobCountFromDb"};
    };
  
    return {success: true, numberOfJobs: data.rows[0].job_count};
  };

  export async function saveAndUpdate (count: number):Promise<boolean> {
    
    try {
      const result = await db.query(UPDATE_JOB_COUNT, [count]);
      
      if (result.rowCount !== 1) {
        return false
      }    
      
      const updatedLastRun = await updateLastRun();
      
      if(!updatedLastRun) return false
      
      return true;
    
    }
    catch {
      return false;
    }
  
  }

export async function updateLastRun():Promise<boolean> { 
  
  try {  
    const currentDate = new Date(Date.now()).toISOString();
    const saveDate = await db.query(UPDATE_LAST_RUN , [currentDate]);
  
    if ((saveDate).rowCount !== 1) {
      console.warn("Unexpected number of rows updated:", saveDate.rowCount);
      return false;
    }

    return true
  }
  catch (error) {
   
    console.log(`failed to update last_ran from updateLastRan: ${error}`);
   
    return false;
  }
}; 


export async function checkLastRunDate ():Promise<CheckLastRunResult>{
  
  try {
  
    const data = await db.query( SELECT_ALL );

    if (!checkQueryResult (data) ) {
      return { success: false, error: errorString('failed to query DB in checkLastRunDate'), data: data};
    };
    
    const lastRun = Number(data.rows[0].last_run);
    const currentDate = getCurrentDate();

    const timeDifference = (currentDate - lastRun);
    const differenceInHours = timeDifference / (1000 * 60 * 60); 
    
    return { success: true, hoursSinceLastRun: differenceInHours };
 
  } 
  
  catch(error) {
    return { success: false, error: error};
  }
}; 

function getCurrentDate () {
  const currentDate = Date.now();
  return currentDate;
} 