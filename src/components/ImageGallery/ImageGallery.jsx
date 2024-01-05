import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, openModal }) => {
  const uniqueKeys = Array.from(new Set(images.map(({ id }) => id)));
  return (
    <>
      <ul className={css.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }, index) => (
          <ImageGalleryItem
            openModal={openModal}
            key={uniqueKeys[index] || id}
            tags={tags}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>
    </>
  );
};
