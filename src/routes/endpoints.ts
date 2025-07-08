import express from "express";
import getInsights from "../market-insights"

const router = express.Router();

router.get('/job-data', async (req, res) => {
  const numberOfJobs =  await getInsights();
  console.log("number of jobs: ", numberOfJobs)
  res.send(numberOfJobs);
});

export default router;