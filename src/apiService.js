import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '21265855-20ad9644639ddbc8948511dcb';

const fetchImages = ({ searchQuery = '', page = 1, per_page = 12 }) =>
  axios
    .get(
      `?key=${API_KEY}&q=${searchQuery}&image_type=photo&per_page=${per_page}&page=${page}`,
    )
    .then(response => response.data.hits);

export default { fetchImages };
