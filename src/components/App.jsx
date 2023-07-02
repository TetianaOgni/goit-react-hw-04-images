import React, {Component} from "react";
import {toast} from 'react-toastify'
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";

import Modal from "./Modal/Modal";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
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
  let resolve = 0
class App extends Component{
  state = {
    modal:{isOpen: false, visibleData: null},
    button: {hidden: false}, 
    searchQuery: '',
    page: 1,
    images: [],
    isLoading: false,
    error: null,
    status: 'idle',
    totalHits: 0,
    loadMore: false,
  };
  
  async componentDidUpdate(prevProps, prevState){
    const prevQuery = prevState.searchQuery
    const nextQuery = this.state.searchQuery
     console.log("prevQuery, nextQuery:", prevQuery, nextQuery)
    const prevPage = prevState.page
    const nextPage = this.state.page
    console.log("prevPage, nextPage", prevPage, nextPage)

   if(prevQuery !== nextQuery || prevPage !== nextPage){
  this.setState({ images:[], totalHits: 0, status: 'pending'})
   try {
    const {hits, total} = await fetchImages(nextQuery, nextPage)
    this.setState(prevState => ({
      images:[...prevState.images,...hits],
      status: 'resolved',
      totalHits: total,
      loadMore: this.state.page < Math.ceil(this.state.totalHits / 12 ),
    }))
    console.log("loadMore", this.state.loadMore)
    // console.log(2, hits) 
    // console.log(3,  this.state.images) 
   }catch(error) {
      this.setState({ error, status: 'rejected'})
      toast.error(error.message, toastConfig)
  
   }finally{
    this.setState({isLoading: false})
   } 
  }


    // if(prevQuery !== nextQuery){
    //   this.setState({ images:[], isLoading: true,})
       
    //    try {
    //     const {hits} = await fetchImages(nextQuery )
    //     this.setState(prevState => ({
    //       images:[...prevState.images,...hits],
    //      status: 'resolved',
    //     }))
    //     console.log(2, hits) 
    //     console.log(3,  this.state.images) 

    //    }catch(error) {
    //       this.setState({ error})
    //       toast.error(error.message, toastConfig)
      
    //    }finally{
    //     this.setState({isLoading: false})
    //    } 
    //   }

  }

  handleSearch=(searchQuery)=>{
    this.setState({searchQuery, page: 1})
  }

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  onOpenModal = data => {
    console.log(1, 'open', data)
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
    const {totalHits, status, searchQuery, page, modal, images, isLoading, error} = this.state
    
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
  
        if (status === 'resolved'){
      return (
      <>
       <Searchbar handleSearch={this.handleSearch}/>
        <ImageGallery data={images} searchQuery={searchQuery} page={page} 
        handleLoadMore={this.handleLoadMore}
        handleSearch={this.handleSearch}
        onOpenModal={this.onOpenModal}
        />
       {this.state.modal.isOpen && <Modal visibleData={modal.visibleData} onCloseModal={this.onCloseModal}/>}
       {totalHits > 12 && <Button name='Load more' onClick={this.handleLoadMore}/>}
    </> )
    }} 
  }
export default App


// {images.length > 0 && (<ImageGallery data={images} searchQuery={searchQuery} page={page} handleLoadMore={this.handleLoadMore} handleSearch={this.handleSearch} onOpenModal={this.onOpenModal} />)}

// if(prevQuery !== nextQuery){
//   this.setState({ images:[], status: 'pending'})
   
//    try {
//     const {hits} = await fetchImages(nextQuery )
//     this.setState(prevState => ({
//       images:[...prevState.images,...hits],
//       status: 'resolved',
//     }))
//     console.log(2, hits) 
//     console.log(3,  this.state.images) 

//    }catch(error) {
//       this.setState({ error, status: 'rejected'})
//       toast.error(error.message, toastConfig)
  
//    }finally{
//     this.setState({isLoading: false})
//    } 
//   }

// if (status === 'idle') {
    //   return <Searchbar handleSearch={this.handleSearch}/>
    // }
    // if (status === 'pending') {
    //   return (
    //   <>
    //   <Searchbar handleSearch={this.handleSearch}/>
    //   <Loader/>
    //   </>
    //   )  
    // }
    // if (status === 'rejected') {
    //   return <PhotoError message={error.message}/>
    // }
        // if (status === 'resolved'){
    //   return (
    //   <>
    //    <Searchbar handleSearch={this.handleSearch}/>
    //     <ImageGallery data={images} searchQuery={searchQuery} page={page} 
    //     handleLoadMore={this.handleLoadMore}
    //     handleSearch={this.handleSearch}
    //     onOpenModal={this.onOpenModal}
    //     />
    //   {this.state.modal.isOpen && <Modal visibleData={modal.visibleData} onCloseModal={this.onCloseModal}/>}        
    //   </> )
    // }
// ----------
// return (
    //   <div>
    //   <Searchbar handleSearch={this.handleSearch}/>
    //   {status === 'resolved' && <ImageGallery data={images} searchQuery={searchQuery} page={page} handleLoadMore={this.handleLoadMore} handleSearch={this.handleSearch} onOpenModal={this.onOpenModal} />}
    //   {this.state.modal.isOpen && <Modal visibleData={modal.visibleData} onCloseModal={this.onCloseModal}/>}        
    //   <Button name='Load more' bntonClick={this.handleLoadMore}/>
    //    {isLoading && <Loader/>}
      
    //   </div>
    // );