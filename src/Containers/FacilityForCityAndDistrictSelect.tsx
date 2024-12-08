import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
} from '@mui/material';
import useCityAndDistricctStore from '../Contexts/useCityAndDistrictStore';
import findCity, { cityData } from '../Utils/findCity';
import { City, District } from '../Types/CityAndDistrict';
import useDistrictQuery from '../Hooks/useDistrictQuery';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { useEffect } from 'react';

function FacilityForCityAndDistrictSelect() {
  const cityId = useCityAndDistricctStore((state) => state.cityId);
  const isAccessibleForDisabled = useCityAndDistricctStore(
    (state) => state.isAccessibleForDisabled,
  );
  const setCity = useCityAndDistricctStore((state) => state.setCity);
  const setDistrict = useCityAndDistricctStore((state) => state.setDistrict);
  const setIsAccessibleForDisabled = useCityAndDistricctStore(
    (state) => state.setIsAccessibleForDisabled,
  );

  const { data: DistrictData } = useDistrictQuery(cityId.toString());
  const { cityName, districtName, setPage } = useCityAndDistricctStore();

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

  function handleChange(event: SelectChangeEvent) {
    setPage(1);
    if (event.target.name === 'city') {
      const { cityId, cityName, cityCode } = findCity(event.target.value);
      setCity(cityId, cityCode, cityName);
    } else {
      if (DistrictData === undefined) return;
      const newDistrictData = DistrictData?.data?.filter(
        (disData) => disData.districtName == event.target.value,
      );
      if (newDistrictData === undefined) return;
      setDistrict(
        newDistrictData[0].districtId,
        newDistrictData[0].districtCode,
        newDistrictData[0].districtName,
      );
    }
  }

  function handleToggle() {
    if (isAccessibleForDisabled === 'Y') {
      setIsAccessibleForDisabled('N');
    } else {
      setIsAccessibleForDisabled('Y');
    }
  }

  return (
    <Grid2 container spacing={2} sx={{ m: 2 }}>
      <Grid2 size={12}>
        <FormControl sx={{ minWidth: 160, width: '100%' }}>
          <InputLabel id="city">광역시도</InputLabel>
          <Select
            labelId="city"
            name="city"
            value={cityName}
            label="광역시도"
            onChange={handleChange}
            key={`${cityId}dosi`}
          >
            {cityData.map((cityItem: City) => {
              return (
                <MenuItem value={cityItem.cityName} key={`${cityId}city`}>
                  {cityItem.cityName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 size={9.35}>
        <FormControl sx={{ minWidth: 120, width: '100%' }}>
          <InputLabel id="district">시군구</InputLabel>
          <Select
            labelId="district"
            name="district"
            value={districtName}
            label="광역시도"
            onChange={handleChange}
            key={`district`}
          >
            {DistrictData !== undefined &&
              DistrictData.data !== undefined &&
              DistrictData.data?.map((districtItem: District) => {
                return (
                  <MenuItem
                    value={districtItem.districtName}
                    key={`${districtItem.districtId}district`}
                  >
                    {districtItem.districtName}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 size={2}>
        <ToggleButton
          value="isAccessibleForDisabled"
          selected={isAccessibleForDisabled === 'Y'}
          onChange={handleToggle}
          size="large"
        >
          <AccessibleIcon />
        </ToggleButton>
      </Grid2>
    </Grid2>
  );
}

export default FacilityForCityAndDistrictSelect;
