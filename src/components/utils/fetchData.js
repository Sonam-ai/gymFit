// Point directly to your running local Node/Express server
const LOCAL_BACKEND_BASE_URL = 'https://gymfit-api.onrender.com';

export const exerciseOptions = {};
export const youtubeOptions = {};

export const EXERCISE_FETCH_LIMIT = 0;
export const EXERCISE_IMAGE_RESOLUTION = 360;

/**
 * Core utility function to fetch data from your local backend.
 */
export const fetchData = async (url, options = {}) => {
  try {
    // If the incoming URL is already fully qualified, use it; otherwise point to local host
    const targetUrl = url.startsWith('http') ? url : `${LOCAL_BACKEND_BASE_URL}${url}`;

    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      const rawBody = await response.text();
      console.log('[API] Request failed', {
        url: targetUrl,
        status: response.status,
        statusText: response.statusText,
        rawBody,
      });
      return null;
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.log('[API] Request threw an error before response', {
      url,
      message: error.message,
    });
    return null;
  }
};

/**
 * Maps the old layout routes straight to your custom backend endpoints
 */
export const getAllExercisesUrl = () => '/api/exercises';

export const getBodyPartExercisesUrl = (bodyPart) => 
  `/api/exercises/bodypart/${encodeURIComponent(bodyPart.toLowerCase())}`;

export const buildExerciseImageUrl = (exerciseId) => {
  if (!exerciseId) return '';
  return `${LOCAL_BACKEND_BASE_URL}/api/exercises/details/${encodeURIComponent(exerciseId)}`;
};

export const fetchExerciseGifBlobUrl = async (exerciseId) => {
  if (!exerciseId) return null;
  try {
    const exerciseDetails = await fetchData(`/api/exercises/details/${exerciseId}`);
    return exerciseDetails?.gifUrl || exerciseDetails?.image || null;
  } catch (e) {
    return null;
  }
};

export const revokeExerciseGifUrl = (blobUrl) => {};