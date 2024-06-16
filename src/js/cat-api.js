import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_v5ZqsoCBTNbnAMj0I30H5oO7TBEyyAOAqsK6dL1nSDQ8kYLpTDBJqJJ1Cj2BM2Al';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(({ data }) => {
    return data;
  });
}

export function fetchCatByBreed(id) {
  return axios
    .get('https://api.thecatapi.com/v1/images/search', {
      breed_ids: id,
    })
    .then(({ data }) => {
      return data;
    });
}
