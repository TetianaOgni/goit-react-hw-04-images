import React, {Component} from 'react'
import {toast} from 'react-toastify'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import PhotoError from 'components/ImageGalleryError/ImageGalleryError'
import Loader from 'components/Loader/Loader'
import Button from 'components/Button/Button'
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
  status: 'idle',
// 1 ----
  page: 1, 
}

  componentDidUpdate(prevProps, prevState){
    console.log(5,prevProps, prevState)
   const prevQuery = prevProps.searchQuery
   const nextQuery = this.props.searchQuery
    console.log(1, prevQuery, nextQuery)
// 2-----
   const prevPage = prevProps.page
   const nextPage = this.state.page
   console.log(2, this.state.page)
   console.log(2, prevPage, nextPage)


    if(prevQuery !== nextQuery){
      this.setState({status: 'pending'})


      ImageAPI.fetchImages(nextQuery, nextPage)
      .then(photos => this.setState({photos,  status: 'resolved'}))
      .catch(error => {this.setState({error, status: 'rejected'})
       toast.error(error.message, toastConfig)}
      )
      // if(prevPage !== nextPage){
      // // 3----
      // ImageAPI.fetchImages(nextQuery, nextPage)
      // .then((newPhotos) => 
      // this.setState((prevState)=>({
      //   photos:[...prevState.photos, ...newPhotos],
      //   status: 'resolved',
      // }))
      // )
      // .catch(error => {this.setState({error, status: 'rejected'})
      //  toast.error(error.message, toastConfig)}
      // )}
      //  ------
    }
  }
// 4-----
  // handleLoadMore = () => {
  //   console.log(0, this.state.page)
  //   this.setState((prevState) => ({
  //     page: prevState.page + 1, 
  //   }))
  // }

  handleLoadMore = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      () => {
        const { searchQuery, page } = this.props;
        this.fetchImages(searchQuery, page);
      }
    );
  };


  fetchImages = (query, page) => {
    return ImageAPI.fetchImages(query, page)
      .then((newPhotos) =>
        this.setState((prevState) => ({
          photos: [...prevState.photos, ...newPhotos],
          status: 'resolved',
        }))
      )
      .catch((error) => {
        this.setState({ error, status: 'rejected' });
        toast.error(error.message, toastConfig);
      });
  };
// ---
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
      return <>

      <ImageGalleryItem 
      data={photos}
      onOpenModal={onOpenModal}/>
      {photos.total > 12 && <Button name='Load more' onClick={this.handleLoadMore}/>}
      </>
      
    }

   }
}
  export default ImageGallery




  
