import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import CityAndDistrictSelect from '../Containers/CityAndDistrictSelect';
import SportTypeSelect from '../Containers/SportTypeSelect';

const SearchBox = ({
  onSearch,
  defaultSportName,
}: {
  onSearch: (query: { sportsName?: string }) => void;
  defaultSportName: string;
}) => {
  const [searchParams, setSearchParams] = useState({
    sportsName: defaultSportName || '',
  });

  const handleSportChange = (sportName: string) => {
    const updatedParams = { sportsName: sportName };
    setSearchParams(updatedParams);
    onSearch(updatedParams); // 변경 시 바로 검색 실행
  };

  const handleSearch = () => {
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
      <CityAndDistrictSelect />
      <SportTypeSelect
        onChange={handleSportChange}
        defaultSportName={searchParams.sportsName}
      />

      {/* <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSearch}
        fullWidth
        sx={{ textTransform: 'none', fontWeight: 'bold' }}
      >
        검색
      </Button> */}
    </Box>
  );
};

export default SearchBox;
