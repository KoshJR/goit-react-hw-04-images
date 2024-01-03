import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchGalleryItems } from 'api';
import css from './app.module.css';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    textInput: '',
    pages: 1,
    isModal: false,
    imageURL: '',
    loadMore: false,
    per_page: 12,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.pages !== prevState.pages ||
      this.state.textInput !== prevState.textInput
    ) {
      this.setState({ isLoading: true });
      this.fetchImages();
    }
  }

  handleSearchText = (textInput, pages) => {
    this.setState({ textInput, pages, images: [] });
  };
  handleLoadMore = () => {
    this.setState(prevState => {
      return { pages: prevState.pages + 1 };
    });
  };

  openModal = imageURL => {
    this.setState({ imageURL, isModal: true });
  };
  handleCloseModal = () => {
    this.setState({ imageURL: '', isModal: false });
  };

  fetchImages = () => {
    if (this.state.textInput === '') {
      this.setState({ isLoading: false, loadMore: false });
      return;
    }
    const { textInput, pages, per_page } = this.state;
    fetchGalleryItems(textInput, pages, per_page)
      .then(response => {
        if (!response.data.hits.length) {
          alert('Oops, something went wrong!');
        } else {
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...response.data.hits],
              loadMore: pages < Math.ceil(response.data.totalHits / per_page),
            };
          });
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => this.setState({ isLoading: false }));
  };
  render() {
    return (
      <div className={css.App}>
        <Searchbar
          handleSearchText={this.handleSearchText}
          textInput={this.state.textInput}
        />
        <ImageGallery images={this.state.images} openModal={this.openModal} />
        {this.state.isLoading && <Loader />}
        {this.state.loadMore && <Button handleLoadMore={this.handleLoadMore} />}
        {this.state.isModal && (
          <Modal
            imageURL={this.state.imageURL}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
