import axios from 'axios';
import JobOption from "../models/types";
import dotenv from 'dotenv';

dotenv.config();

const API_URL =  process.env.API_URL;
const API_KEY = process.env.API_JOBS_KEY;


const defaultRequestPayload = {
  sort_by: 'published_at',
  sort_order: 'desc',
  from: 0,
  q: 'software engineer',
  country: 'United States',
  employment_type: 'PERMANENT',
  facets: ['country', 'employment_type']
};

const getJobcount = async (): Promise<number | null> => {

  //connect to DB 

  // check date string 

  //if it has been greater or equal to 2 days since returned unix time stamp make api call to job count site and store new value in DB 
  //if it has been less than 2 days since returned unix time stamp get value stored in DB under job_count row
  //return current value of job_count row

  const count = await requestJobCount();

  return count;
};

async function requestJobCount():Promise<number> { 
  try {
    if (!API_KEY) {
      throw new Error('API_JOBS_KEY not set in environment variables');
    }

    const response = await axios.post<JobOption>(
      API_URL || '',
      defaultRequestPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'apiKey': API_KEY
        }
      }
    );

    const data = response.data;
    console.log(`Total jobs found: ${data.total}`);
    return data.total;

  } catch (error) {
    console.error('Failed to fetch insights:', error);
    return 0;
  }
}

export default getJobcount;
