import express from "express";
import getJobCount from "../api/jobCount";
import { createSeed } from "../api/particleSeed";

const router = express.Router();

router.get('/particle-seed', async (_req, res) => {
  try {
    const countResult = await getJobCount();

    if (!countResult.success) {
      res.status(500).json({ error: countResult.error });
      
      return;   
    }

    const animationSeed = createSeed(countResult.numberOfJobs);
  
    res.json({ animationSeed });
    
    return;
 
  } catch (err) {
    
    console.error("Error in /particle-seed:", err);
    
    res.status(500).json({ error: "Internal server error" }); 
    return;
  }
});

export default router;
