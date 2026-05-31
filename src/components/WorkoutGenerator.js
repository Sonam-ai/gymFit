import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Using React Router for smooth navigation transitions
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Drawer,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';

import {
  DURATION_OPTIONS,
  EQUIPMENT_OPTIONS,
  EXPERIENCE_OPTIONS,
  GOAL_OPTIONS,
  generateWorkoutPlan,
} from '../utils/workoutGenerator';

const WorkoutGenerator = ({ exercises = [], fitnessContext, onBrowseBodyPart, onScrollToExercises }) => {
  const theme = useTheme();
  const navigate = useNavigate(); // Hook initialized cleanly
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
        localExercises: exercises, 
      });
      setPlan(result);
    } catch (err) {
      console.error('[AI Plan Error]', err);
      setError('Could not generate plan. Please try again.');
    } finally {
      setLoading(false);
    }
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
          onClick={() => setOpen(true)}
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
            <IconButton onClick={() => setOpen(false)}>
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

              <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                <InputLabel>Equipment</InputLabel>
                <Select label="Equipment" value={equipment} onChange={(e) => setEquipment(e.target.value)}>
                  {EQUIPMENT_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                <InputLabel>Experience</InputLabel>
                <Select label="Experience" value={experience} onChange={(e) => setExperience(e.target.value)}>
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                <InputLabel>Duration</InputLabel>
                <Select label="Duration" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
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
                  <IconButton onClick={handleGenerate} disabled={loading} sx={{ border: 1, borderColor: 'divider' }}>
                    <RefreshIcon />
                  </IconButton>
                )}
              </Stack>

              {error && <Typography color="error" variant="body2">{error}</Typography>}

              {plan && !loading && (
                <Stack spacing={2}>
                  <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                    <Typography fontWeight={700} color="text.primary">{plan.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{plan.subtitle} · {plan.totalMinutes} min total</Typography>
                    <Chip label={sourceLabel[plan.source] || 'Generated plan'} size="small" sx={{ mt: 1 }} color="primary" />
                  </Paper>

                  {plan.sections?.map((section) => (
                    <Paper key={section.name} elevation={0} sx={{ p: 2, borderRadius: 3, border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                      <Stack direction="row" justifyContent="space-between" mb={1.5}>
                        <Typography fontWeight={700} color="text.primary">{section.name}</Typography>
                        <Chip label={`${section.duration} min`} size="small" variant="outlined" />
                      </Stack>

                      <Stack spacing={1.5}>
                        {section.exercises?.map((ex) => {
                          const targetLookup = ex.bodyPart || 'all';
                          return (
                            <Box 
                              key={`${section.name}-${ex.name}`} 
                              sx={{ 
                                p: 1.5, 
                                borderRadius: 2, 
                                bgcolor: theme.palette.mode === 'light' ? '#F8F9FC' : '#22222C', 
                                border: 1, 
                                borderColor: 'divider',
                                // UI Interactive styling parameters
                                cursor: ex.id ? 'pointer' : 'default',
                                '&:hover': ex.id ? { 
                                  borderColor: 'primary.main', 
                                  bgcolor: theme.palette.mode === 'light' ? '#F0F2F5' : '#2A2A36' 
                                } : {},
                                transition: 'all 0.2s ease-in-out'
                              }}
                              // Click action uses our new Router navigation handler directly
                              onClick={() => {
                                if (ex.id) {
                                  navigate(`/exercise/${ex.id}`);
                                  setOpen(false); // Closes drawer backdrop panel automatically
                                }
                              }}
                            >
                              <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
                                <Box flex={1}>
                                  <Typography fontWeight={600} color="text.primary" fontSize="15px">{ex.name}</Typography>
                                  <Typography variant="caption" color="text.secondary" display="block">{ex.sets} sets × {ex.reps} {ex.rest ? ` · rest ${ex.rest}` : ''}</Typography>
                                </Box>
                                {onBrowseBodyPart && (
                                  <Button
                                    size="small"
                                    variant="text"
                                    color="primary"
                                    sx={{ flexShrink: 0, textTransform: 'capitalize', minWidth: 'auto' }}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevents button trigger event from firing parent box router redirect click loop
                                      onBrowseBodyPart(String(targetLookup).toLowerCase());
                                      onScrollToExercises?.();
                                      setOpen(false);
                                    }}
                                  >
                                    Find
                                  </Button>
                                )}
                              </Stack>
                            </Box>
                          );
                        })}
                      </Stack>
                    </Paper>
                  ))}
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