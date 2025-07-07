import express from "express";
import { nextTick } from "process";
// import getInsights from "../market-insights";

const router = express.Router();

router.get('/job-data', (req, res) => {
  // console.log('hit endpoint')
  // const numberOfJobs = getInsights();
  console.log('endpoint')
  res.send('hello world');
});

export default router;