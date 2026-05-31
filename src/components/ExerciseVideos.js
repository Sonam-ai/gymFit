import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LaunchIcon from '@mui/icons-material/Launch';

const ExerciseVideos = ({ exerciseVideos = [], name }) => {
  // Generate a clean, direct search URL fallback so users can always find form guides instantly
  const cleanName = name ? encodeURIComponent(name) : '';
  const fallbackYouTubeSearchUrl = `https://www.youtube.com/results?search_query=how+to+do+${cleanName}+exercise+form`;

  // IF there are valid local video objects (e.g. if you ever seed video links directly in your database)
  if (Array.isArray(exerciseVideos) && exerciseVideos.length > 0) {
    return (
      <Box sx={{ mt: { lg: '20px', xs: '10px' }, p: '20px' }}>
        <Typography variant="h4" fontWeight={700} color="text.primary" mb="33px">
          Watch <span style={{ color: '#ff2625', textTransform: 'capitalize' }}>{name}</span> exercise videos
        </Typography>
        <Stack 
          justifyContent="flex-start" 
          flexWrap="wrap" 
          alignItems="center" 
          sx={{ flexDirection: { lg: 'row' }, gap: { lg: '110px', xs: '0' } }}
        >
          {exerciseVideos.slice(0, 3).map((item, index) => (
            <a
              key={index}
              className="exercise-video"
              href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <img src={item.video.thumbnails[0].url} alt={item.video.title} style={{ borderRadius: '4px' }} />
              <Box>
                <Typography variant="h5" color="text.primary" fontWeight={600}>
                  {item.video.title}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {item.video.channelName}
                </Typography>
              </Box>
            </a>
          ))}
        </Stack>
      </Box>
    );
  }

  // SMART FALLBACK: If the third-party API is disconnected, show a gorgeous interactive button panel
  return (
    <Box sx={{ mt: 4, p: 3, borderRadius: 3, border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
        <YouTubeIcon sx={{ color: '#FF0000', fontSize: 28 }} />
        <Typography variant="h6" fontWeight={700} color="text.primary">
          Watch Exercise Videos
        </Typography>
      </Stack>
      
      <Typography variant="body2" color="text.secondary" mb={3}>
        Form guides and technical video demonstrations for <strong style={{ textTransform: 'capitalize' }}>{name || 'this exercise'}</strong>.
      </Typography>

      <Box 
        sx={{ 
          p: 2.5, 
          borderRadius: 2, 
          bgcolor: (theme) => theme.palette.mode === 'light' ? '#F8F9FC' : '#1E1E26',
          border: '1px dashed',
          borderColor: 'divider',
          textAlign: 'center'
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
          Third-party streaming API is offline. Watch instructional guides on YouTube directly.
        </Typography>
        
        <Button
          variant="contained"
          color="error"
          size="medium"
          startIcon={<YouTubeIcon />}
          endIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
          href={fallbackYouTubeSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            textTransform: 'none', 
            fontWeight: 600,
            background: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
            boxShadow: '0 4px 14px rgba(255,0,0,0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #CC0000 0%, #990000 100%)',
            }
          }}
        >
          Search "{name || 'Exercise Form'}" on YouTube
        </Button>
      </Box>
    </Box>
  );
};

export default ExerciseVideos;