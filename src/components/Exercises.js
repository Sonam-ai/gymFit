import React, { useEffect, useRef, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';

import {
  exerciseOptions,
  fetchData,
  getAllExercisesUrl,
  getBodyPartExercisesUrl,
} from './utils/fetchData';
import ExerciseCard from './ExerciseCard';
import ExerciseSkeletonCard from './ExerciseSkeletonCard';
import { FALLBACK_EXERCISES } from '../utils/exerciseFallbackData';

const Exercises = ({ exercises, setExercises, bodyPart, isSearchResult }) => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(9);
  const isSearchResultRef = useRef(isSearchResult);

  isSearchResultRef.current = isSearchResult;

  useEffect(() => {
    if (isSearchResult) {
      setLoading(false);
      return undefined;
    }

    let cancelled = false;

    const fetchExercisesData = async () => {
      setLoading(true);
      setCurrentPage(1);

      let exercisesData = null;

      if (bodyPart === 'all') {
        exercisesData = await fetchData(
          getAllExercisesUrl(),
          exerciseOptions,
        );
      } else {
        exercisesData = await fetchData(
          getBodyPartExercisesUrl(bodyPart),
          exerciseOptions,
        );
      }

      if (cancelled || isSearchResultRef.current) return;

      if (Array.isArray(exercisesData) && exercisesData.length > 0) {
        setExercises(exercisesData);
      } else {
        setExercises(bodyPart === 'all'
          ? FALLBACK_EXERCISES
          : FALLBACK_EXERCISES.filter((exercise) => exercise.bodyPart === bodyPart));
      }

      setLoading(false);
    };

    fetchExercisesData();

    return () => {
      cancelled = true;
    };
  }, [bodyPart, isSearchResult, setExercises]);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);
    document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Box
        id="exercises"
        sx={{
          mt: { lg: 8, xs: 5 },
          p: { xs: 2, lg: 3 },
          bgcolor: 'background.paper',
          borderRadius: 4,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          color="text.primary"
          sx={{ fontSize: { lg: '40px', xs: '28px' }, mb: 1 }}
        >
          Loading Exercises
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Fetching fresh ExerciseDB results and animations.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 3,
            width: '100%',
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <ExerciseSkeletonCard key={`exercise-skeleton-${index}`} />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      id="exercises"
      sx={{
        mt: { lg: 8, xs: 5 },
        p: { xs: 2, sm: 3, lg: 4 },
        bgcolor: 'background.paper',
        borderRadius: 4,
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        color="text.primary"
        sx={{ fontSize: { lg: '40px', xs: '28px' }, mb: 1 }}
      >
        Showing Results
      </Typography>
      <Typography color="text.secondary" mb={4}>
        {exercises.length} exercise{exercises.length !== 1 ? 's' : ''} found
        {bodyPart !== 'all' && !isSearchResult && (
          <> for <strong style={{ textTransform: 'capitalize' }}>{bodyPart}</strong></>
        )}
      </Typography>

      {currentExercises.length === 0 ? (
        <Typography textAlign="center" color="text.secondary" py={6}>
          No exercises found. Try another search or body part.
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                lg: 'repeat(3, minmax(0, 1fr))',
              },
              gap: 3,
              width: '100%',
            }}
          >
            {currentExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </Box>

          {exercises.length > exercisesPerPage && (
            <Stack sx={{ mt: 6 }} alignItems="center">
              <Pagination
                color="primary"
                shape="rounded"
                count={Math.ceil(exercises.length / exercisesPerPage)}
                page={currentPage}
                onChange={paginate}
                size="large"
              />
            </Stack>
          )}
        </>
      )}
    </Box>
  );
};

export default Exercises;
