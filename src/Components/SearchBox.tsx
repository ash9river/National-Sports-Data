import { useState } from 'react';
import { Box } from '@mui/material';
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
    </Box>
  );
};

export default SearchBox;
