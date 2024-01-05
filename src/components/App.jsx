import { useEffect, useRef, useState } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchGalleryItems } from 'api';
import css from './app.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [pages, setPages] = useState(0);
  const [modalStatus, setModalStatus] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const per_page = useRef(12);

  useEffect(() => {
    function fetchImages() {
      if (textInput === '') {
        setLoader(false);
        setLoadMore(false);
        return;
      }

      fetchGalleryItems(textInput, pages, per_page.current)
        .then(response => {
          if (!response.data.hits.length) {
            setImages([]);
            alert('Oops, something went wrong!');
          } else {
            setImages(prevState => [...prevState, ...response.data.hits]);
            setLoadMore(
              pages < Math.ceil(response.data.totalHits / per_page.current)
            );
          }
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => setLoader(false));
    }

    if (textInput) {
      setLoader(true);
      fetchImages();
    }
  }, [pages, textInput]);

  const handleSearchText = (textInput, pages) => {
    setTextInput(textInput);
    setImages([]);
    setPages(pages);
  };

  const handleLoadMore = () => {
    setPages(prevState => prevState + 1);
  };

  const openModal = imageURL => {
    setImageURL(imageURL);
    setModalStatus(true);
  };

  const handleCloseModal = () => {
    setImageURL('');
    setModalStatus(false);
  };

  return (
    <div className={css.App}>
      <Searchbar handleSearchText={handleSearchText} textInput={textInput} />
      <ImageGallery images={images} openModal={openModal} />
      {loader && <Loader />}
      {loadMore && images.length > 0 && !loader && (
        <Button handleLoadMore={handleLoadMore} />
      )}
      {modalStatus && (
        <Modal imageURL={imageURL} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
};
