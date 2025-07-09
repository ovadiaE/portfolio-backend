import express from "express";
import getJobCount from "../jobCount"

const router = express.Router();

router.get('/job-data', async (req, res) => {
  const count =  await getJobCount();

  if(count.success) {
    console.log(count.numberOfJobs)
  }

  res.send('hello world');
});

export default router;