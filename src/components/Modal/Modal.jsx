import { Component } from 'react';
import { Loader } from 'components/Loader/Loader';
import css from './Modal.module.css';

export class Modal extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModal);
  }
  handleCloseModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      this.props.handleCloseModal();
    }
  };

  handleLoader = () => {
    this.setState({ isLoading: false });
  };
  render() {
    const { imageURL } = this.props;
    const { isLoading } = this.state;
    return (
      <div className={css.Overlay} onClick={this.handleCloseModal}>
        <div className={css.Modal}>
          {isLoading && <Loader />}
          <img
            src={imageURL}
            alt=""
            onLoad={this.handleLoader}
            style={{ display: isLoading ? 'none' : 'block' }}
          />
        </div>
      </div>
    );
  }
}
