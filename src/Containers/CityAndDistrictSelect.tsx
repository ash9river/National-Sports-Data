import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import useCityAndDistricctStore from '../Contexts/useCityAndDistrictStore';
import findCity, { cityData } from '../Utils/findCity';
import { City } from '../Types/CityAndDistrict';

function CityAndDistrictSelect() {
  const cityName = useCityAndDistricctStore((state) => state.cityName);
  const setCity = useCityAndDistricctStore((state) => state.setCity);
  function handleChange(event: SelectChangeEvent) {
    const { cityId, cityName, cityCode } = findCity(event.target.value);
    setCity(cityId, cityCode, cityName);
  }

  return (
    <FormControl>
      <InputLabel id="city">광역시도</InputLabel>
      <Select
        labelId="city"
        value={cityName}
        label="광역시도"
        onChange={handleChange}
      >
        {cityData.map((cityItem: City) => {
          return (
            <MenuItem value={cityItem.cityName}>{cityItem.cityName}</MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default CityAndDistrictSelect;
