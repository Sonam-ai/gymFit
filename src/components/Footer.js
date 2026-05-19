import React from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 8,
      py: 4,
      px: 3,
      bgcolor: 'background.paper',
      borderTop: 1,
      borderColor: 'divider',
    }}
  >
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{ maxWidth: 1488, mx: 'auto' }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <FitnessCenterIcon sx={{ color: 'primary.main' }} />
        <Typography fontWeight={700} color="text.primary">
          GymFit
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Find exercises by body part and build your perfect workout.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Gym Exercises
      </Typography>
    </Stack>
    <Divider sx={{ mt: 3, borderColor: 'divider' }} />
  </Box>
);

export default Footer;
