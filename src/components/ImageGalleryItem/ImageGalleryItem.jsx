import React from 'react'
import { toast} from 'react-toastify'

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

function ImageGalleryItem({data, onOpenModal}) {
  // console.log(3, data.hits)
  const {hits} = data
  if (hits.length === 0){
    toast.success('There are no images available for your request', toastConfig)
  }
  return (
   <ul>
       {hits.map(({id, webformatURL, largeImageURL, tags})=>{
      return ( 
      <li
        key={id} 
        className="gallery-item">
         <img src={webformatURL} alt={tags} onClick={() => onOpenModal({largeImageURL, tags})}/>
         </li>) 
       })}
  </ul>)
}

export default ImageGalleryItem
