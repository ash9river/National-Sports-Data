import { useState, useEffect } from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import useSportQuery from '../Hooks/useSportQuery';
import { Sport } from '../Types/Sport';

function SportTypeSelect({
  onChange,
  defaultSportName,
}: {
  onChange: (sportName: string) => void;
  defaultSportName: string;
}) {
  const [selectedSport, setSelectedSport] = useState(defaultSportName || '');
  const { data: SportsApiResponse, isLoading } = useSportQuery();

  useEffect(() => {
    setSelectedSport(defaultSportName); // 기본값 변경 시 업데이트
  }, [defaultSportName]);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedSport(value);
    onChange(value); // 부모 컴포넌트로 전달
  };

  if (isLoading) {
    return <div></div>;
  }

  const SportsData: Sport[] = Array.isArray(SportsApiResponse?.data)
    ? SportsApiResponse.data
    : [];

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl sx={{ minWidth: 160, width: '100%' }}>
          <InputLabel
            id="sport-label"
            shrink
            sx={{ backgroundColor: 'white', padding: '0 4px 0 0' }}
          >
            스포츠 종목
          </InputLabel>
          <Select
            labelId="sport-label"
            name="sports"
            value={selectedSport}
            onChange={handleChange}
            label="종목"
            displayEmpty // 비어 있는 값도 표시
            renderValue={(value) => (value === '' ? '전체' : value)} // 값이 없을 경우 "전체" 표시
          >
            <MenuItem value="">전체</MenuItem> {/* 전체 선택 옵션 */}
            {SportsData.map((sportsType: Sport) => (
              <MenuItem key={sportsType.sportId} value={sportsType.sportName}>
                {sportsType.sportName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default SportTypeSelect;
