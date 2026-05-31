import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { fetchData } from '../components/utils/fetchData'; // Adjusted relative path
import { getBodyPartImage } from '../utils/bodyPartImages';
import { DEFAULT_BODY_PARTS, FALLBACK_EXERCISES } from '../utils/exerciseFallbackData';
import { fixHttps } from '../utils/exerciseData';
import HorizontalScrollbar from './HorizontalScrollbar';

const getStaticBodyPartImages = (parts) => Object.fromEntries(
  parts.map((part) => [part, getBodyPartImage(part)]),
);

const getExerciseImageUrl = (exercise) => fixHttps(
  exercise?.imageUrl
    || exercise?.image
    || exercise?.thumbnail
    || exercise?.gifUrl
    || exercise?.gif
    || exercise?.mediaUrl
    || '',
);

const SearchExercises = ({
  bodyPart,
  setBodyPart,
  setExercises,
  setIsSearchResult,
}) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState(DEFAULT_BODY_PARTS);
  const [bodyPartImages, setBodyPartImages] = useState(() => (
    getStaticBodyPartImages(DEFAULT_BODY_PARTS)
  ));
  const [animatedBodyParts, setAnimatedBodyParts] = useState({});
  const [loadingAnimatedBodyParts, setLoadingAnimatedBodyParts] = useState({});

  // 1. Fetch categories dynamically from your new Express server array
  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseData = await fetchData('/api/exercises');

      if (Array.isArray(exerciseData) && exerciseData.length > 0) {
        // Pull out every first muscle group from the primaryMuscles array
        const rawParts = exerciseData.map(ex => 
          ex.primaryMuscles && ex.primaryMuscles[0]
        ).filter(Boolean);
        
        // De-duplicate them into lowercase text tokens
        const uniqueParts = ['all', ...new Set(rawParts.map(part => String(part).toLowerCase()))];
        setBodyParts(uniqueParts);
      } else {
        setBodyParts(DEFAULT_BODY_PARTS);
      }
    };

    fetchExercisesData();
  }, []);

  useEffect(() => {
    setBodyPartImages((current) => ({
      ...getStaticBodyPartImages(bodyParts),
      ...current,
    }));
  }, [bodyParts]);

  // 2. Load preview animations safely from your local backend collection
  useEffect(() => {
    if (bodyParts.length === 0) return undefined;

    let cancelled = false;

    const fetchAnimatedBodyPartImages = async () => {
      setLoadingAnimatedBodyParts(Object.fromEntries(bodyParts.map((part) => [part, true])));

      const exerciseData = await fetchData('/api/exercises');
      const exercisesForImages = Array.isArray(exerciseData) ? exerciseData : FALLBACK_EXERCISES;

      const nextImages = {};
      const nextAnimated = {};

      bodyParts.forEach((part) => {
        const exercise = part === 'all'
          ? exercisesForImages.find((item) => item?.id)
          : exercisesForImages.find((item) => {
              const itemMuscle = (item?.primaryMuscles && item.primaryMuscles[0]) || '';
              return String(itemMuscle).toLowerCase() === String(part).toLowerCase() && item?.id;
            });

        if (!exercise?.id) return;

        // Map local path wrapper format for horizontal thumbnails preview loading
        let imageUrl = '';
        if (exercise.images && exercise.images[0]) {
          imageUrl = `https://gymfit-api.onrender.com/images/${exercise.images[0]}`;
        } else {
          imageUrl = getExerciseImageUrl(exercise);
        }

        if (imageUrl) {
          nextImages[part] = imageUrl;
          nextAnimated[part] = true;
        }
      });

      if (!cancelled && Object.keys(nextImages).length > 0) {
        setBodyPartImages((current) => ({ ...current, ...nextImages }));
        setAnimatedBodyParts((current) => ({ ...current, ...nextAnimated }));
      }

      if (!cancelled) {
        setLoadingAnimatedBodyParts({});
      }
    };

    fetchAnimatedBodyPartImages();

    return () => {
      cancelled = true;
    };
  }, [bodyParts]);

  const scrollToResults = () => {
    document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth' });
  };

  // 3. Search Bar function to query your local dataset
  const handleSearch = async () => {
    const term = search.trim().toLowerCase();
    if (!term || !setExercises) return;

    // Check if search query matches a category name string directly
    const matchedBodyPart = bodyParts.find(
      (part) => part !== 'all' && part.toLowerCase() === term,
    );

    if (matchedBodyPart) {
      setIsSearchResult?.(false);
      setBodyPart(matchedBodyPart);
      setSearch('');
      scrollToResults();
      return;
    }

    setIsSearchResult?.(true);

    const exerciseData = await fetchData('/api/exercises');
    const exercisesForSearch = Array.isArray(exerciseData) ? exerciseData : FALLBACK_EXERCISES;

    const searchedExercises = exercisesForSearch.filter(
      (exercise) => 
        exercise.name?.toLowerCase().includes(term)
        || (exercise.target && exercise.target.toLowerCase().includes(term))
        || (Array.isArray(exercise.primaryMuscles) && exercise.primaryMuscles.some(m => m.toLowerCase().includes(term)))
        || (exercise.equipment && exercise.equipment.toLowerCase().includes(term))
    );

    setExercises(searchedExercises);
    setSearch('');
    scrollToResults();
  };

  const searchBarBg = theme.palette.mode === 'light' ? '#FFFFFF' : '#22222C';

  return (
    <Box sx={{ px: { xs: 1, sm: 0 } }}>
      <Stack
        alignItems="center"
        sx={{ mt: { xs: 4, lg: 6 }, mb: 4, px: 2 }}
      >
        <Typography
          align="center"
          sx={{
            fontWeight: 700,
            fontSize: { lg: '44px', xs: '30px' },
            color: 'text.primary',
            lineHeight: 1.2,
            mb: 1.5,
          }}
        >
          Awesome Exercises You
          <br />
          Should Know
        </Typography>
        <Typography color="text.secondary" textAlign="center" maxWidth={520}>
          Search by name, equipment, or body part like chest, back, or legs
        </Typography>
      </Stack>

      <Box
        sx={{
          mb: 6,
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          px: { xs: 2, sm: 3 },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            width: '100%',
            maxWidth: { lg: 800, md: 600, sm: 480 },
            height: 58,
            gap: { lg: 0, md: 1.5, xs: 1.25 },
            bgcolor: searchBarBg,
            borderRadius: 3,
            border: 1,
            borderColor: 'divider',
            overflow: { lg: 'hidden' },
            boxShadow: theme.palette.mode === 'light'
              ? '0 8px 32px rgba(26, 29, 46, 0.08)'
              : '0 8px 32px rgba(0, 0, 0, 0.35)',
          }}
        >
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exercises..."
            type="text"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary', ml: 1 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: 1,
              minWidth: 0,
              '& .MuiOutlinedInput-root': {
                height: 58,
                bgcolor: 'transparent',
                '& fieldset': { border: 'none' },
              },
              input: {
                fontWeight: 600,
                color: 'text.primary',
              },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              flexShrink: 0,
              height: { lg: 58, xs: 52 },
              width: { lg: 160, md: 120, xs: 96 },
              fontSize: { lg: '17px', xs: '14px' },
              borderRadius: { lg: '0 12px 12px 0', xs: 2 },
              mx: { xs: 0.5, lg: 0 },
            }}
          >
            Search
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          width: '100%',
          p: { xs: 2, lg: 3 },
          bgcolor: 'background.paper',
          borderRadius: 4,
          border: 1,
          borderColor: 'divider',
          mb: 2,
        }}
      >
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          bodyPartImages={bodyPartImages}
          animatedBodyParts={animatedBodyParts}
          loadingAnimatedBodyParts={loadingAnimatedBodyParts}
        />
      </Box>
    </Box>
  );
};

export default SearchExercises;