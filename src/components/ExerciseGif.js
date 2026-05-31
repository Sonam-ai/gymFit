import React, { useState } from 'react';
import { Box, Skeleton } from '@mui/material';

const ExerciseGif = ({ exercise, height = 280 }) => {
  const [loading, setLoading] = useState(true);

  if (!exercise || !exercise.id) {
    return (
      <Box 
        sx={{ 
          height, 
          bgcolor: 'action.hover', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}
      >
        <img 
          src="/assets/images/Logo.png" 
          alt="Fallback Placeholder" 
          style={{ width: '80px', opacity: 0.5 }} 
        />
      </Box>
    );
  }

  // Target your frontend's public folder structure precisely
  const localImageSrc = `/assets/images/${exercise.id}.gif`;

  return (
    <Box sx={{ width: '100%', height, position: 'relative', bgcolor: '#fff' }}>
      {loading && (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          animation="wave" 
          sx={{ position: 'absolute', top: 0, left: 0 }} 
        />
      )}
      <img
        src={localImageSrc}
        alt={exercise.name || 'Exercise preview'}
        loading="lazy"
        onLoad={() => setLoading(false)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: loading ? 'none' : 'block',
        }}
        onError={(e) => {
          setLoading(false);
          // If the GIF is missing or named slightly differently, show your main gym logo instead
          e.target.src = '/assets/images/Logo.png';
          e.target.style.objectFit = 'contain';
          e.target.style.padding = '20px';
        }}
      />
    </Box>
  );
};

export default ExerciseGif;