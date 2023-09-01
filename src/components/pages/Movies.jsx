import React, { useState, useEffect } from 'react';
import MoviesList from '../MoviesList/MoviesList';
import SearchForm from '../SearchForm/SearchForm';
import styles from './Movies.module.css';

const apiKey = 'fa36ca695d1f2c576cf4e7f558006e3f';

const Movies = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = query => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
      .then(response => response.json())
      .then(data => setSearchResults(data.results));
  };

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    }
    fetchTrendingMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search Movies</h2>
      <SearchForm onSubmit={handleSubmit} />
      <MoviesList movies={searchResults} />
    </div>
  );
};

export default Movies;
