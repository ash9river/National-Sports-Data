import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import CityAndDistrictSelect from '../Containers/CityAndDistrictSelect';

const SearchBox = ({
  onSearch,
}: {
  onSearch: (query: {
    districtCode: string;
    cityCode: string;
    isDisabledOnly: boolean;
  }) => void;
}) => {
  const [searchParams, setSearchParams] = useState({
    districtCode: '110',
    cityCode: '11', // 기본값으로 "서울" 선택
    isDisabledOnly: false,
  });

  const handleSearch = () => {
    //console.log('Search Params:', searchParams);
    // onSearch(searchParams);
    onSearch({} as any);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 600,
        mx: 'auto',
        mt: 2,
        mb: 4,
      }}
    >
      <CityAndDistrictSelect />

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSearch}
        fullWidth
        sx={{ textTransform: 'none', fontWeight: 'bold' }}
      >
        검색
      </Button>
    </Box>
  );
};

export default SearchBox;
