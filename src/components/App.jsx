import React, {Component} from "react";
import PropTypes from "prop-types";
import {toast} from 'react-toastify'
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import PhotoError from "./ImageGalleryError/ImageGalleryError"
import {fetchImages} from '../services/getImages'

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

class App extends Component{
  state = {
    modal:{isOpen: false, visibleData: null}, 
    searchQuery: '',
    page: 1,
    images: [],
    error: null,
    status: 'idle',
    loadMore: false,
  };
  
  async componentDidUpdate(prevProps, prevState){

    const prevQuery = prevState.searchQuery
    const nextQuery = this.state.searchQuery
    const prevPage = prevState.page
    const nextPage = this.state.page

  if(prevQuery !== nextQuery){
    this.setState({ images:[], status: 'pending'})
  }

   if(prevQuery !== nextQuery || prevPage !== nextPage){
  
   try {
    const {hits, total} = await fetchImages(nextQuery, nextPage)
    if (hits.length === 0){
      toast.success('There are no images available for your request', toastConfig)
    }
    this.setState(prevState => ({
      images:[...prevState.images,...hits],
      loadMore: prevState.page < Math.ceil(total / 12),
      status: 'resolved',
    }))
   }catch(error) {
      this.setState({ error, status: 'rejected'})
      toast.error(error.message, toastConfig)
   }
  }
  }

  handleSearch=(searchQuery)=>{
    this.setState({searchQuery, page: 1})
  }

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  onOpenModal = data => {
    this.setState({
      modal: {
        isOpen: true,
       visibleData: data,
      }}) 
    }
  
    onCloseModal = () => {
      this.setState({
        modal: {
          isOpen: false,
         visibleData: null
        }}) 
      }
    
  render(){
    const { status, searchQuery, page, modal, images, loadMore, error} = this.state
  
    if (status === 'idle') {
          return <Searchbar handleSearch={this.handleSearch}/>
        }
    if (status === 'pending') {
      return (
      <>
      <Searchbar handleSearch={this.handleSearch}/>
      <Loader/>
      </>
      )  
    }
    if (status === 'rejected') {
      return (
      <>
      <Searchbar handleSearch={this.handleSearch}/>
      <PhotoError message={error.message}/>
      </>
      )
  }
      
    if (status === 'resolved'){
      return (
      <>
       <Searchbar handleSearch={this.handleSearch}/>
        {images.length > 0 &&<ImageGallery 
        data={images} 
        searchQuery={searchQuery}
        page={page} 
        handleLoadMore={this.handleLoadMore}
        handleSearch={this.handleSearch}
        onOpenModal={this.onOpenModal}
        />}
       {this.state.modal.isOpen && <Modal visibleData={modal.visibleData} onCloseModal={this.onCloseModal}/>}
       {loadMore === true && <Button name='Load more' onClick={this.handleLoadMore}/>}
    </> )
    }} 
  }

  App.propTypes = {
    modal: PropTypes.arrayOf(
      PropTypes.shape({
        isOpen: PropTypes.bool.isRequired,
        visibleData: PropTypes.shape({
          largeImageURL: PropTypes.string.isRequired,
          tags: PropTypes.string.isRequired,
        }).isRequired,
      })),
    searchQuery: PropTypes.string,
    page:  PropTypes.number,
    images: PropTypes.array,
    error: PropTypes.any,
    status: PropTypes.oneOf(['idle', 'pending', 'resolved', 'rejected']),
    loadMore: PropTypes.bool,
    };
   

export default App


