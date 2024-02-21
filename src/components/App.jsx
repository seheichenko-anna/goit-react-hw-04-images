import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImagesWithQuery } from '../api';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import { Container } from './App.styled';
import Loader from './Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        if (searchQuery) {
          const newImages = await fetchImagesWithQuery(searchQuery, page);
          setImages(prevImages => [...prevImages, ...newImages]);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [searchQuery, page]);

  const handleLoadMoreImages = () => {
    setPage(prev => prev + 1);
  };

  const handleSetQuery = newSearchQuery => {
    if (newSearchQuery !== searchQuery) {
      setSearchQuery(newSearchQuery);
      setPage(1);
      setImages([]);
    }
  };

  const handleOpenModal = largeImageURL => {
    document.body.style.overflow = 'hidden';
    setshowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    document.body.style.overflow = 'auto';
    setshowModal(false);
    setLargeImageURL('');
  };

  return (
    <Container>
      <Searchbar handleSetQuery={handleSetQuery} />
      <ImageGallery images={images} onItemClick={handleOpenModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <Button onClick={handleLoadMoreImages} />
      )}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={handleCloseModal} />
      )}
    </Container>
  );
};
