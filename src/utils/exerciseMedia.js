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
    || exercise.imageUrl
    || exercise.image
    || exercise.gif
    || exercise.animatedGifUrl
    || exercise.animationUrl
    || exercise.mediaUrl;

  return fixHttps(direct);
};

const isRapidApiImageEndpoint = (url) => (
  typeof url === 'string'
  && url.includes('exercisedb.p.rapidapi.com/image')
);

export const loadExerciseMedia = async (exercise, resolution = 360) => {
  if (!exercise) {
    return {
      src: getExercisePhotoFallback(exercise),
      isAnimated: false,
      source: 'fallback',
    };
  }

  const directUrl = getDirectGifUrl(exercise);
  if (directUrl && !isRapidApiImageEndpoint(directUrl)) {
    return { src: directUrl, isAnimated: true, source: 'api-direct' };
  }

  if (exercise.id) {
    const blobUrl = await fetchExerciseGifBlobUrl(exercise.id, resolution);
    if (blobUrl) {
      return { src: blobUrl, isAnimated: true, source: 'api-blob' };
    }
  }

  if (directUrl) {
    return { src: directUrl, isAnimated: true, source: 'api-image-url' };
  }

  return {
    src: getExercisePhotoFallback(exercise),
    isAnimated: false,
    source: 'photo-fallback',
  };
};
