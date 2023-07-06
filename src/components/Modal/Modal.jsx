import React, {useEffect} from 'react'
import PropTypes from "prop-types";
import { StyledModal, StyledOverlay } from './styled'


const Modal = ({visibleData, onCloseModal}) => {
  useEffect(()=> {
    const handleKeyDown=(event)=>{
      if(event.code === "Escape"){
        onCloseModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
   return()=>{
    window.removeEventListener('keydown', handleKeyDown)
  }
  }, [onCloseModal])


const handleOverlayClick=(event)=>{
   if(event.currentTarget === event.target){
    onCloseModal()
   }
}
const {largeImageURL, tags} = visibleData
  return (
          <>
            <StyledOverlay onClick={handleOverlayClick}>
            <StyledModal>
             <img src={largeImageURL} alt={tags} />
            </StyledModal>
          </StyledOverlay>
          </>
        )

}

Modal.propTypes = {
  visibleData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal
