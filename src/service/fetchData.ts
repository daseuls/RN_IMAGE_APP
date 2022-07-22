import axios from 'axios';

const API_KEYS = 'Ieu5goHAuZ5ivDaoVQw2GKTNwWT4P8GZNtBONKjU1EA';
const BASE_URL = 'https://api.unsplash.com/photos?';

export const getImageList = (page: number) => {
  return axios
    .get(`${BASE_URL}client_id=${API_KEYS}`, {
      params: {
        page,
        per_page: 20,
        order_by: 'popular',
      },
    })
    .then(res => {
      return res;
    });
};
