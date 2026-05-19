import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Chip,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListAltIcon from '@mui/icons-material/ListAlt';

import ExerciseGif from './ExerciseGif';
import { normalizeExercise } from '../utils/exerciseData';

const ExerciseCard = ({ exercise: rawExercise }) => {
  const theme = useTheme();
  const exercise = normalizeExercise(rawExercise);

  if (!exercise) return null;

  return (
    <Box
      component={Link}
      to={`/exercise/${exercise.id}`}
      className="exercise-card"
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        borderTop: 4,
        borderTopColor: 'primary.main',
        overflow: 'hidden',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: theme.palette.mode === 'light'
          ? '0 4px 24px rgba(26, 29, 46, 0.08)'
          : '0 4px 24px rgba(0, 0, 0, 0.4)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: theme.palette.mode === 'light'
            ? '0 16px 40px rgba(255, 38, 37, 0.12)'
            : '0 16px 40px rgba(255, 38, 37, 0.2)',
        },
      }}
    >
      <ExerciseGif
        exercise={exercise}
        height={280}
        showLabel
      />

      <Stack sx={{ p: 2, flex: 1, gap: 1.5 }}>
        <Typography
          color="text.primary"
          fontWeight={700}
          sx={{
            fontSize: { lg: '20px', xs: '18px' },
            textTransform: 'capitalize',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {exercise.name}
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={0.75}>
          <Chip
            icon={<FitnessCenterIcon sx={{ fontSize: '16px !important' }} />}
            label={exercise.bodyPart}
            size="small"
            sx={{ textTransform: 'capitalize', fontWeight: 600 }}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={exercise.target}
            size="small"
            sx={{ textTransform: 'capitalize', fontWeight: 600 }}
          />
          <Chip
            label={exercise.equipment}
            size="small"
            variant="outlined"
            sx={{ textTransform: 'capitalize' }}
          />
        </Stack>

        {exercise.stepCount > 0 && (
          <Stack direction="row" alignItems="center" spacing={0.75}>
            <ListAltIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {exercise.stepCount} guided steps from API
            </Typography>
          </Stack>
        )}

        {exercise.steps[0] && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}
          >
            1. {exercise.steps[0].text}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default ExerciseCard;
