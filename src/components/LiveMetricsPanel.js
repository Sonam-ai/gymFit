import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const LiveMetricsPanel = ({ fitnessContext }) => {
  const metrics = [
    {
      title: 'BMI',
      value: fitnessContext?.bmi || '22.4',
      subtitle: fitnessContext?.bmiInfo?.label || 'Normal',
      icon: <SpeedIcon sx={{ color: '#00F2FE' }} />,
      glow: 'rgba(0, 242, 254, 0.15)',
    },
    {
      title: 'Calories',
      value: fitnessContext?.calories?.target || '2450',
      subtitle: 'Goal: 2600 kcal',
      icon: <LocalFireDepartmentIcon sx={{ color: '#EE0979' }} />,
      glow: 'rgba(238, 9, 121, 0.15)',
    },
    {
      title: 'Water Intake',
      value: '78%',
      subtitle: 'Goal: 2.5 L',
      icon: <WaterDropIcon sx={{ color: '#4FACFE' }} />,
      glow: 'rgba(79, 172, 254, 0.15)',
    },
    {
      title: 'Workout',
      value: '12',
      subtitle: 'This Week',
      icon: <FitnessCenterIcon sx={{ color: '#FFB800' }} />,
      glow: 'rgba(255, 184, 0, 0.15)',
    },
  ];

  return (
    <Grid container spacing={2}>
      {metrics.map((m, i) => (
        <Grid item xs={6} sm={3} key={i}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              background: 'linear-gradient(145deg, rgba(25, 35, 40, 0.6) 0%, rgba(15, 22, 25, 0.8) 100%)',
              boxShadow: `0 8px 24px ${m.glow}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.5px' }}>
                {m.title}
              </Typography>
              {m.icon}
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mt: 1 }}>
              {m.value}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              {m.subtitle}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default LiveMetricsPanel;