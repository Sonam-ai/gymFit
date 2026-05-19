import { generateWithAI } from './aiWorkoutGenerator';
import { generateCustomWorkoutPlan } from './workoutGeneratorLogic';

export const generateWorkoutPlan = async (params) => {
  const aiPlan = await generateWithAI(params);
  if (aiPlan?.sections?.length) {
    return aiPlan;
  }

  return generateCustomWorkoutPlan(params);
};

export {
  GOAL_OPTIONS,
  EQUIPMENT_OPTIONS,
  EXPERIENCE_OPTIONS,
  DURATION_OPTIONS,
} from './workoutGeneratorLogic';
