import React from 'react'

function ImageGalleryItem({data, onOpenModal}) {
  console.log(3, data.hits)
  const {hits} = data
  if (hits.length === 0){
    return <div>There are no images available for your request</div>
  }
  return (
   <ul>
       {hits.map(({id, webformatURL, largeImageURL, tags})=>{
      return ( 
      <li
        key={id} 
        className="gallery-item">
         <img src={webformatURL} alt={tags} onClick={() => onOpenModal()}/>
         </li>) 
       })}
  </ul>)
}

export default ImageGalleryItem
/* <li className="gallery-item">
  {/* <img src={this.state.photos.hits[0].webformatURL} alt="" /> */
  /* //   !!!image!!!
  //   <button onClick={() => onOpenModal()}>
  //     OPEN MODAL
  //   </button>
  // </li> */