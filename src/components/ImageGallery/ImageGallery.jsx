import React from 'react'
import PropTypes from "prop-types";
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import { ImageGalleryList } from './styled'


function ImageGallery({data, onOpenModal}){
  return (
   <ImageGalleryList className="gallery">
    <ImageGalleryItem  hits={data} onOpenModal={onOpenModal}/>
  </ImageGalleryList>
  )
}
ImageGallery.propTypes = {
data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};


  export default ImageGallery


