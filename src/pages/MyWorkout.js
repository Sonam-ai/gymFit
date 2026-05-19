import React, { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Divider,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

import ExerciseGif from '../components/ExerciseGif';
import { getFavoriteExercises, saveFavoriteExercises } from '../utils/favoriteExercises';

const CALORIE_TRACKER_KEY = 'my-workout-calorie-tracker';
const FITNESS_RESULTS_KEY = 'fitness-calculator-results';

const intensityOptions = [
  { value: 3.5, label: 'Light stretch', description: 'Easy movement' },
  { value: 5.5, label: 'Steady workout', description: 'Moderate effort' },
  { value: 8, label: 'High intensity', description: 'Hard session' },
  { value: 10, label: 'Power training', description: 'Very intense' },
];

const getStoredJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch (error) {
    return fallback;
  }
};

const calculateCaloriesBurned = ({ weight, minutes, intensity }) => {
  const w = Number(weight);
  const m = Number(minutes);
  const met = Number(intensity);

  if (!w || !m || !met) return 0;

  return Math.round((met * 3.5 * w * m) / 200);
};

const MyWorkout = () => {
  const theme = useTheme();
  const [favorites, setFavorites] = useState([]);
  const [tracker, setTracker] = useState(() => getStoredJson(CALORIE_TRACKER_KEY, {
    weight: '',
    minutes: '',
    intensity: 5.5,
  }));
  const [fitnessResults, setFitnessResults] = useState(() => (
    getStoredJson(FITNESS_RESULTS_KEY, null)
  ));

  useEffect(() => {
    const refreshFavorites = () => setFavorites(getFavoriteExercises());

    refreshFavorites();
    window.addEventListener('favorite-exercises-updated', refreshFavorites);
    window.addEventListener('storage', refreshFavorites);

    return () => {
      window.removeEventListener('favorite-exercises-updated', refreshFavorites);
      window.removeEventListener('storage', refreshFavorites);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(CALORIE_TRACKER_KEY, JSON.stringify(tracker));
  }, [tracker]);

  useEffect(() => {
    const syncFitnessResults = () => {
      setFitnessResults(getStoredJson(FITNESS_RESULTS_KEY, null));
    };

    window.addEventListener('fitness-calculator-updated', syncFitnessResults);
    window.addEventListener('storage', syncFitnessResults);

    return () => {
      window.removeEventListener('fitness-calculator-updated', syncFitnessResults);
      window.removeEventListener('storage', syncFitnessResults);
    };
  }, []);

  const caloriesBurned = useMemo(() => calculateCaloriesBurned(tracker), [tracker]);

  const handleTrackerChange = (field) => (event) => {
    setTracker((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const removeFavorite = (exerciseId) => {
    const nextFavorites = favorites.filter((exercise) => exercise.id !== exerciseId);
    saveFavoriteExercises(nextFavorites);
    setFavorites(nextFavorites);
    window.dispatchEvent(new Event('favorite-exercises-updated'));
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 0 }, py: { xs: 4, lg: 6 } }}>
      <Stack spacing={1} mb={4}>
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.14em' }}
        >
          My Workout
        </Typography>
        <Typography
          variant="h3"
          color="text.primary"
          sx={{ fontSize: { xs: '34px', lg: '48px' } }}
        >
          Your personal fitness space
        </Typography>
        <Typography color="text.secondary" maxWidth={680}>
          Keep favorite exercises close, estimate calorie burn, and bring your latest fitness
          calculator numbers into one calm dashboard.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(320px, 0.9fr) minmax(0, 1.6fr)' },
          gap: 3,
          alignItems: 'start',
        }}
      >
        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              border: 1,
              borderColor: 'divider',
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, #FFFFFF 0%, #EEF7F4 100%)'
                : 'linear-gradient(135deg, #171F22 0%, #10201F 100%)',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <LocalFireDepartmentIcon color="primary" />
              <Typography variant="h6" fontWeight={700} color="text.primary">
                Calories burned
              </Typography>
            </Stack>

            <Stack spacing={2.25}>
              <TextField
                label="Your weight (kg)"
                type="number"
                value={tracker.weight}
                onChange={handleTrackerChange('weight')}
                inputProps={{ min: 30, max: 300 }}
                fullWidth
              />
              <TextField
                label="Workout time (minutes)"
                type="number"
                value={tracker.minutes}
                onChange={handleTrackerChange('minutes')}
                inputProps={{ min: 1, max: 360 }}
                fullWidth
              />
              <TextField
                select
                label="Workout intensity"
                value={tracker.intensity}
                onChange={handleTrackerChange('intensity')}
                fullWidth
              >
                {intensityOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label} - {option.description}
                  </MenuItem>
                ))}
              </TextField>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: 1,
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Estimated burn
                </Typography>
                <Typography variant="h3" fontWeight={800} color="primary.main" lineHeight={1}>
                  {caloriesBurned}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.75}>
                  kcal in {tracker.minutes || 0} minutes
                </Typography>
              </Paper>
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{ p: 3, borderRadius: 4, border: 1, borderColor: 'divider' }}
          >
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <MonitorWeightIcon color="primary" />
              <Typography variant="h6" fontWeight={700} color="text.primary">
                Latest calorie goal
              </Typography>
            </Stack>

            {fitnessResults ? (
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip label={`BMI ${fitnessResults.bmi}`} color="primary" variant="outlined" />
                  <Chip label={fitnessResults.goalLabel} />
                </Stack>
                <Typography variant="h4" fontWeight={800} color="text.primary">
                  {fitnessResults.calories?.target} kcal/day
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Maintenance around {fitnessResults.calories?.maintenance} kcal/day.
                </Typography>
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Typography color="text.secondary">
                  Use the home calculator once and your BMI plus calorie target will appear here.
                </Typography>
                <Button component={RouterLink} to="/#fitness-calculator" variant="outlined">
                  Open calculator
                </Button>
              </Stack>
            )}
          </Paper>
        </Stack>

        <Paper
          elevation={0}
          sx={{ p: { xs: 2, md: 3 }, borderRadius: 4, border: 1, borderColor: 'divider' }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
            mb={3}
          >
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <FavoriteIcon color="primary" />
                <Typography variant="h5" fontWeight={800} color="text.primary">
                  Favorite exercises
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                {favorites.length} saved exercise{favorites.length === 1 ? '' : 's'}
              </Typography>
            </Box>
            <Button component={RouterLink} to="/#exercises" variant="contained">
              Find exercises
            </Button>
          </Stack>

          {favorites.length === 0 ? (
            <Box
              sx={{
                py: 8,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: 'action.hover',
              }}
            >
              <FitnessCenterIcon sx={{ fontSize: 44, color: 'primary.main', mb: 1 }} />
              <Typography fontWeight={700} color="text.primary">
                No favorites saved yet
              </Typography>
              <Typography color="text.secondary" mt={1}>
                Tap the heart on any exercise card to build your personal list.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {favorites.map((exercise) => (
                <Paper
                  key={exercise.id}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                  }}
                >
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '160px minmax(0, 1fr)' },
                      gap: 2,
                    }}
                  >
                    <ExerciseGif exercise={exercise} height={140} showLabel={false} />
                    <Stack spacing={1.25}>
                      <Typography
                        component={RouterLink}
                        to={`/exercise/${exercise.id}`}
                        fontWeight={800}
                        color="text.primary"
                        sx={{ textDecoration: 'none', textTransform: 'capitalize' }}
                      >
                        {exercise.name}
                      </Typography>
                      <Stack direction="row" gap={1} flexWrap="wrap">
                        <Chip label={exercise.bodyPart} color="primary" size="small" variant="outlined" />
                        <Chip label={exercise.target} size="small" />
                        <Chip label={exercise.equipment} size="small" variant="outlined" />
                      </Stack>
                      <Divider />
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        spacing={1}
                      >
                        <Stack direction="row" spacing={0.75} alignItems="center">
                          <TimerOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {exercise.stepCount || 0} guided steps
                          </Typography>
                        </Stack>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => removeFavorite(exercise.id)}
                        >
                          Remove
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Paper>
              ))}
            </Stack>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default MyWorkout;
