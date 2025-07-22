import {CheckJobCountResult} from "../../models/types";
import {errorString } from '../../config/error-handlers';
import {getJobCountFromDb, getJobCountFromAPI, checkLastRunDate, saveAndUpdate} from './queries'

import dotenv from 'dotenv';

dotenv.config();

const HOURS_BEFORE_DATE_RESET = 48;

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
    if (hours <= HOURS_BEFORE_DATE_RESET) {
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

export default getJobCount;