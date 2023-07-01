// import 'axios'

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '36526850-4de1e998f6db27b12a1d4f142';

function fetchImages(query){
    return fetch(`${BASE_URL}/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => {
      if (response.ok){
      return response.json()
    }
    return Promise.reject(
      new Error(`There are no ${query} images.` )
    )
  })}

  const api = {
    fetchImages,
  }
  export default api
    

// const BASE_URL = 'https://pixabay.com/api/';
// const KEY = '36526850-4de1e998f6db27b12a1d4f142';

// export default class PicturesService {
//   constructor() {
//     this.page = 1;
//     this.searchQuery = '';
//     this.per_page = 10;
//   }
//   async getPictures() {
//     const { data } = await axios.get(
//       `${BASE_URL}/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`
//     );
//     this.incrementPage();
//     return data;
//   }
//   resetPage() {
//     this.page = 1;
//   }
//   incrementPage() {
//     this.page += 1;
//   }
// }