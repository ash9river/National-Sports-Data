import { Container } from '@mui/material';
import useSideBarIsOpenStore from '../../Contexts/useSideBarIsOpenStore';

function SideBar() {
  const isOpen = useSideBarIsOpenStore((state) => state.isOpen);
  return (
    <Container
      sx={{
        position: 'absolute',
        width: '390px',
        height: 'calc(100vh - 65px)',
        bgcolor: 'white',
        top: '64px',
        zIndex: '999',
        p: '0',
        left: isOpen ? '240px' : '-240px',
        transition: 'all 0.3s ease-in',
      }}
    >
      <p>asd</p>
    </Container>
  );
}

export default SideBar;
