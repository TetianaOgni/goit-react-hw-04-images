import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";

export const App = () => {
  return (
    <div>
     <Searchbar/>
     <ImageGallery/>
     <Modal/>
     <Button/>
     <Loader/>
    </div>
  );
};
