import { getExercisePhotoFallback } from './exercisePhotoFallback';

// Preserving your original boilerplate media exports so other helper components don't crash
export { fixHttps, loadExerciseMedia } from './exerciseMedia';
export { getExercisePhotoFallback };

/**
 * Parses raw instruction string arrays from your exercises.json dataset
 * and converts them into structured step objects matching your Material UI lists.
 */
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

/**
 * Normalizes incoming data formats from our local database backend 
 * into the exact structural keys that your frontend view layout components expect.
 */
export const normalizeExercise = (exercise) => {
  if (!exercise) return null;

  // 1. Process instructions safely using your text parser loop
  const steps = parseInstructions(exercise.instructions);

  // 2. Extract the first primary muscle to serve as our central category tracker
  const targetMuscle = (exercise.primaryMuscles && exercise.primaryMuscles[0]) || 'general';

  // 3. Clean up the ID string structure to avoid space padding drops
  const cleanId = String(exercise.id || '').trim();

  // 4. Convert local asset paths into live backend asset URLs pointing to port 5000
  let localGif = '';
  if (exercise.images && exercise.images[0]) {
    localGif = `https://gymfit-api.onrender.com/images/${exercise.images[0]}`;
  } else if (cleanId) {
    localGif = `https://gymfit-api.onrender.com/images/${cleanId}/0.jpg`;
  } else if (exercise.gifUrl) {
    localGif = exercise.gifUrl;
  }

  return {
    ...exercise,
    id: cleanId,
    name: exercise.name || 'Unnamed Exercise',
    bodyPart: targetMuscle,      // Maps primary muscle to fix the horizontal slider tracking arrays
    target: targetMuscle,        // Populates your secondary UI Chip indicators
    gifUrl: localGif,            // Feeds directly into your custom image rendering engines
    photoFallback: getExercisePhotoFallback(exercise),
    steps,
    stepCount: steps.length,
    secondaryMuscles: exercise.secondaryMuscles || [],
    description: exercise.description || `An effective routine targeting your ${targetMuscle}.`,
    difficulty: exercise.level || 'Intermediate', // Maps 'level' key from JSON to difficulty
    category: exercise.category || 'Strength',    // Maps 'category' key from JSON to category wrapper
  };
};