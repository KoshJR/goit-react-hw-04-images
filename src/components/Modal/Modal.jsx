import { useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import css from './Modal.module.css';

export const Modal = ({ imageURL, handleCloseModal }) => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    function addCloseKey(event) {
      if (event.code === 'Escape') handleCloseModal();
    }
    window.addEventListener('keydown', addCloseKey);

    return () => {
      window.removeEventListener('keydown', addCloseKey);
    };
  }, [handleCloseModal]);

  function closeModal(event) {
    if (event.target === event.currentTarget) handleCloseModal();
  }

  const handleLoader = () => {
    setLoader(false);
  };

  return (
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal}>
        {loader && <Loader />}
        <img
          src={imageURL}
          alt=""
          onLoad={handleLoader}
          style={{ display: loader ? 'none' : 'block' }}
        />
      </div>
    </div>
  );
};
