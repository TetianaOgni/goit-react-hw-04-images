import PropTypes from "prop-types";
import errorImg from '../Images/errorImg.jpg'
import { ImageGalleryErrorStyled, ImageGalleryErrorImage, ImageGalleryErrorText} from './styled'



function PhotoError({message}){
    
    return (
        <ImageGalleryErrorStyled  >
            <ImageGalleryErrorImage src={errorImg} width ="300" alt="sad cat" />
            <ImageGalleryErrorText>{message}</ImageGalleryErrorText>
        </ImageGalleryErrorStyled>
     
    )
}

PhotoError.propTypes = { 
message: PropTypes.string,
}

export default PhotoError