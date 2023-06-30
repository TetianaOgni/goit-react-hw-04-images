// import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import {ImSpinner} from 'react-icons/im'
const styles = {

}
function ImagePendingView({searchQuery}) {
    console.log(searchQuery)
 
    return (
        <div role='alert'>
            <div style={styles.spinner}>
                <ImSpinner size='32' className='icon-spin'/>
                Loading...
            </div>
        </div>
    )
}

export default ImagePendingView