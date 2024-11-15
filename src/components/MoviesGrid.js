import React, { useState } from "react";
import '../styles.css';
import MovieCard from "./MovieCard";

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {

  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('All genres');
  const [rating, setRating] = useState('All');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case 'All':
        return true;
      case 'Good':
        return movie.rating >= 8;
      case 'Ok':
        return movie.rating >= 5 && movie.rating < 8;
      case 'Bad':
        return movie.rating < 5;
      default:
        return false;
    }
  }

  const matchesGenre = (movie, genre) => {
    return genre === 'All genres' || movie.genre.toLowerCase() === genre.toLowerCase();
  }

  const matchesSearchTerms = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  }

  const filteredMovies = movies?.filter(movie => {
    return matchesGenre(movie, genre) && matchesRating(movie, rating) && matchesSearchTerms(movie, searchTerm);
  });

  return (
    <>

      <input
        type='text'
        placeholder="search movies..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="filter-bar">
        <div className="filter-slot">
          <label htmlFor="genre">Genre</label>
          <select id="genre" className="filter-dropdown" value={genre} onChange={handleGenreChange}>
            <option>All genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>
        <div className="filter-slot">
          <label htmlFor="rating">Rating</label>
          <select id="rating" className="filter-dropdown" value={rating} onChange={handleRatingChange}>
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {
          filteredMovies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} toggleWatchlist={toggleWatchlist} isWatchlisted={watchlist.includes(movie.id)} />
          ))
        }
      </div>

    </>
  )
}