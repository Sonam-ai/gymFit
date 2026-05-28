import React from 'react';
import { Box, Skeleton, Stack, useTheme } from '@mui/material';

const ExerciseSkeletonCard = () => {
  const theme = useTheme();

  return (
    <Box
      className="exercise-skeleton-card"
      sx={{
        width: '100%',
        minHeight: 430,
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        borderTop: 4,
        borderTopColor: 'primary.main',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        boxShadow: theme.palette.mode === 'light'
          ? '0 4px 24px rgba(26, 29, 46, 0.08)'
          : '0 4px 24px rgba(0, 0, 0, 0.4)',
      }}
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={280}
        sx={{ bgcolor: theme.palette.mode === 'light' ? '#EDF2F4' : '#2B2B38' }}
      />
      <Stack spacing={1.4} sx={{ p: 2 }}>
        <Skeleton animation="wave" variant="text" width="78%" height={32} />
        <Stack direction="row" spacing={1}>
          <Skeleton animation="wave" variant="rounded" width={82} height={28} />
          <Skeleton animation="wave" variant="rounded" width={74} height={28} />
          <Skeleton animation="wave" variant="rounded" width={92} height={28} />
        </Stack>
        <Skeleton animation="wave" variant="text" width="62%" />
        <Skeleton animation="wave" variant="text" width="92%" />
        <Skeleton animation="wave" variant="text" width="70%" />
      </Stack>
    </Box>
  );
};

export default ExerciseSkeletonCard;
