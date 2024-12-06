import { City } from '../Types/CityAndDistrict';

export const cityData: City[] = [
  {
    cityId: '1',
    cityName: '서울특별시',
    cityCode: '11',
  },
  {
    cityId: '2',
    cityName: '부산광역시',
    cityCode: '26',
  },
  {
    cityId: '3',
    cityName: '대구광역시',
    cityCode: '27',
  },
  {
    cityId: '4',
    cityName: '인천광역시',
    cityCode: '28',
  },
  {
    cityId: '5',
    cityName: '광주광역시',
    cityCode: '29',
  },
  {
    cityId: '6',
    cityName: '대전광역시',
    cityCode: '30',
  },
  {
    cityId: '7',
    cityName: '울산광역시',
    cityCode: '31',
  },
  {
    cityId: '8',
    cityName: '세종특별자치시',
    cityCode: '36',
  },
  {
    cityId: '9',
    cityName: '경기도',
    cityCode: '41',
  },
  {
    cityId: '10',
    cityName: '충청북도',
    cityCode: '43',
  },
  {
    cityId: '11',
    cityName: '충청남도',
    cityCode: '44',
  },
  {
    cityId: '12',
    cityName: '전라남도',
    cityCode: '46',
  },
  {
    cityId: '13',
    cityName: '경상북도',
    cityCode: '47',
  },
  {
    cityId: '14',
    cityName: '경상남도',
    cityCode: '48',
  },
  {
    cityId: '15',
    cityName: '제주특별자치도',
    cityCode: '50',
  },
  {
    cityId: '16',
    cityName: '강원특별자치도',
    cityCode: '51',
  },
  {
    cityId: '17',
    cityName: '전북특별자치도',
    cityCode: '52',
  },
];

function findCity(cityName: string) {
  const data = cityData.filter((city) => city.cityName === cityName);
  return {
    cityId: data[0].cityId,
    cityName: data[0].cityName,
    cityCode: data[0].cityCode,
  };
}

export default findCity;
