import express from "express";
import getJobCount from "../api/jobCount";
import { createSeed } from "../api/particleSeed";

const router = express.Router();

router.get('/job-range', async (_req, res) => {
  try {
    const countResult = await getJobCount();

    if (!countResult.success) {
      res.status(500).json({ status: countResult.success, error: countResult.error, data: countResult.data});
      
      return;   
    }

    const animationSeed = createSeed(countResult.numberOfJobs);
    res.json({ animationSeed });
    
    return;
 
  } catch (err) {
    
    console.error("Error in /job-range:", err);
    
    res.status(500).json({ error: "Internal server error" }); 
    return;
  }
});

export default router;
