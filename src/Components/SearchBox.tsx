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

const SearchBox = ({
  onSearch,
}: {
  onSearch: (query: {
    keyword: string;
    city_code: string;
    isDisabledOnly: boolean;
  }) => void;
}) => {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    city_code: '11', // 기본값으로 "서울" 선택
    isDisabledOnly: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [id]: value }));
  };

  const handleCityChange = (e: SelectChangeEvent<string>) => {
    setSearchParams((prev) => ({
      ...prev,
      city_code: e.target.value as string,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => ({
      ...prev,
      isDisabledOnly: e.target.checked,
    }));
  };

  const handleSearch = () => {
    //console.log('Search Params:', searchParams);
    onSearch(searchParams);
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
      <Typography
        variant="h6"
        sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}
      >
        강좌 검색
      </Typography>

      {/* 검색어 입력 */}
      <TextField
        id="keyword"
        label="검색어"
        type="search"
        size="small"
        onChange={handleInputChange}
        fullWidth
      />

      {/* 도시 선택 */}
      <FormControl size="small" fullWidth>
        <InputLabel id="city-select-label">도시</InputLabel>
        <Select
          labelId="city-select-label"
          id="city"
          value={searchParams.city_code}
          onChange={handleCityChange}
          label="도시"
        >
          <MenuItem value="11">서울</MenuItem>
          <MenuItem value="26">부산</MenuItem>
          <MenuItem value="30">대전</MenuItem>
        </Select>
      </FormControl>

      {/* 장애인 강좌 필터 */}
      <FormControlLabel
        label="장애인 강좌만 보기"
        control={
          <Checkbox
            onChange={(event, checked) =>
              handleCheckboxChange(event as React.ChangeEvent<HTMLInputElement>)
            }
          />
        }
      />

      {/* 검색 버튼 */}
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
