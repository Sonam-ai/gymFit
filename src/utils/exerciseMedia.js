import { fetchExerciseGifBlobUrl } from '../components/utils/fetchData';
import { getExercisePhotoFallback } from './exercisePhotoFallback';

export const fixHttps = (url) => {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('http://')) return url.replace('http://', 'https://');
  return url;
};

export const getDirectGifUrl = (exercise) => {
  if (!exercise) return '';

  const direct =
    exercise.gifUrl
    || exercise.image
    || exercise.imageUrl
    || exercise.gif
    || exercise.mediaUrl;

  return fixHttps(direct);
};

export const loadExerciseMedia = async (exercise, resolution = 360) => {
  if (!exercise) {
    return {
      src: getExercisePhotoFallback(exercise),
      isAnimated: false,
      source: 'fallback',
    };
  }

  if (exercise.id) {
    const blobUrl = await fetchExerciseGifBlobUrl(exercise.id, resolution);
    if (blobUrl) {
      return { src: blobUrl, isAnimated: true, source: 'api-blob' };
    }
  }

  const directUrl = getDirectGifUrl(exercise);
  if (directUrl) {
    return { src: directUrl, isAnimated: true, source: 'api-direct' };
  }

  if (exercise.id) {
    const legacyUrl = fixHttps(`https://static.exercisedb.dev/media/${exercise.id}.gif`);
    return { src: legacyUrl, isAnimated: true, source: 'cdn' };
  }

  return {
    src: getExercisePhotoFallback(exercise),
    isAnimated: false,
    source: 'photo-fallback',
  };
};
