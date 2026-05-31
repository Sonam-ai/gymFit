import { getAllBodyPartPhoto } from './exercisePhotoFallback';

/**
 * Converts category string tokens dynamically to local public path assets
 * Example: "Lower Legs" -> /assets/exercise_images/lower-legs.png
 */
export const getBodyPartImage = (bodyPart) => {
  if (!bodyPart) return getAllBodyPartPhoto();

  // Convert "Lower Legs" to a clean "lower-legs" filename string format
  const cleanKey = String(bodyPart)
    .toLowerCase()
    .trim()
    .replace(/[\s/]+/g, '-');

  // Return the direct path to your public directory asset copy
  return `/assets/exercise_images/${cleanKey}.png`;
};

const bodyPartImages = {};
export default bodyPartImages;