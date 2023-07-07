import React, {useState, useEffect} from "react";
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

const App =() => {
 const [modal, setModal] = useState({isOpen: false, visibleData: null});
 const [searchQuery, setSearchQuery] = useState('');
 const [page, setPage] = useState(1);
 const [images, setImages] = useState([]);
 const [error, setError] = useState(null);
 const [status, setStatus] = useState('idle');
 const [loadMore, setLoadMore] = useState(false);

useEffect(() => {
  const fetchData = async()=> {
  if (!searchQuery) {
    return;
  }
  setImages([]);
  setStatus('pending');

  try {
    const {hits, total} =  await fetchImages(searchQuery, page)
    if (hits.length === 0){
      toast.success('There are no images available for your request', toastConfig)
    }
 
    setImages(()=> [...images, ...hits])  
    setLoadMore(page < Math.ceil(total / 12))
    
    setStatus('resolved')
   }catch(error) {
      setError(error)
      setStatus('rejected')
      toast.error(error.message, toastConfig)
   }
  }
   fetchData()
 }, [searchQuery, page]);

  
const  onOpenModal = data => {
  setModal({
    isOpen: true,
    visibleData: data,
  }) 
}
  
const  onCloseModal = () => {
  setModal({
    isOpen: false,
    visibleData: null
  }) 
}

const handleSearch=(searchQuery)=>{
    setPage(1)
    setSearchQuery(searchQuery)
  }

const  handleLoadMore = () => {
  setPage((prevPage)=> prevPage + 1)
  };
       

 if (status === 'idle') {
            return <Searchbar handleSearch={handleSearch}/>
          }
      if (status === 'pending') {
        return (
        <>
        <Searchbar handleSearch={handleSearch}/>
        <Loader/>
        </>
        )  
      }
      if (status === 'rejected') {
        return (
        <>
        <Searchbar handleSearch={handleSearch}/>
        <PhotoError message={error.message}/>
        </>
        )
    }
        
      if (status === 'resolved'){
        console.log(images)
        return (
        <>
         <Searchbar handleSearch={handleSearch}/>
          {images.length > 0 &&<ImageGallery 
          data={images} 
          searchQuery={searchQuery}
          page={page} 
          handleLoadMore={handleLoadMore}
          handleSearch={handleSearch}
          onOpenModal={onOpenModal}
          />}
         {modal.isOpen && <Modal visibleData={modal.visibleData} onCloseModal={onCloseModal}/>}
         {loadMore === true && <Button name='Load more' onClick={handleLoadMore}/>}
      </> )
      }
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

 