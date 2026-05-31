import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListAltIcon from '@mui/icons-material/ListAlt';

import { normalizeExercise } from '../utils/exerciseData';
import { isFavoriteExercise, toggleFavoriteExercise } from '../utils/favoriteExercises';

const ExerciseCard = ({ exercise: rawExercise }) => {
  const theme = useTheme();
  const exercise = normalizeExercise(rawExercise);

  const [isFavorite, setIsFavorite] = useState(false);
   console.log('Exercise Card Data:', exercise);
  // Standardize and zero-pad the alphanumeric ID string (e.g., "0003")
  let trueExerciseId = rawExercise?.id || exercise?.id || '';
  if (trueExerciseId) {
    trueExerciseId = String(trueExerciseId).padStart(4, '0');
  }

  useEffect(() => {
    if (!trueExerciseId) return;
    setIsFavorite(isFavoriteExercise(trueExerciseId));
  }, [trueExerciseId]);

  if (!exercise) return null;

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsFavorite(toggleFavoriteExercise({ ...exercise, id: trueExerciseId }));
  };

  return (
    <Box
      component={Link}
      to={`/exercise/${trueExerciseId}`}
      className="exercise-card"
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        borderTop: 4,
        borderTopColor: 'primary.main',
        overflow: 'hidden',
        position: 'relative',
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
            ? '0 16px 40px rgba(47, 143, 131, 0.14)'
            : '0 16px 40px rgba(79, 188, 172, 0.2)',
        },
      }}
    >
      <Tooltip
        title={isFavorite ? 'Remove from My Workout' : 'Save to My Workout'}
        arrow
      >
        <IconButton
          aria-label={isFavorite ? 'Remove from favorite exercises' : 'Save favorite exercise'}
          aria-pressed={isFavorite}
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 14,
            right: 14,
            zIndex: 2,
            width: 44,
            height: 44,
            bgcolor: isFavorite
              ? 'rgba(47, 143, 131, 0.96)'
              : theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.92)'
                : 'rgba(26, 29, 46, 0.9)',
            color: isFavorite ? '#fff' : 'primary.main',
            border: 1,
            borderColor: isFavorite ? 'primary.main' : 'divider',
            boxShadow: theme.palette.mode === 'light'
              ? '0 10px 28px rgba(26, 29, 46, 0.16)'
              : '0 10px 28px rgba(0, 0, 0, 0.42)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.2s ease, background-color 0.2s ease, color 0.2s ease',
            '&:hover': {
              bgcolor: isFavorite ? 'primary.dark' : 'background.paper',
              transform: 'scale(1.08)',
            },
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>

      {/* 🖼️ DIRECT PUBLIC FOLDER IMAGE RENDERING CONTAINER */}
      <Box sx={{ width: '100%', height: 280, bgcolor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onError={(e) => {
            // Check if the source URL doesn't end with .png yet to prevent an infinite loop
            if (!e.target.src.endsWith('.png')) {
              e.target.src = `/assets/exercise_images/${trueExerciseId}.png`;
            } else {
              // Final absolute system backup if neither layout is present
              e.target.src = '/assets/images/Logo.png';
            }
          }}
        />
      </Box>

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
              {exercise.stepCount} guided movement steps
            </Typography>
          </Stack>
        )}

        {exercise.steps && exercise.steps[0] && (
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
            1. {exercise.steps[0].text || exercise.steps[0]}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default ExerciseCard;