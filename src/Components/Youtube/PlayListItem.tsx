import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import YTVideo from '../../Containers/YTVideo';

interface PlaylistItemProps {
  title: string;
  playlistId: string;
  channelId: string;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  title,
  playlistId,
  channelId,
}) => {
  return (
    <Box sx={{ margin: '10px' }} className="playlist">
      <Typography variant="h5">{title}</Typography>
      <YTVideo channelId={channelId} PlaylistId={playlistId} />
    </Box>
  );
};

export default PlaylistItem;
