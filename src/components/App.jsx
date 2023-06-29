import React, {Component} from "react";
// import {ToastContainer} from 'react-toastify'
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
// import { getPicture } from "services/getPictures";

class App extends Component{
  state = {
    modal:{isOpen: false, visibleData: null},
    searchQuery: ''
  };
  handleSearch=(searchQuery)=>{
    this.setState({searchQuery})
  }
  // componentDidMount(){
  //   fetch()
  // }


  onOpenModal = data => {
    console.log(1, 'open')
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
   

    return (
      <div>
       <Searchbar handleSearch={this.handleSearch}/>
       <ImageGallery searchQuery={this.state.searchQuery} handleSearch={this.handleSearch} onOpenModal={this.onOpenModal} />
       {/* <ToastContainer /> */}

      {this.state.modal.isOpen && <Modal visibleData={this.state.modal.visibleData} onCloseModal={this.onCloseModal}/>}        
       <Button/>
       <Loader/>
      </div>
    );
  }
 
};


export default App