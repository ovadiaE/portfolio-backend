import axios from 'axios';
import JobOption from "../models/types";
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'https://api.apijobs.dev/v1/job/search';

const defaultRequestPayload = {
  sort_by: 'published_at',
  sort_order: 'desc',
  from: 0,
  q: 'software engineer',
  country: 'United States',
  employment_type: 'PERMANENT',
  facets: ['country', 'employment_type']
};

const getInsights = async (): Promise<number | null> => {
  try {
    const apiKey = process.env.API_JOBS_KEY;
    if (!apiKey) {
      throw new Error('API_JOBS_KEY not set in environment variables');
    }

    const response = await axios.post<JobOption>(
      API_URL,
      defaultRequestPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'apiKey': apiKey
        }
      }
    );

    const data = response.data;
    console.log(`Total jobs found: ${data.total}`);
    return data.total;

  } catch (error) {
    console.error('Failed to fetch insights:', error);
    return null;
  }
};

export default getInsights;
