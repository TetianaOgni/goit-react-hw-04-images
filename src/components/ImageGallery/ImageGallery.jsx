import React, {Component} from 'react'
import {toast} from 'react-toastify'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import PhotoError from 'components/ImageGalleryError/ImageGalleryError'
import Loader from 'components/Loader/Loader'
import ImageAPI from '../../services/getImages'


const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  };

class ImageGallery extends Component{
state={
  photos: null,
  error: null,
  status: 'idle'
}

  componentDidUpdate(prevProps, prevState){
   const prevQuery = prevProps.searchQuery
   const nextQuery = this.props.searchQuery
    console.log(1, prevQuery, nextQuery)


    if(prevQuery !== nextQuery){
      this.setState({status: 'pending'})


      ImageAPI.fetchImages(nextQuery)
      .then(photos => this.setState({photos,  status: 'resolved'}))
      .catch(error => {this.setState({error, status: 'rejected'})
       toast.error(error.message, toastConfig)}
      )

    }
  }
   render() {
  
    const {photos, error, status} = this.state
    const {onOpenModal} = this.props

    // if (status === 'idle') {
    //   return <div>Enter text</div>
    // }
 
    
    if (status === 'pending') {
      return <Loader/>
    }

    if (status === 'rejected') {
      return <PhotoError message={error.message}/>
    }
    if (status === 'resolved' ) {
      return <ImageGalleryItem 
      data={photos}
      onOpenModal={onOpenModal}/>
    }

   }
}
  export default ImageGallery




  
