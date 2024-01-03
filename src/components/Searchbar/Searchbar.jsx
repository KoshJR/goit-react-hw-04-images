import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    value: '',
    pages: 1,
  };
  handleSubmit = e => {
    e.preventDefault();
    const { value, pages } = this.state;
    const cleanValue = value.trim();
    if (!cleanValue) {
      this.props.handleSearchText(cleanValue, pages);
      this.setState({ value: '' });
      return;
    }
    if (this.props.searchText === cleanValue) {
      this.setState({ value: '' });
      // this.props.handleSearchText(value, pages);
      return;
    }
    this.props.handleSearchText(cleanValue, pages);
    e.target.reset();
    // this.setState({ value: '' });
  };
  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={e => this.handleSubmit(e)}>
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
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}
