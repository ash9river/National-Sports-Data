import Box from '@mui/material/Box';
import ClippedDrawer from '../Components/ClipDrawer/ClipDrawer';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <ClippedDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
