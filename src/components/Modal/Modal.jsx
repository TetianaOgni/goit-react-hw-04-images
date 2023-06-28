import React, {Component} from 'react'
import { StyledModal, StyledOverlay } from './styled'


class Modal extends Component {
  componentDidMount() {
    console.log()
    window.addEventListener('keydown', this.handleKeyDown)
}

componentDidUpdate(){
    console.log('ttt')
}

componentWillUnmount(){
   
    window.removeEventListener('keydown', this.handleKeyDown)

}
handleKeyDown=(event)=>{
  console.log(event.code)
  if(event.code === "Escape"){
    this.props.onCloseModal()
  }
}

handleOverlayClick=(event)=>{
   console.log(event.currentTarget, event.target)
   if(event.currentTarget === event.target){
    this.props.onCloseModal()
   }
}

  render(){
    return (
      <>
      {/* <div class="overlay">
      <div class="modal">
        !!!Modal!!!
        <img src="" alt="" />
      </div>
    </div> */}
        <StyledOverlay onClick={this.handleOverlayClick}>
        <StyledModal>
         MODAL
         <img src="" alt="" />
        </StyledModal>
      </StyledOverlay>
      </>
    )
  }

}

export default Modal

