import { getDirectGifUrl } from './exerciseMedia';
import { getExercisePhotoFallback } from './exercisePhotoFallback';

export { fixHttps, getDirectGifUrl as getExerciseImageUrl, loadExerciseMedia } from './exerciseMedia';
export { getExercisePhotoFallback };

export const parseInstructions = (instructions) => {
  if (!Array.isArray(instructions)) return [];

  return instructions.map((raw, index) => {
    const text = String(raw)
      .replace(/^Step:\s*\d+\s*/i, '')
      .replace(/^\d+\.\s*/, '')
      .trim();

    return {
      number: index + 1,
      text: text || `Step ${index + 1}`,
    };
  });
};

export const normalizeExercise = (exercise) => {
  if (!exercise) return null;

  const steps = parseInstructions(exercise.instructions);

  return {
    ...exercise,
    gifUrl: getDirectGifUrl(exercise),
    photoFallback: getExercisePhotoFallback(exercise),
    steps,
    stepCount: steps.length,
    secondaryMuscles: exercise.secondaryMuscles || [],
    description: exercise.description || '',
    difficulty: exercise.difficulty || '',
    category: exercise.category || '',
  };
};
