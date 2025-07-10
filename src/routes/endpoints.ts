import express from "express";
import getJobCount from "../api/jobCount";
import { createSeed } from "../api/particleSeed";

const router = express.Router();

router.get('/job-data', async (req, res) => {
  const count =  await getJobCount();

  if(!count.success) {
    res.send(count);
    return;
  }
  
  const seed = createSeed(count.numberOfJobs);
  
  res.send(seed);
});

export default router;