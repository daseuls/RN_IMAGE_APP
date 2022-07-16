import axios from 'axios';

const BASE_URL =
  'https://api.unsplash.com/photos?client_id=Ieu5goHAuZ5ivDaoVQw2GKTNwWT4P8GZNtBONKjU1EA';

export const getImageList = (page: number) => {
  return axios
    .get(BASE_URL, {
      params: {
        page,
        per_page: 24,
        order_by: 'popular',
      },
    })
    .then(res => {
      return res;
    });
};
