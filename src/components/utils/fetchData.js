export const exerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const EXERCISE_FETCH_LIMIT = 2000;

export const getAllExercisesUrl = () => (
  `https://exercisedb.p.rapidapi.com/exercises?limit=${EXERCISE_FETCH_LIMIT}&offset=0`
);

export const getBodyPartExercisesUrl = (bodyPart) => (
  `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(bodyPart)}?limit=${EXERCISE_FETCH_LIMIT}&offset=0`
);

export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.error('Exercise API error:', response.status, response.statusText);
      return null;
    }

    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      return response.json();
    }

    return response;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    return null;
  }
};

const gifBlobCache = new Map();

export const fetchExerciseGifBlobUrl = async (exerciseId, resolution = 360) => {
  if (!exerciseId) return null;

  const cacheKey = `${exerciseId}-${resolution}`;
  if (gifBlobCache.has(cacheKey)) {
    return gifBlobCache.get(cacheKey);
  }

  try {
    const url = `https://exercisedb.p.rapidapi.com/image?exerciseId=${encodeURIComponent(exerciseId)}&resolution=${resolution}`;

    const response = await fetch(url, exerciseOptions);

    if (!response.ok) {
      return null;
    }

    const blob = await response.blob();

    if (!blob.type.startsWith('image/')) {
      return null;
    }

    const blobUrl = URL.createObjectURL(blob);
    gifBlobCache.set(cacheKey, blobUrl);
    return blobUrl;
  } catch (error) {
    console.error('Failed to load exercise GIF:', error);
    return null;
  }
};

export const revokeExerciseGifUrl = (blobUrl) => {
  if (blobUrl?.startsWith('blob:')) {
    URL.revokeObjectURL(blobUrl);
  }
};
