import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';

import BodyPart from './BodyPart';

const HorizontalScrollbar = ({
  data,
  bodyPart,
  setBodyPart,
  bodyPartImages = {},
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '18px',
          color: 'text.secondary',
          mb: 2,
          textAlign: { xs: 'center', lg: 'left' },
        }}
      >
        Browse by body part
      </Typography>
      <Box
        sx={{
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          py: 2,
          px: { xs: 0.5, sm: 1 },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '20px',
          },
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          sx={{
            flexWrap: 'nowrap',
            width: 'max-content',
            mx: { lg: 'auto', xs: 0 },
          }}
        >
          {data.map((item) => (
            <BodyPart
              key={item.id || item}
              item={item}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
              imageUrl={bodyPartImages[item]}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default HorizontalScrollbar;
