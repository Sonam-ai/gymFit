import React, { useState } from 'react';
import {
  Box,
  Stack,
  Step,
  StepButton,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import { parseInstructions } from '../utils/exerciseData';
import ExerciseGif from './ExerciseGif';

const ExerciseSteps = ({ exercise, showGif = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const steps = parseInstructions(exercise?.instructions);
  const [activeStep, setActiveStep] = useState(0);

  if (!steps.length) {
    return (
      <Typography color="text.secondary">
        No step-by-step instructions available from the API for this exercise.
      </Typography>
    );
  }

  const stepContent = (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      nonLinear
      sx={{
        '& .MuiStepConnector-line': {
          borderColor: 'divider',
          minHeight: 28,
        },
      }}
    >
      {steps.map((step, index) => (
        <Step key={step.number} expanded>
          <StepButton
            onClick={() => setActiveStep(index)}
            sx={{
              alignItems: 'flex-start',
              py: 1.5,
              '&:hover': { bgcolor: 'action.hover', borderRadius: 2 },
            }}
          >
            <StepLabel
              StepIconComponent={() => (
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 15,
                    bgcolor: activeStep === index ? 'primary.main' : 'action.hover',
                    color: activeStep === index ? '#fff' : 'text.secondary',
                    border: 2,
                    borderColor: activeStep === index ? 'primary.main' : 'divider',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {step.number}
                </Box>
              )}
            >
              <Typography
                fontWeight={activeStep === index ? 700 : 500}
                color={activeStep === index ? 'text.primary' : 'text.secondary'}
                textAlign="left"
                sx={{ lineHeight: 1.6, pt: 0.5 }}
              >
                {step.text}
              </Typography>
            </StepLabel>
          </StepButton>
          {activeStep === index && (
            <StepContent>
              <Box
                sx={{
                  ml: 2,
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === 'light' ? '#EEF7F4' : '#10201F',
                  borderLeft: 4,
                  borderColor: 'primary.main',
                }}
              >
                <Typography variant="body2" color="text.secondary" fontWeight={600} mb={0.5}>
                  Step {step.number} of {steps.length}
                </Typography>
                <Typography color="text.primary" lineHeight={1.7}>
                  {step.text}
                </Typography>
              </Box>
            </StepContent>
          )}
        </Step>
      ))}
    </Stepper>
  );

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <FormatListNumberedIcon color="primary" />
        <Typography variant="h6" fontWeight={700} color="text.primary">
          Step-by-step ({steps.length} steps)
        </Typography>
      </Stack>

      {showGif && isMobile && (
        <Box sx={{ mb: 3 }}>
          <ExerciseGif exercise={exercise} height={280} />
          <Typography variant="caption" color="text.secondary" display="block" mt={1} textAlign="center">
            Animated demonstration from ExerciseDB
          </Typography>
        </Box>
      )}

      {stepContent}
    </Box>
  );
};

export default ExerciseSteps;
