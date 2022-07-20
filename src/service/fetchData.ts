import axios from 'axios';

const BASE_URL =
  'https://api.unsplash.com/photos?client_id=Ieu5goHAuZ5ivDaoVQw2GKTNwWT4P8GZNtBONKjU1EA';

export const getImageList = (page: number) => {
  console.log('데이터 fetch!', page);
  return axios
    .get(BASE_URL, {
      params: {
        page,
        per_page: 10,
        order_by: 'popular',
      },
    })
    .then(res => {
      return res;
    });
};
