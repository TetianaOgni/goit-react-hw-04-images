import React, {Component} from 'react'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import PhotoError from 'components/ImageGalleryError/ImageGalleryError'
import ImagePendingView from 'components/ImagePendingView/ImagePendingView';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '36526850-4de1e998f6db27b12a1d4f142';


class ImageGallery extends Component{
state={
  photos: null,
  // loading: false,
  error: null,
  status: 'idle'
}

  componentDidUpdate(prevProps, prevState){
   const prevQuery = prevProps.searchQuery
   const nextQuery = this.props.searchQuery
    console.log(1, prevQuery, nextQuery)


    if(prevQuery !== nextQuery){
      // this.setState({photo: null, loading: true,})
      this.setState({status: 'pending'})

      fetch(`${BASE_URL}/?key=${KEY}&q=${nextQuery}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        if (response.ok){
        return response.json()
      }
      return Promise.reject(
        new Error(`There are no ${nextQuery} images.` )
      )
    })
      // .then(photos => this.setState({photos}))
      .then(photos => this.setState({photos,  status: 'resolved'}))
      // .catch(error => this.setState({error}))
      .catch(error => this.setState({error, status: 'rejected'}))
      // .finally(()=> this.setState({loading: false})) 
    }
  }
   render() {
    // {this.state.photos && console.log(this.state.photos.hits[0].id) }
   
    // const { loading, photos, error, status} = this.state
    // const {onOpenModal, searchQuery} = this.props

    const {photos, error, status} = this.state
    const {onOpenModal, searchQuery} = this.props

    if (status === 'idle') {
      return <div>Enter text</div>
    }
    if (status === 'pending') {
      return <ImagePendingView searchQuery={searchQuery}/>
    }
    if (status === 'rejected') {
      return <PhotoError message={error.message}/>
    }
    if (status === 'resolved' ) {
      return <ImageGalleryItem 
      data={photos}
      onOpenModal={onOpenModal}/>
    }
  // }
    // return (
    //   <>
    //     {error && <h1>{error.message}</h1>}
    //     {loading && <div>Загружается...</div>}
    //     {!searchQuery && <div>Enter text</div>}
    //       {photos && 
    //       <ImageGalleryItem 
    //       data={photos}
    //       onOpenModal={onOpenModal}/>}
    //   </>
    // )
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

//  так выглядел render до применения "машины состояния"
// render() {
//   // {this.state.photos && console.log(this.state.photos.hits[0].id) }
//   const {loading, photos, error} = this.state
//   const {onOpenModal} = this.props    

// return (
    
//         <>
  
//         {error && <h1>{error.message}</h1>}
//         {loading && <div>Загружается...</div>}
//           {photos && 
//           <ImageGalleryItem 
//            data={photos}
//            onOpenModal={onOpenModal}/>}
//         </>
//       )}