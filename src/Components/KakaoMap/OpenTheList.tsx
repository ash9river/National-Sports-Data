import { ArrowRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import useSideBarIsOpenStore from '../../Contexts/useSideBarIsOpenStore';

function OpenTheList() {
  const isOpen = useSideBarIsOpenStore((state) => state.isOpen);
  const setIsOpen = useSideBarIsOpenStore((state) => state.setIsOpen);
  function handleClick() {
    setIsOpen(!isOpen);
  }
  // 정적은 css
  // 동적은 style?
  return (
    <IconButton
      sx={{
        p: '0',
        position: 'absolute',
        top: '50%',
        left: isOpen ? '630px' : '240px',
        zIndex: '99',
        width: '23px',
        height: '46px',
        bgcolor: 'white',
        border: '1px solid #e3e3e3',
        borderLeft: '0px',
        borderRadius: '0px 9px 9px 0px',
        '&:hover': {
          bgcolor: 'white',
        },
        transform: 'translateY(-50%)',
        transition: 'all 0.3s ease-in',
      }}
      onClick={handleClick}
    >
      <ArrowRight
        sx={{
          transform: isOpen ? 'rotate(180deg)' : 'none',
        }}
      />
    </IconButton>
  );
}

export default OpenTheList;
