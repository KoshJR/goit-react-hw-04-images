import css from './Button.module.css';

export const Button = ({ handleLoadMore }) => {
  return (
    <button
      className={css.Button}
      type="button"
      aria-label="button"
      onClick={handleLoadMore}
    >
      Load more
    </button>
  );
};
