import React, { useEffect, useState, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import YouTube from 'react-youtube';
import axios from 'axios';

interface VideoItem {
  id: string;
  snippet: {
    thumbnails: {
      high: {
        url: string;
      };
    };
    description: string;
    title: string;
    resourceId: {
      videoId: string;
    };
  };
}

interface Props {
  channelId: string;
  PlaylistId: string;
}

const YTVideo: React.FC<Props> = ({ PlaylistId, channelId }) => {
  const [videolist, setVideolist] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchVideos = useCallback(
    async (pageToken: string | null = null) => {
      setLoading(pageToken === null);
      setLoadingMore(pageToken !== null);

      try {
        const { data } = await axios.get(
          `https://snazzy-mooncake-f9e9e5.netlify.app/youtube/v3/playlistItems`,
          {
            params: {
              part: 'snippet',
              playlistId: PlaylistId,
              pageToken: pageToken || undefined,
              fields: 'items(snippet(title,thumbnails,resourceId(videoId)))',
              maxResults: 10,
            },
          },
        );

        setVideolist((prev) => [...prev, ...data.items]);
        setNextPageToken(data.nextPageToken || null);
      } catch (error) {
        console.error('Failed to fetch video list:', error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [PlaylistId],
  );

  useEffect(() => {
    fetchVideos(); // 초기 데이터 가져오기
  }, [fetchVideos]);

  useEffect(() => {
    if (!observerRef.current || !nextPageToken) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageToken) {
          fetchVideos(nextPageToken); // 다음 페이지 데이터 가져오기
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [nextPageToken, fetchVideos]);

  return (
    <Box
      sx={{
        overflowX: 'auto',
        display: 'flex',
        whiteSpace: 'nowrap',
        padding: '10px',
        minHeight: '315px',
        minWidth: '500px',
      }}
    >
      {loading
        ? Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rectangular"
              sx={{
                width: '500px',
                height: '315px',
                marginRight: '10px',
                borderRadius: '8px',
              }}
            />
          ))
        : videolist.map((video) => (
            <Box
              key={video.id}
              sx={{
                width: '500px',
                height: '315px',
                marginRight: '10px',
              }}
            >
              <YouTube
                videoId={video.snippet.resourceId.videoId}
                opts={{
                  width: '500',
                  height: '315',
                  playerVars: {
                    autoplay: 0,
                    rel: 0,
                    modestbranding: 1,
                  },
                }}
              />
            </Box>
          ))}

      {loadingMore &&
        Array.from({ length: 2 }).map((_, idx) => (
          <Skeleton
            key={`loading-${idx}`}
            variant="rectangular"
            sx={{
              width: '500px',
              height: '315px',
              marginRight: '10px',
              borderRadius: '8px',
            }}
          />
        ))}

      {/* 무한 스크롤 트리거 */}
      <div ref={observerRef} style={{ width: '1px', height: '1px' }} />
    </Box>
  );
};

export default YTVideo;
