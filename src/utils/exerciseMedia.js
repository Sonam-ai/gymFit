import { getExercisePhotoFallback } from './exercisePhotoFallback';

export const fixHttps = (url) => url;

/**
 * Maps exercise IDs directly to your public assets folder string.
 * Example: /assets/exercise_images/0001.gif
 */
export const getDirectGifUrl = (exercise) => {
  if (!exercise) return '';

  const targetId = exercise.id || exercise._id;
  if (!targetId) return '';

  // Zero-pad the ID to match your filenames exactly (e.g., "0003")
  const cleanId = String(targetId).padStart(4, '0');

  // Direct reference to the public folder directory
  return `/assets/exercise_images/${cleanId}.gif`;
};

/**
 * Delivers the public URL smoothly to your components
 */
export const loadExerciseMedia = async (exercise, resolution = 360) => {
  if (!exercise) {
    return {
      src: getExercisePhotoFallback(exercise),
      isAnimated: false,
      source: 'fallback',
    };
  }

  const localPath = getDirectGifUrl(exercise);

  return {
    src: localPath,
    isAnimated: true,
    source: 'public-folder-direct',
  };
};