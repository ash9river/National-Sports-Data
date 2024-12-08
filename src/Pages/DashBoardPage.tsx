import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import PlayListItem from '../Components/Youtube/PlayListItem';
import { VITE_YOUTUBE_API_KEY } from '../Configs/ENV';

const CHANNEL_ID = 'UCpjBiFyCh3f5bDU99Izt8Fw';

interface PlaylistItem {
  id: string;
  snippet: {
    localized: {
      title: string;
    };
  };
}

const DashboardPage: React.FC = () => {
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const { data } = await axios.get(
          `https://snazzy-mooncake-f9e9e5.netlify.app/youtube/v3/playlists`,
          {
            params: {
              part: 'snippet',
              channelId: CHANNEL_ID,
              maxResults: 10,
            },
          },
        );
        setPlaylist(data.items || []);
      } catch (error) {
        console.error('Failed to fetch playlist:', error);
      }
    };

    fetchPlaylist();
  }, []);

  return (
    <Box
      sx={{
        height: 'calc(100vh - 65px)',
        overflowY: 'auto',
        width: 'calc(100vw - 240px)',
        scrollbarWidth: 'none', // Firefox에서 스크롤바 숨기기
        '&::-webkit-scrollbar': {
          display: 'none', // Chrome, Safari 스크롤바 숨기기
        },
      }}
    >
      {playlist.map((item) => (
        <PlayListItem
          key={item.id}
          title={item.snippet.localized.title}
          playlistId={item.id}
          channelId={CHANNEL_ID}
        />
      ))}
    </Box>
  );
};

export default DashboardPage;
