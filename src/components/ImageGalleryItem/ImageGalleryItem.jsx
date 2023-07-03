import React from 'react'
import PropTypes from "prop-types";
import {ImageGalleryItemStyled, ImageGalleryItemImage } from './styled'



function ImageGalleryItem({hits, onOpenModal}) {
  return (
   <>
       {hits.map(({id, webformatURL, largeImageURL, tags})=>{
      return ( 
      <ImageGalleryItemStyled
        key={id} 
        className="gallery-item">
         <ImageGalleryItemImage src={webformatURL} alt={tags} onClick={() => onOpenModal({largeImageURL, tags})}/>
         </ImageGalleryItemStyled>) 
       })}
  </>)
}
ImageGalleryItem.propTypes = {
hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })).isRequired,
    onOpenModal: PropTypes.func.isRequired,
  }

export default ImageGalleryItem
