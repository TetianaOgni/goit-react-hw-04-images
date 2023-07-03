import React, {Component} from 'react'
import PropTypes from "prop-types";
import { StyledModal, StyledOverlay } from './styled'


class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
}

componentWillUnmount(){
   
    window.removeEventListener('keydown', this.handleKeyDown)

}
handleKeyDown=(event)=>{
  if(event.code === "Escape"){
    this.props.onCloseModal()
  }
}

handleOverlayClick=(event)=>{
   if(event.currentTarget === event.target){
    this.props.onCloseModal()
   }
}

  render(){
    const {largeImageURL, tags} = this.props.visibleData
    return (
      <>
        <StyledOverlay onClick={this.handleOverlayClick}>
        <StyledModal>
         <img src={largeImageURL} alt={tags} />
        </StyledModal>
      </StyledOverlay>
      </>
    )
  }

}
Modal.propTypes = {
  visibleData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal

