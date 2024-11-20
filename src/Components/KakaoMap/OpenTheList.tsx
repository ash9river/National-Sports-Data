import { ArrowRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
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
        zIndex: '99',
        bgcolor: 'white',
        borderRadius: '0',
        '&:hover': {
          bgcolor: 'white',
        },
        transform: 'translateY(-50%)',
        transition: 'all 0.3s ease-in',
        left: isOpen ? '630px' : '240px',
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
