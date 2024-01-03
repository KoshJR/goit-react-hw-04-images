import { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ handleSearchText, textInput }) => {
  const [value, setValue] = useState('');
  const pages = 1;

  const handleSubmit = e => {
    e.preventDefault();
    const cleanValue = value.trim();
    if (!cleanValue) {
      handleSearchText(cleanValue, pages);
      setValue('');
      return;
    }
    if (textInput === cleanValue) {
      setValue('');
      return;
    }

    handleSearchText(cleanValue, pages);
    e.target.reset();
  };
  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={e => handleSubmit(e)}>
        <button
          type="submit"
          className={css.SearchForm_button}
          aria-label="search button"
        ></button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          name="search"
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </form>
    </header>
  );
};
