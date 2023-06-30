import errorImg from '../Images/errorImg.jpg'

function PhotoError({message}){
    return (
        <div>
            <img src={errorImg} width ="240" alt="sad cat" />
            <p>{message}</p>
        </div>
    )
}
export default PhotoError