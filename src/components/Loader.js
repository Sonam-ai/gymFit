import React from 'react';
import { Stack, useTheme } from '@mui/material';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
  const theme = useTheme();

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" width="100%" py={8}>
      <InfinitySpin color={theme.palette.primary.main} />
    </Stack>
  );
};

export default Loader;
