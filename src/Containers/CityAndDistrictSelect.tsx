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

function CityAndDistrictSelect() {
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

  function handleChange(event: SelectChangeEvent) {
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
            label="광역시도"
            onChange={handleChange}
          >
            {cityData.map((cityItem: City) => {
              return (
                <MenuItem value={cityItem.cityName}>
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
            label="광역시도"
            onChange={handleChange}
          >
            {DistrictData !== undefined &&
              DistrictData.data !== undefined &&
              DistrictData.data?.map((districtItem: District) => {
                return (
                  <MenuItem value={districtItem.districtName}>
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

export default CityAndDistrictSelect;
