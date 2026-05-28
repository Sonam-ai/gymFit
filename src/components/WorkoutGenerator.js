import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Drawer,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RefreshIcon from '@mui/icons-material/Refresh';

import {
  DURATION_OPTIONS,
  EQUIPMENT_OPTIONS,
  EXPERIENCE_OPTIONS,
  GOAL_OPTIONS,
  generateWorkoutPlan,
} from '../utils/workoutGenerator';

const WorkoutGenerator = ({ fitnessContext, onBrowseBodyPart, onScrollToExercises }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState('fat_loss');
  const [equipment, setEquipment] = useState('bodyweight');
  const [experience, setExperience] = useState('beginner');
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await generateWorkoutPlan({
        goal,
        equipment,
        experience,
        duration,
        fitnessContext,
      });
      setPlan(result);
    } catch {
      setError('Could not generate plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const sourceLabel = {
    openai: 'Powered by OpenAI',
    gemini: 'Powered by Gemini',
    'smart-engine': 'Smart workout engine',
  };

  return (
    <>
      <Tooltip title="AI Workout Generator" placement="left">
        <Fab
          color="primary"
          aria-label="AI workout generator"
          onClick={handleOpen}
          className="workout-generator-fab"
          sx={{
            position: 'fixed',
            bottom: { xs: 24, md: 32 },
            right: { xs: 20, md: 32 },
            zIndex: 1200,
            width: 64,
            height: 64,
            background: 'linear-gradient(135deg, #FF2625 0%, #FF6B47 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #e32222 0%, #FF2625 100%)',
            },
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 30 }} />
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 420, md: 460 },
            bgcolor: 'background.default',
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              p: 2.5,
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #FF2625 0%, #FF6B47 100%)',
                }}
              >
                <AutoAwesomeIcon sx={{ color: '#fff' }} />
              </Box>
              <Box>
                <Typography fontWeight={700} color="text.primary">
                  AI Workout Generator
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Personalized plans in seconds
                </Typography>
              </Box>
            </Stack>
            <IconButton onClick={() => setOpen(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Stack>

          <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>
            <Stack spacing={2.5}>
              <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                <InputLabel>Goal</InputLabel>
                <Select label="Goal" value={goal} onChange={(e) => setGoal(e.target.value)}>
                  {GOAL_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {fitnessContext?.bmi ? (
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    border: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <Chip
                      label={`BMI ${fitnessContext.bmi}`}
                      color={fitnessContext.bmiInfo?.color || 'default'}
                      size="small"
                      sx={{ fontWeight: 700 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Using your {fitnessContext.bmiInfo?.label?.toLowerCase() || 'latest'} result as plan context.
                    </Typography>
                  </Stack>
                </Paper>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Calculate BMI first to personalize this plan automatically.
                </Typography>
              )}

              <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                <InputLabel>Equipment</InputLabel>
                <Select
                  label="Equipment"
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                >
                  {EQUIPMENT_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                <InputLabel>Experience</InputLabel>
                <Select
                  label="Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                <InputLabel>Duration</InputLabel>
                <Select
                  label="Duration"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                >
                  {DURATION_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleGenerate}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <AutoAwesomeIcon />}
                >
                  {loading ? 'Generating…' : 'Generate plan'}
                </Button>
                {plan && (
                  <IconButton
                    onClick={handleGenerate}
                    disabled={loading}
                    aria-label="regenerate"
                    sx={{ border: 1, borderColor: 'divider' }}
                  >
                    <RefreshIcon />
                  </IconButton>
                )}
              </Stack>

              {error && (
                <Typography color="error" variant="body2">{error}</Typography>
              )}

              {plan && !loading && (
                <Stack spacing={2}>
                  <Paper
                    elevation={0}
                    sx={{ p: 2, borderRadius: 3, border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
                  >
                    <Typography fontWeight={700} color="text.primary">
                      {plan.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {plan.subtitle} · {plan.totalMinutes} min total
                    </Typography>
                    <Chip
                      label={sourceLabel[plan.source] || 'Generated plan'}
                      size="small"
                      sx={{ mt: 1 }}
                      color={plan.source === 'smart-engine' ? 'default' : 'primary'}
                    />
                  </Paper>

                  {plan.sections?.map((section) => (
                    <Paper
                      key={section.name}
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        border: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" mb={1.5}>
                        <Typography fontWeight={700} color="text.primary">
                          {section.name}
                        </Typography>
                        <Chip label={`${section.duration} min`} size="small" variant="outlined" />
                      </Stack>

                      <Stack spacing={1.5}>
                        {section.exercises?.map((ex) => (
                          <Box
                            key={`${section.name}-${ex.name}`}
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: theme.palette.mode === 'light' ? '#F8F9FC' : '#22222C',
                              border: 1,
                              borderColor: 'divider',
                            }}
                          >
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="flex-start"
                              gap={1}
                            >
                              <Box flex={1}>
                                <Typography fontWeight={600} color="text.primary" fontSize="15px">
                                  {ex.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  {ex.sets} sets × {ex.reps}
                                  {ex.rest ? ` · rest ${ex.rest}` : ''}
                                </Typography>
                                {ex.notes && (
                                  <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                                    {ex.notes}
                                  </Typography>
                                )}
                              </Box>
                              {ex.bodyPart && onBrowseBodyPart && (
                                <Button
                                  size="small"
                                  variant="text"
                                  color="primary"
                                  sx={{ flexShrink: 0, textTransform: 'capitalize', minWidth: 'auto' }}
                                  onClick={() => {
                                    onBrowseBodyPart(ex.bodyPart);
                                    onScrollToExercises?.();
                                    setOpen(false);
                                  }}
                                >
                                  Find
                                </Button>
                              )}
                            </Stack>
                          </Box>
                        ))}
                      </Stack>
                    </Paper>
                  ))}

                  {plan.tips?.length > 0 && (
                    <Paper
                      elevation={0}
                      sx={{ p: 2, borderRadius: 3, border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                        <FitnessCenterIcon color="primary" fontSize="small" />
                        <Typography fontWeight={700} color="text.primary">
                          Coach tips
                        </Typography>
                      </Stack>
                      <Stack spacing={0.75}>
                        {plan.tips.map((tip) => (
                          <Typography key={tip} variant="body2" color="text.secondary">
                            • {tip}
                          </Typography>
                        ))}
                      </Stack>
                    </Paper>
                  )}
                </Stack>
              )}
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default WorkoutGenerator;
