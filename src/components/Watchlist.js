import React from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function Watchlist({ movies, watchlist, toggleWatchlist }) {
  return (
    <div>
      <h1 className="title">Yout watchlist</h1>
      <div className="watchlist">
        {watchlist.map((movieId) => {
          const movie = movies.find((movie) => movie.id === movieId);
          return (
            <MovieCard
              key={movieId}
              movie={movie}
              toggleWatchlist={toggleWatchlist}
              isWatchlisted={true}
            />
          );
        })}
      </div>
    </div>
  );
}
