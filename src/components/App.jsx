import React, {Component} from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";



class App extends Component{
  state = {
    modal:{isOpen: false, visibleData: null},
    button: {hidden: false}, 
    searchQuery: '',
    page: 1,
  };
  handleSearch=(searchQuery)=>{
    this.setState({searchQuery, page: 1})
  }
// ---
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
    const {searchQuery, page, modal} = this.state


    return (
      <div>
       <Searchbar handleSearch={this.handleSearch}/>
       <ImageGallery searchQuery={searchQuery} page={page} handleLoadMore={this.handleLoadMore} handleSearch={this.handleSearch} onOpenModal={this.onOpenModal} />
      {this.state.modal.isOpen && <Modal visibleData={modal.visibleData} onCloseModal={this.onCloseModal}/>}        
       <Button /> 
       <Loader/>
      
      </div>
    );
  }
 
};


export default App