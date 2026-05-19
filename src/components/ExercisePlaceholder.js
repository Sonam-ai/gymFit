import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';

const ExercisePlaceholder = ({ name, height = 280 }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(145deg, #F0F2F8 0%, #E8ECF4 100%)'
          : 'linear-gradient(145deg, #252532 0%, #1a1a24 100%)',
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.mode === 'light' ? '#fff' : '#2a2a38',
          boxShadow: theme.palette.mode === 'light'
            ? '0 8px 24px rgba(26,29,46,0.1)'
            : '0 8px 24px rgba(0,0,0,0.35)',
        }}
      >
        <FitnessCenterOutlinedIcon sx={{ fontSize: 36, color: 'primary.main' }} />
      </Box>
      {name && (
        <Typography
          variant="caption"
          color="text.secondary"
          textTransform="capitalize"
          textAlign="center"
          px={2}
        >
          {name}
        </Typography>
      )}
    </Box>
  );
};

export default ExercisePlaceholder;
