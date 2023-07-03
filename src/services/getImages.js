import axios from "axios";


const BASE_URL = 'https://pixabay.com/api/';
const KEY = '36526850-4de1e998f6db27b12a1d4f142';

export const fetchImages = async(query, page) => {
  const {data} = await axios.get(`${BASE_URL}/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`)
  console.log("response", data.total)
  return data
}


// function fetchImages(query, page=1){
//     return fetch(`${BASE_URL}/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`)
//     .then(response => {
//       if (response.ok){
//       return response.json()
//     }
//     return Promise.reject(
//       new Error(`There are no ${query} images.` )
//     )
//   })}

  // const api = {
  //   fetchImages,
  // }
  // export default api
    

