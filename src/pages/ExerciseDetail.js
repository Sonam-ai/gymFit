import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Chip,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import Loader from '../components/Loader';
import ExerciseGif from '../components/ExerciseGif';
import ExerciseSteps from '../components/ExerciseSteps';
import { exerciseOptions, fetchData } from '../components/utils/fetchData';
import { normalizeExercise } from '../utils/exerciseData';

const ExerciseDetail = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercise = async () => {
      setLoading(true);

      const data = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
        exerciseOptions,
      );

      if (data?.name) {
        setExercise(normalizeExercise(data));
      } else {
        setExercise(null);
      }

      setLoading(false);
    };

    fetchExercise();
  }, [id]);

  if (loading) return <Loader />;

  if (!exercise) {
    return (
      <Typography textAlign="center" mt={10} color="text.secondary">
        Exercise not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: { lg: 4, xs: 2 }, px: { xs: 2, lg: 3 }, pb: 8 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          color="text.secondary"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          <ArrowBackIcon fontSize="small" />
          Back home
        </Link>
      </Breadcrumbs>

      <Typography
        variant="h3"
        fontWeight={700}
        textTransform="capitalize"
        color="text.primary"
        mb={2}
        sx={{ fontSize: { lg: '42px', xs: '28px' } }}
      >
        {exercise.name}
      </Typography>

      <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
        <Chip label={exercise.bodyPart} color="primary" sx={{ textTransform: 'capitalize' }} />
        <Chip label={exercise.target} variant="outlined" sx={{ textTransform: 'capitalize' }} />
        <Chip label={exercise.equipment} variant="outlined" sx={{ textTransform: 'capitalize' }} />
        {exercise.difficulty && (
          <Chip label={exercise.difficulty} color="secondary" sx={{ textTransform: 'capitalize' }} />
        )}
        {exercise.category && (
          <Chip label={exercise.category} sx={{ textTransform: 'capitalize' }} />
        )}
      </Stack>

      {exercise.description && (
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            mb: 4,
            borderRadius: 3,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <InfoOutlinedIcon color="primary" sx={{ mt: 0.25 }} />
            <Typography color="text.secondary" lineHeight={1.7}>
              {exercise.description}
            </Typography>
          </Stack>
        </Paper>
      )}

      {exercise.secondaryMuscles?.length > 0 && (
        <Stack direction="row" flexWrap="wrap" gap={1} mb={4} alignItems="center">
          <Typography variant="body2" fontWeight={600} color="text.secondary">
            Secondary muscles:
          </Typography>
          {exercise.secondaryMuscles.map((muscle) => (
            <Chip
              key={muscle}
              label={muscle}
              size="small"
              sx={{ textTransform: 'capitalize' }}
            />
          ))}
        </Stack>
      )}

      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        spacing={4}
        alignItems="flex-start"
      >
        <Box
          sx={{
            width: { xs: '100%', lg: '42%' },
            flexShrink: 0,
            position: { lg: 'sticky' },
            top: { lg: 100 },
          }}
        >
          <ExerciseGif exercise={exercise} height={480} showLabel />
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mt={1.5}
          >
            Live animation from ExerciseDB (RapidAPI)
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            width: '100%',
            p: { xs: 2.5, lg: 3 },
            borderRadius: 4,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <ExerciseSteps exercise={exercise} showGif={false} />
        </Paper>
      </Stack>
    </Box>
  );
};

export default ExerciseDetail;
