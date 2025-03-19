import axios from 'axios';

const API_KEY = '49393685-3ee93529131780612454ef79e';
const BASE_URL = 'https://pixabay.com/api/';

export async function getPictures(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch images');
  }
}