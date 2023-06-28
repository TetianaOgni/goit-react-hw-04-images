// import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import React from 'react'

function ImageGallery({onOpenModal}) {
  return (
    <ul className="gallery">
   {/* <ImageGalleryItem onCloseModal={onOpenModal}/> */}
    <li className="gallery-item">
      <img src="" alt="" />
      !!!image!!!
      <button onClick={() => onOpenModal()}>
        OPEN MODAL
      </button>
    </li>
    </ul>
  )
}

export default ImageGallery
