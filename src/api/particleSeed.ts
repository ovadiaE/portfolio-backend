const HIGH = 1200;
const MED = 1000;

export function createSeed(jobCount: number): string {

    if (jobCount >= HIGH) return 'high';
  
    if (jobCount >= MED) return 'medium';
  
    return 'low';

};