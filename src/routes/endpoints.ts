import express from "express";
import getJobcount from "../market-insights"

const router = express.Router();

router.get('/job-data', async (req, res) => {
  const numberOfJobs =  await getJobcount();
  console.log("number of jobs: ", numberOfJobs)
  res.send(numberOfJobs);
  res.send('hello world');
});

export default router;