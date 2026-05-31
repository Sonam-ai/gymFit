import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, CircularProgress, Button, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// 1. Correct local utility pathing verified from your tree sidebar
import { fetchData } from '../components/utils/fetchData'; 
import { normalizeExercise } from '../utils/exerciseData';

// 2. IMPORT REAL FILES: Using the actual filenames from your visual directory tree
import ExercisePlaceholder from '../components/ExercisePlaceholder';
import ExerciseSteps from '../components/ExerciseSteps';
import ExerciseVideos from '../components/ExerciseVideos';

const ExerciseDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const fetchDetailedData = async () => {
      setLoading(true);
      setError('');
      
      try {
        // Queries your running local Express instance dataset endpoint wrapper
        const rawData = await fetchData(`/api/exercises/details/${id}`);
        
        if (cancelled) return;

        if (rawData && !rawData.error) {
          const normalizedData = normalizeExercise(rawData);
          setExerciseDetail(normalizedData);
        } else {
          setError('This exercise could not be located inside our local JSON database records.');
        }
      } catch (err) {
        console.error('[Detail Page Fetch Error]', err);
        if (!cancelled) setError('Failed to connect to the local asset server.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDetailedData();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={50} color="primary" />
      </Box>
    );
  }

  if (error || !exerciseDetail) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h5" color="error" fontWeight={600} mb={3}>
          {error || 'Exercise data error.'}
        </Typography>
        <Button startIcon={<ArrowBackIcon />} variant="contained" onClick={() => navigate('/')}>
          Go Back Home
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' }, px: { xs: 2, md: 6 }, pb: 6 }}>
      {/* Back navigation safety hook link element */}
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/')}
        sx={{ mb: 4, textTransform: 'none', fontWeight: 600 }}
      >
        Back to Dashboard
      </Button>

      <Stack spacing={5}>
        {/* Renders your local image asset canvas blocks beautifully */}
        <ExercisePlaceholder
           name={exerciseDetail.name}
           gifUrl={exerciseDetail.gifUrl}
        />
        
        {/* Maps out your parsed layout step arrays smoothly */}
        <ExerciseSteps exercise={exerciseDetail} />
        
        {/* Video integration block row context */}
        <ExerciseVideos exerciseVideos={[]} name={exerciseDetail.name} />
      </Stack>
    </Box>
  );
};

export default ExerciseDetail;