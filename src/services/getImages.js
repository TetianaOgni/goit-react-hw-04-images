import axios from "axios";
import PropTypes from "prop-types";


const BASE_URL = 'https://pixabay.com/api/';
const KEY = '36526850-4de1e998f6db27b12a1d4f142';

export const fetchImages = async(query, page) => {
  const {data} = await axios.get(`${BASE_URL}/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`)
  return data
}

fetchImages.propTypes = {
  query: PropTypes.string,
  page:  PropTypes.number,
}
