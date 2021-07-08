import { Component } from 'react';
import SearchForm from './Searchbar/Searchbar';
import apiService from './apiService';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Modal from './Modal/';
import Loader from './Loader';
import Container from './Container';

class App extends Component {
  state = {
    images: [],
    page: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    largeImage: '',
    tag: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
      error: null,
    });
  };

  onImgClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }

    const tag = e.target.alt;
    this.setState({
      largeImage: e.target.dataset.src,
      tag,
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  fetchImages = () => {
    const { page, searchQuery } = this.state;
    const options = {
      page,
      searchQuery,
    };

    this.setState({ isLoading: true });

    apiService
      .fetchImages(options)
      .then(hits => this.setState({ images: hits }))

      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onClickBtnLoadMore = () => {
    const { page, searchQuery } = this.state;
    const options = {
      page,
      searchQuery,
    };

    this.setState({ isLoading: true });

    apiService
      .fetchImages(options)
      .then(hits => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  render() {
    const { images, isLoading, error, showModal, largeImage, tag } = this.state;
    return (
      <Container>
        {showModal && (
          <Modal onClose={this.toggleModal} onImgClick={this.onImgClick}>
            <img src={largeImage} alt={tag} />
          </Modal>
        )}

        {error && alert('Error, try again later!')}

        <SearchForm onSubmit={this.onChangeQuery} />

        {isLoading && <Loader />}

        <ImageGallery images={images} onImgClick={this.onImgClick} />

        {images.length > 0 && !isLoading && (
          <Button text={'Load more'} onClick={this.onClickBtnLoadMore} />
        )}
      </Container>
    );
  }
}

export default App;
