import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import React, {Component} from 'react'

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '36526850-4de1e998f6db27b12a1d4f142';


class ImageGallery extends Component{
state={
  photos: null,
  loading: false,
  error: null
}

  componentDidUpdate(prevProps, prevState){
   const prevQuery = prevProps.searchQuery
   const nextQuery = this.props.searchQuery
    console.log(1, prevQuery, nextQuery)


    if(prevQuery !== nextQuery){
      this.setState({loading: true, photos: null})

      fetch(`${BASE_URL}/?key=${KEY}&q=${nextQuery}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        if (response.ok){
        return response.json()
      }
      return Promise.reject(
        new Error(`There are no ${nextQuery} images.` )
      )
    })
      .then(photos => this.setState({photos}))
      .catch(error => this.setState({error}))
      .finally(()=> this.setState({loading: false})) 
    }
  }
   render() {
    // {this.state.photos && console.log(this.state.photos.hits[0].id) }
    const {loading, photos, error} = this.state
    const {onOpenModal} = this.props
    return (
    
      <>

      {error && <h1>{error.message}</h1>}
      {loading && <div>Загружается...</div>}
        {photos && 
        <ImageGalleryItem 
         data={photos}
         onOpenModal={onOpenModal}/>}
      </>
    )
   }
}
  export default ImageGallery
// console.log(this.state.photos.hits[0].id



//      {/* <ImageGalleryItem searchQuery={searchQuery} onCloseModal={onOpenModal}/> */}

//      {this.data.map(({id, webformatURL, largeImageURL, tags})=>{
//       console.log(id, webformatURL, largeImageURL, tags)
//       return ( 
//       <li
//         key={id} 
//         className="gallery-item">
//          <img src={webformatURL} alt={tags} />
//          </li>)
    
// })} 
/* <li className="gallery-item">
        <img src="" alt="" />
        !!!image!!!
        <button onClick={() => this.props.onOpenModal()}>
          OPEN MODAL
        </button>
      </li> */