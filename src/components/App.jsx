import React, {Component} from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";

class App extends Component{
  state = {
    modal:{isOpen: false, visibleData: null}
  };
  
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
       <Searchbar/>
       <ImageGallery onOpenModal={this.onOpenModal} />

      {this.state.modal.isOpen && <Modal visibleData={this.state.modal.visibleData} onCloseModal={this.onCloseModal}/>}        
       <Button/>
       <Loader/>
      </div>
    );
  }
 
};


export default App