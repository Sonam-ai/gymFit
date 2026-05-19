import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import {
  GOALS,
  calculateBmi,
  calculateBmr,
  calculateDailyCalories,
  getBmiCategory,
  getWorkoutSuggestions,
  validateInputs,
} from '../utils/fitnessCalculations';

const FitnessCalculator = ({ onSelectWorkout }) => {
  const theme = useTheme();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('maintain');
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const validationError = validateInputs({ height, weight, age });
    if (validationError) {
      setError(validationError);
      setResults(null);
      return;
    }

    setError('');

    const h = Number(height);
    const w = Number(weight);
    const a = Number(age);

    const bmi = calculateBmi(w, h);
    const bmiInfo = getBmiCategory(bmi);
    const bmr = calculateBmr(w, h, a);
    const calories = calculateDailyCalories(bmr, goal);
    const workouts = getWorkoutSuggestions(bmi, goal);

    setResults({
      bmi,
      bmiInfo,
      bmr,
      calories,
      workouts,
      goalLabel: GOALS.find((g) => g.value === goal)?.label,
    });

    localStorage.setItem('fitness-calculator-results', JSON.stringify({
      bmi,
      bmiInfo,
      bmr,
      calories,
      goalLabel: GOALS.find((g) => g.value === goal)?.label,
    }));
    window.dispatchEvent(new Event('fitness-calculator-updated'));
  };

  return (
    <Box
      component="section"
      id="fitness-calculator"
      sx={{ px: { xs: 2, sm: 0 }, py: { xs: 4, lg: 6 } }}
    >
      <Stack spacing={1} mb={3} textAlign={{ xs: 'center', md: 'left' }}>
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.14em' }}
        >
          Personal fitness
        </Typography>
        <Typography
          variant="h4"
          fontWeight={700}
          color="text.primary"
          sx={{ fontSize: { xs: '28px', lg: '36px' } }}
        >
          BMI & Calorie Calculator
        </Typography>
        <Typography color="text.secondary" maxWidth={560} mx={{ xs: 'auto', md: 0 }}>
          Enter your stats to see BMI, daily calorie targets, and workout types that match your goal.
        </Typography>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: 1,
          borderColor: 'divider',
          overflow: 'hidden',
          background:
            theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #FFFFFF 0%, #EEF7F4 100%)'
              : 'linear-gradient(135deg, #171F22 0%, #10201F 100%)',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: results ? 'minmax(280px, 2fr) minmax(320px, 3fr)' : '1fr',
            },
          }}
        >
          <Box
            component="form"
            onSubmit={handleCalculate}
            sx={{
              p: { xs: 3, lg: 4 },
              borderRight: { md: results ? 1 : 0 },
              borderColor: 'divider',
            }}
          >
            <Stack spacing={2.5}>
              <TextField
                label="Height (cm)"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 175"
                fullWidth
                required
                inputProps={{ min: 100, max: 250 }}
              />
              <TextField
                label="Weight (kg)"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 70"
                fullWidth
                required
                inputProps={{ min: 30, max: 300 }}
              />
              <TextField
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 25"
                fullWidth
                required
                inputProps={{ min: 10, max: 100 }}
              />
              <TextField
                select
                label="Goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                fullWidth
              >
                {GOALS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<CalculateIcon />}
                sx={{ py: 1.5, mt: 1 }}
              >
                Calculate
              </Button>
            </Stack>
          </Box>

          {results && (
            <Box sx={{ p: { xs: 3, lg: 4 } }}>
              <Stack spacing={3}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                  <Box>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2.5,
                        borderRadius: 3,
                        border: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        height: '100%',
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                        <MonitorWeightIcon color="primary" />
                        <Typography fontWeight={700} color="text.primary">
                          BMI
                        </Typography>
                      </Stack>
                      <Typography
                        variant="h3"
                        fontWeight={800}
                        color="text.primary"
                        sx={{ lineHeight: 1 }}
                      >
                        {results.bmi}
                      </Typography>
                      <Chip
                        label={results.bmiInfo.label}
                        color={results.bmiInfo.color}
                        size="small"
                        sx={{ mt: 1.5, fontWeight: 600 }}
                      />
                      <Typography variant="body2" color="text.secondary" mt={1.5} lineHeight={1.6}>
                        {results.bmiInfo.advice}
                      </Typography>
                    </Paper>
                  </Box>

                  <Box>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2.5,
                        borderRadius: 3,
                        border: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        height: '100%',
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                        <LocalFireDepartmentIcon color="primary" />
                        <Typography fontWeight={700} color="text.primary">
                          Daily calories
                        </Typography>
                      </Stack>
                      <Typography
                        variant="h3"
                        fontWeight={800}
                        color="primary.main"
                        sx={{ lineHeight: 1 }}
                      >
                        {results.calories.target}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        kcal / day for: {results.goalLabel}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block" mt={1.5}>
                        Maintenance ≈ {results.calories.maintenance} kcal · BMR ≈ {results.bmr} kcal
                      </Typography>
                    </Paper>
                  </Box>
                </Box>

                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <FitnessCenterIcon color="primary" />
                    <Typography fontWeight={700} color="text.primary">
                      Suggested workout types
                    </Typography>
                  </Stack>
                  <Stack spacing={1.5}>
                    {results.workouts.map((workout) => (
                      <Paper
                        key={`${workout.title}-${workout.bodyPart}`}
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: 1,
                          borderColor: 'divider',
                          bgcolor: 'background.paper',
                          cursor: onSelectWorkout ? 'pointer' : 'default',
                          transition: 'border-color 0.2s, transform 0.2s',
                          '&:hover': onSelectWorkout
                            ? {
                                borderColor: 'primary.main',
                                transform: 'translateX(4px)',
                              }
                            : {},
                        }}
                        onClick={() => onSelectWorkout?.(workout.bodyPart)}
                      >
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          justifyContent="space-between"
                          alignItems={{ xs: 'flex-start', sm: 'center' }}
                          spacing={1}
                        >
                          <Box>
                            <Typography fontWeight={600} color="text.primary" textTransform="capitalize">
                              {workout.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {workout.description}
                            </Typography>
                          </Box>
                          {onSelectWorkout && (
                            <Chip
                              label={`Browse ${workout.bodyPart}`}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{ textTransform: 'capitalize', flexShrink: 0 }}
                            />
                          )}
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                  {onSelectWorkout && (
                    <Typography variant="caption" color="text.secondary" display="block" mt={2}>
                      Tap a suggestion to load exercises for that body part below.
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default FitnessCalculator;
