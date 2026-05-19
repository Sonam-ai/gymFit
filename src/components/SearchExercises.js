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

import { exerciseOptions, fetchData } from './utils/fetchData';
import { getBodyPartImage } from '../utils/bodyPartImages';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({
  bodyPart,
  setBodyPart,
  setExercises,
  setIsSearchResult,
}) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions,
      );

      if (Array.isArray(bodyPartData)) {
        setBodyParts(['all', ...bodyPartData]);
      }
    };

    fetchExercisesData();
  }, []);

  const scrollToResults = () => {
    document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = async () => {
    const term = search.trim().toLowerCase();
    if (!term || !setExercises) return;

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

    const exerciseData = await fetchData(
      'https://exercisedb.p.rapidapi.com/exercises',
      exerciseOptions,
    );

    if (!Array.isArray(exerciseData)) {
      scrollToResults();
      return;
    }

    const searchedExercises = exerciseData.filter(
      (exercise) => exercise.name?.toLowerCase().includes(term)
        || exercise.target?.toLowerCase().includes(term)
        || exercise.equipment?.toLowerCase().includes(term)
        || exercise.bodyPart?.toLowerCase().includes(term),
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
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
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
          bodyPartImages={Object.fromEntries(
            bodyParts.map((part) => [part, getBodyPartImage(part)]),
          )}
        />
      </Box>
    </Box>
  );
};

export default SearchExercises;
