import React, { useEffect, useState } from 'react';
import { Box, Chip, CircularProgress, useTheme } from '@mui/material';

import { getDirectGifUrl, loadExerciseMedia } from '../utils/exerciseMedia';
import { getExercisePhotoFallback } from '../utils/exercisePhotoFallback';
import ExercisePlaceholder from './ExercisePlaceholder';

const ExerciseGif = ({
  exercise,
  alt,
  height = 320,
  showLabel = true,
  borderRadius = 3,
  resolution = 360,
}) => {
  const theme = useTheme();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setImgError(false);

      const result = await loadExerciseMedia(exercise, resolution);

      if (!cancelled) {
        setMedia(result);
        setLoading(false);
      }
    };

    if (exercise?.id || exercise?.name) {
      load();
    } else {
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [exercise, resolution]);

  const directImageUrl = getDirectGifUrl(exercise);
  const directImageNeedsHeaders = directImageUrl.includes('exercisedb.p.rapidapi.com/image');
  const fallbackImageUrl = getExercisePhotoFallback(exercise);
  const imageSrc = media?.src || (directImageNeedsHeaders ? '' : directImageUrl) || fallbackImageUrl;
  const isAnimated = Boolean(media?.isAnimated || (directImageUrl && !directImageNeedsHeaders));
  const showPlaceholder = !imageSrc || imgError;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height,
        borderRadius,
        overflow: 'hidden',
        bgcolor: theme.palette.mode === 'light' ? '#F0F2F8' : '#252532',
        border: 1,
        borderColor: 'divider',
      }}
    >
      {loading && (
        <CircularProgress
          size={36}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            mt: '-18px',
            ml: '-18px',
            zIndex: 3,
            color: 'primary.main',
          }}
        />
      )}

      {showPlaceholder ? (
        <ExercisePlaceholder name={exercise?.name} height={height} />
      ) : (
        <>
          {showLabel && (
            <Chip
              label={isAnimated ? 'Animated' : 'Photo'}
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                zIndex: 2,
                fontWeight: 600,
                bgcolor: 'rgba(0,0,0,0.6)',
                color: '#fff',
                '& .MuiChip-label': { px: 1 },
              }}
            />
          )}
          <Box
            component="img"
            src={imageSrc}
            alt={alt || exercise?.name || 'Exercise'}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => {
              if (imageSrc !== fallbackImageUrl) {
                setMedia({ src: fallbackImageUrl, isAnimated: false, source: 'photo-fallback' });
                setImgError(false);
              } else {
                setImgError(true);
              }
            }}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: isAnimated ? 'contain' : 'cover',
              p: isAnimated ? 1 : 0,
              opacity: loading ? 0.4 : 1,
              transition: 'opacity 0.35s ease',
            }}
          />
        </>
      )}
    </Box>
  );
};

export default ExerciseGif;
