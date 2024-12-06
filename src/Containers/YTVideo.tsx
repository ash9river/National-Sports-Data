import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import YouTube from 'react-youtube';
import { VITE_YOUTUBE_API_KEY } from '../Configs/ENV';

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

const YTVideo: React.FC<Props> = ({ PlaylistId }) => {
  const [videolist, setVideolist] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoLoadingStates, setVideoLoadingStates] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems`,
          {
            params: {
              part: 'snippet',
              playlistId: PlaylistId,
              key: VITE_YOUTUBE_API_KEY,
            },
          },
        );
        setVideolist(data.items || []);
        setVideoLoadingStates(new Array(data.items.length).fill(true)); // 각 비디오 초기 로딩 상태 설정
      } catch (error) {
        console.error('Failed to fetch video list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [PlaylistId]);

  const handleVideoReady = (index: number) => {
    setVideoLoadingStates((prev) =>
      prev.map((state, idx) => (idx === index ? false : state)),
    );
  };

  return (
    <Box
      sx={{
        overflowX: 'auto', // 수평 스크롤 가능
        display: 'flex',
        whiteSpace: 'nowrap', // 가로로 정렬
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
                width: '500px', // 고정된 너비
                height: '315px', // 고정된 높이
                marginRight: '10px',
                borderRadius: '8px',
                minWidth: '500px',
              }}
            />
          ))
        : videolist.map((video, index) => (
            <Box
              key={video.id}
              sx={{
                width: '500px',
                height: '315px',
                marginRight: '10px',
                position: 'relative', // Skeleton과 YouTube 정렬 기준 설정
                minWidth: '500px',
              }}
            >
              {videoLoadingStates[index] && (
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    borderRadius: '8px',
                    minWidth: '500px',
                  }}
                />
              )}
              <YouTube
                videoId={video.snippet.resourceId.videoId}
                opts={{
                  width: '500',
                  height: '315',
                  minWidth: '500px',
                  playerVars: {
                    autoplay: 0, // 자동 재생 비활성화
                    rel: 0, // 관련 동영상 표시 비활성화
                    modestbranding: 1, // YouTube 로고 최소화
                  },
                }}
                onReady={() => handleVideoReady(index)} // 비디오가 준비되면 로딩 상태 업데이트
              />
            </Box>
          ))}
    </Box>
  );
};

export default YTVideo;
