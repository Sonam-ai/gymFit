const RAPID_API_KEY = process.env.REACT_APP_RAPID_API_KEY;
const EXERCISE_DB_HOST = 'exercisedb.p.rapidapi.com';
const YOUTUBE_HOST = 'youtube-search-and-download.p.rapidapi.com';

const createRapidApiOptions = (host) => ({
  method: 'GET',
  headers: {
    'x-rapidapi-host': host,
    'x-rapidapi-key': RAPID_API_KEY,
  },
});

export const exerciseOptions = createRapidApiOptions(EXERCISE_DB_HOST);

export const youtubeOptions = createRapidApiOptions(YOUTUBE_HOST);

export const EXERCISE_FETCH_LIMIT = 0;
export const EXERCISE_IMAGE_RESOLUTION = 360;

const EXERCISE_DB_BASE_URL = `https://${EXERCISE_DB_HOST}`;

const withExerciseLimit = (url, limit = EXERCISE_FETCH_LIMIT) => {
  const nextUrl = new URL(url);

  if (!nextUrl.searchParams.has('limit')) {
    nextUrl.searchParams.set('limit', String(limit));
  }

  if (!nextUrl.searchParams.has('offset')) {
    nextUrl.searchParams.set('offset', '0');
  }

  return nextUrl.toString();
};

export const getAllExercisesUrl = () => (
  withExerciseLimit(`${EXERCISE_DB_BASE_URL}/exercises`)
);

export const getBodyPartExercisesUrl = (bodyPart) => (
  withExerciseLimit(`${EXERCISE_DB_BASE_URL}/exercises/bodyPart/${encodeURIComponent(bodyPart)}`)
);

export const buildExerciseImageUrl = (exerciseId, resolution = EXERCISE_IMAGE_RESOLUTION) => {
  if (!exerciseId) return '';

  const url = new URL(`${EXERCISE_DB_BASE_URL}/image/${encodeURIComponent(exerciseId)}`);
  url.searchParams.set('resolution', String(resolution));
  return url.toString();
};

const getHeaderValue = (headers, key) => {
  if (!headers) return undefined;
  if (headers instanceof Headers) return headers.get(key);
  return headers[key] || headers[key.toLowerCase()] || headers[key.toUpperCase()];
};

const validateRapidApiHeaders = (url, options = {}) => {
  const requestHost = new URL(url).host;
  const rapidApiHost = getHeaderValue(options.headers, 'x-rapidapi-host');
  const rapidApiKey = getHeaderValue(options.headers, 'x-rapidapi-key');

  if (!rapidApiHost || !rapidApiKey) {
    console.log('[RapidAPI] Missing required headers', {
      url,
      hasRapidApiHost: Boolean(rapidApiHost),
      hasRapidApiKey: Boolean(rapidApiKey),
    });
    return false;
  }

  if (requestHost.endsWith('rapidapi.com') && rapidApiHost !== requestHost) {
    console.log('[RapidAPI] Header host does not match request host', {
      url,
      requestHost,
      rapidApiHost,
    });
  }

  return true;
};

const parseResponseBody = (rawBody, contentType) => {
  if (!rawBody) return null;
  if (!contentType.includes('application/json')) return rawBody;

  try {
    return JSON.parse(rawBody);
  } catch (error) {
    console.log('[API] Failed to parse JSON response body', {
      message: error.message,
      rawBody,
    });
    return null;
  }
};

const isImageKey = (key) => /gif|image|media|thumbnail/i.test(key);

const findFirstMediaString = (value, seen = new Set()) => {
  if (!value || typeof value !== 'object') return '';
  if (seen.has(value)) return '';
  seen.add(value);

  const entries = Object.entries(value);
  const directEntry = entries.find(([key, entryValue]) => (
    isImageKey(key) && typeof entryValue === 'string' && entryValue.trim()
  ));

  if (directEntry) return directEntry[1];

  for (const [, entryValue] of entries) {
    const nestedMedia = findFirstMediaString(entryValue, seen);
    if (nestedMedia) return nestedMedia;
  }

  return '';
};

const createExerciseMediaUrl = (rawMedia, exerciseId) => {
  if (!rawMedia || typeof rawMedia !== 'string') {
    return exerciseId ? buildExerciseImageUrl(exerciseId) : '';
  }

  const media = rawMedia.trim();

  if (/^https?:\/\//i.test(media) || media.startsWith('blob:') || media.startsWith('data:')) {
    return media.replace('http://', 'https://');
  }

  if (media.startsWith('/')) {
    const url = new URL(`${EXERCISE_DB_BASE_URL}${media}`);
    if (url.pathname.startsWith('/image/') && !url.searchParams.has('resolution')) {
      url.searchParams.set('resolution', String(EXERCISE_IMAGE_RESOLUTION));
    }
    return url.toString();
  }

  if (media.startsWith('image/')) {
    const url = new URL(`${EXERCISE_DB_BASE_URL}/${media}`);
    if (!url.searchParams.has('resolution')) {
      url.searchParams.set('resolution', String(EXERCISE_IMAGE_RESOLUTION));
    }
    return url.toString();
  }

  return media;
};

const normalizeExerciseMediaFields = (exercise) => {
  if (!exercise || typeof exercise !== 'object') return exercise;

  const rawGif =
    exercise.gifUrl
    || exercise.gif
    || exercise.animatedGifUrl
    || exercise.animationUrl
    || '';
  const rawImage =
    exercise.imageUrl
    || exercise.image
    || exercise.thumbnail
    || exercise.thumbnailUrl
    || exercise.mediaUrl
    || exercise.imagePath
    || exercise.gifPath
    || findFirstMediaString(exercise);
  const gifUrl = createExerciseMediaUrl(rawGif, exercise.id);
  const imageUrl = createExerciseMediaUrl(rawImage, exercise.id);

  return {
    ...exercise,
    gifUrl,
    imageUrl,
  };
};

const normalizeExerciseDbData = (data, url) => {
  if (!url.includes(EXERCISE_DB_HOST)) return data;
  if (Array.isArray(data)) return data.map(normalizeExerciseMediaFields);
  if (data?.name || data?.id) return normalizeExerciseMediaFields(data);
  return data;
};

const validateExerciseDbPayload = (data, url) => {
  if (!url.includes(EXERCISE_DB_HOST)) return;

  const exercises = Array.isArray(data) ? data : data?.name ? [data] : [];
  const looksLikeExercisePayload = exercises.some((exercise) => (
    exercise && typeof exercise === 'object' && (exercise.id || exercise.name)
  ));

  if (!looksLikeExercisePayload) return;

  if (exercises.length === 0) {
    console.log('[ExerciseDB] Response did not contain exercise records', {
      url,
      receivedType: Array.isArray(data) ? 'array' : typeof data,
      keys: data && typeof data === 'object' ? Object.keys(data) : [],
    });
    return;
  }

  const withGifUrl = exercises.filter((exercise) => Boolean(exercise?.gifUrl));

  if (withGifUrl.length === 0) {
    console.log('[ExerciseDB] No gifUrl property found in returned exercises', {
      url,
      exerciseCount: exercises.length,
      sampleKeys: Object.keys(exercises[0] || {}),
      sampleExercise: exercises[0],
    });
  }
};

export const fetchData = async (url, options = exerciseOptions) => {
  try {
    validateRapidApiHeaders(url, options);

    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type') || '';
    const rawBody = await response.text();

    if (!response.ok) {
      console.log('[API] Request failed', {
        url,
        status: response.status,
        statusText: response.statusText,
        rawBody,
      });
      return null;
    }

    const data = normalizeExerciseDbData(parseResponseBody(rawBody, contentType), url);
    validateExerciseDbPayload(data, url);
    return data;
  } catch (error) {
    console.log('[API] Request threw before a response was received', {
      url,
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
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
    const urls = [
      buildExerciseImageUrl(exerciseId, resolution),
      `${EXERCISE_DB_BASE_URL}/image?exerciseId=${encodeURIComponent(exerciseId)}&resolution=${resolution}`,
    ];

    for (const url of urls) {
      validateRapidApiHeaders(url, exerciseOptions);

      const response = await fetch(url, exerciseOptions);

      if (!response.ok) {
        const rawBody = await response.text();
        console.log('[ExerciseDB image] Request failed', {
          url,
          status: response.status,
          statusText: response.statusText,
          rawBody,
        });
        continue;
      }

      const blob = await response.blob();

      if (!blob.type.startsWith('image/')) {
        console.log('[ExerciseDB image] Response was not an image', {
          url,
          contentType: blob.type,
        });
        continue;
      }

      const blobUrl = URL.createObjectURL(blob);
      gifBlobCache.set(cacheKey, blobUrl);
      return blobUrl;
    }

    return null;
  } catch (error) {
    console.log('[ExerciseDB image] Request threw before a response was received', {
      exerciseId,
      resolution,
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    return null;
  }
};

export const revokeExerciseGifUrl = (blobUrl) => {
  if (blobUrl?.startsWith('blob:')) {
    URL.revokeObjectURL(blobUrl);
  }
};
