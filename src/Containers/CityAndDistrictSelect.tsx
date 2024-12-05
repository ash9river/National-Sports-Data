import React, { useEffect } from 'react';
import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
} from '@mui/material';
import useCityAndDistrictStore from '../Contexts/useCityAndDistrictStore';
import findCity, { cityData } from '../Utils/findCity';
import { City, District } from '../Types/CityAndDistrict';
import useDistrictQuery from '../Hooks/useDistrictQuery';
import AccessibleIcon from '@mui/icons-material/Accessible';

function CityAndDistrictSelect() {
  const {
    cityId,
    districtName,
    isAccessibleForDisabled,
    setCity,
    setDistrict,
    setIsAccessibleForDisabled,
  } = useCityAndDistrictStore();

  const { data: DistrictData } = useDistrictQuery(cityId.toString());

  // 도시 변경 시 첫 번째 시군구 값 자동 선택
  useEffect(() => {
    if (DistrictData && DistrictData.data && DistrictData.data.length > 0) {
      const firstDistrict = DistrictData.data[0];
      setDistrict(
        firstDistrict.districtId,
        firstDistrict.districtCode,
        firstDistrict.districtName,
      );
    }
  }, [DistrictData]);

  const handleCityChange = (event: SelectChangeEvent) => {
    const { cityId, cityName, cityCode } = findCity(
      event.target.value as string,
    );
    setCity(cityId, cityCode, cityName);
  };

  const handleToggle = () => {
    setIsAccessibleForDisabled(!isAccessibleForDisabled);
  };

  return (
    <Grid2 container spacing={2} sx={{ m: 2 }}>
      <Grid2 size={12}>
        <FormControl sx={{ minWidth: 160, width: '100%' }}>
          <InputLabel id="city">광역시도</InputLabel>
          <Select
            labelId="city"
            name="city"
            label="광역시도"
            value={
              cityData.find((city) => city.cityId === cityId)?.cityName || ''
            }
            onChange={handleCityChange}
          >
            {cityData.map((cityItem: City) => (
              <MenuItem key={cityItem.cityCode} value={cityItem.cityName}>
                {cityItem.cityName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 size={9.35}>
        <FormControl sx={{ minWidth: 120, width: '100%' }}>
          <InputLabel id="district">시군구</InputLabel>
          <Select
            labelId="district"
            name="district"
            label="시군구"
            value={districtName || ''}
            onChange={(event) => {
              const selectedDistrict = DistrictData?.data?.find(
                (district) => district.districtName === event.target.value,
              );
              if (selectedDistrict) {
                setDistrict(
                  selectedDistrict.districtId,
                  selectedDistrict.districtCode,
                  selectedDistrict.districtName,
                );
              }
            }}
          >
            {DistrictData?.data?.map((districtItem: District) => (
              <MenuItem
                key={districtItem.districtCode}
                value={districtItem.districtName}
              >
                {districtItem.districtName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 size={2}>
        <ToggleButton
          value="isAccessibleForDisabled"
          selected={isAccessibleForDisabled}
          onChange={handleToggle}
          size="large"
        >
          <AccessibleIcon />
        </ToggleButton>
      </Grid2>
    </Grid2>
  );
}

export default CityAndDistrictSelect;
