import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import YouTubeIcon from '@mui/icons-material/YouTube';

import { fetchData, youtubeOptions } from './utils/fetchData';

const getBestThumbnail = (thumbnails = []) => {
  if (!Array.isArray(thumbnails) || thumbnails.length === 0) return '';

  return [...thumbnails].sort((a, b) => (b.width || 0) - (a.width || 0))[0]?.url || '';
};

const normalizeVideoResults = (data) => {
  const videos = Array.isArray(data?.contents) ? data.contents : [];

  return videos
    .map((item) => item.video)
    .filter((video) => video?.videoId && video?.title)
    .slice(0, 6)
    .map((video) => ({
      id: video.videoId,
      title: video.title,
      channel: video.channelName || video.author?.title || 'YouTube',
      duration: video.lengthText || video.durationText || '',
      views: video.viewCountText || '',
      thumbnail: getBestThumbnail(video.thumbnails),
      url: `https://www.youtube.com/watch?v=${video.videoId}`,
    }));
};

const ExerciseVideos = ({ exercise }) => {
  const theme = useTheme();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const query = useMemo(() => {
    if (!exercise?.name) return '';
    return `${exercise.name} exercise proper form`;
  }, [exercise?.name]);

  useEffect(() => {
    if (!query) return;

    let cancelled = false;

    const loadVideos = async () => {
      setLoading(true);

      const data = await fetchData(
        `https://youtube-search-and-download.p.rapidapi.com/search?query=${encodeURIComponent(query)}`,
        youtubeOptions,
      );

      if (!cancelled) {
        setVideos(normalizeVideoResults(data));
        setLoading(false);
      }
    };

    loadVideos();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        mb={2.5}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <YouTubeIcon color="primary" />
          <Box>
            <Typography variant="h6" fontWeight={800} color="text.primary">
              Watch exercise videos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Form guides and demonstrations from YouTube
            </Typography>
          </Box>
        </Stack>

        <Chip
          label="RapidAPI YouTube"
          size="small"
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 700 }}
        />
      </Stack>

      {loading && (
        <Stack alignItems="center" justifyContent="center" py={5}>
          <CircularProgress size={34} />
          <Typography variant="body2" color="text.secondary" mt={1.5}>
            Finding helpful videos...
          </Typography>
        </Stack>
      )}

      {!loading && videos.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'action.hover',
          }}
        >
          <Typography fontWeight={700} color="text.primary">
            No videos found right now
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.75}>
            Try refreshing later or search YouTube for this exercise name.
          </Typography>
          <Button
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            endIcon={<OpenInNewIcon fontSize="small" />}
            sx={{ mt: 2 }}
          >
            Search on YouTube
          </Button>
        </Paper>
      )}

      {!loading && videos.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: 2,
          }}
        >
          {videos.map((video) => (
            <Paper
              key={video.id}
              component="a"
              href={video.url}
              target="_blank"
              rel="noreferrer"
              elevation={0}
              sx={{
                display: 'block',
                overflow: 'hidden',
                textDecoration: 'none',
                borderRadius: 3,
                border: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: 'primary.main',
                  boxShadow: theme.palette.mode === 'light'
                    ? '0 14px 36px rgba(47, 143, 131, 0.14)'
                    : '0 14px 36px rgba(79, 188, 172, 0.18)',
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  aspectRatio: '16 / 9',
                  bgcolor: theme.palette.mode === 'light' ? '#EEF7F4' : '#10201F',
                }}
              >
                {video.thumbnail && (
                  <Box
                    component="img"
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                )}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.34))',
                  }}
                >
                  <PlayCircleFilledWhiteIcon sx={{ fontSize: 54, color: '#fff', filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.35))' }} />
                </Box>
                {video.duration && (
                  <Chip
                    label={video.duration}
                    size="small"
                    sx={{
                      position: 'absolute',
                      right: 10,
                      bottom: 10,
                      bgcolor: 'rgba(0,0,0,0.72)',
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  />
                )}
              </Box>

              <Stack spacing={1} sx={{ p: 2 }}>
                <Typography
                  color="text.primary"
                  fontWeight={800}
                  lineHeight={1.35}
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {video.title}
                </Typography>
                <Stack direction="row" justifyContent="space-between" spacing={1}>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {video.channel}
                  </Typography>
                  <Stack
                    component="span"
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    sx={{ flexShrink: 0, color: 'primary.main', fontWeight: 700 }}
                  >
                    Watch
                    <OpenInNewIcon fontSize="small" />
                  </Stack>
                </Stack>
                {video.views && (
                  <Typography variant="caption" color="text.secondary">
                    {video.views}
                  </Typography>
                )}
              </Stack>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ExerciseVideos;
