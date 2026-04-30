// ─────────────────────────────────────────────────────────────
// MovieDisplay.jsx — Single movie detail card
// Receives one prop:
//   movie — the raw object returned by the OMDB API
//
// OMDB sets movie.Response = "False" when no match is found,
// so we check that flag before trying to render any field.
//
// Every individual field is also guarded against "N/A" — the value
// OMDB returns when a field has no data — to keep the UI clean.
// ─────────────────────────────────────────────────────────────
import React from "react";
import "./MovieDisplay.css";

export function MovieDisplay({ movie }) {
  // ── Guard: no result ───────────────────────────────────────
  // Show a friendly empty state instead of crashing on missing fields.
  if (!movie || movie.Response === "False") {
    return (
      <div className="movie-card movie-card--empty">
        <p>No movie found. Try a different search.</p>
      </div>
    );
  }

  // ── Render: populated card ─────────────────────────────────
  // Layout: poster image on the left, details panel on the right.
  // Each detail field is wrapped in a conditional so fields with no
  // data are simply omitted rather than showing blank lines.
  return (
    <div className="movie-card">
      {/* Poster — falls back to a placeholder image when OMDB has none */}
      <img
        className="movie-card__poster"
        src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/200x300/1c1c26/6b7280?text=No+Poster"}
        alt={movie.Title}
      />

      <div className="movie-card__details">
        {/* Title */}
        <h2 className="movie-card__title">{movie.Title}</h2>

        {/* Meta badges: release year, content rating, runtime */}
        <div className="movie-card__meta">
          <span className="badge">{movie.Year}</span>
          {movie.Rated && movie.Rated !== "N/A" && (
            <span className="badge">{movie.Rated}</span>
          )}
          {movie.Runtime && movie.Runtime !== "N/A" && (
            <span className="badge">{movie.Runtime}</span>
          )}
        </div>

        {/* IMDb audience score out of 10 */}
        {movie.imdbRating && movie.imdbRating !== "N/A" && (
          <p className="movie-card__rating">
            ⭐ <strong>{movie.imdbRating}</strong> / 10 &nbsp;·&nbsp; IMDb
          </p>
        )}

        {/* Comma-separated genre list from OMDB */}
        {movie.Genre && movie.Genre !== "N/A" && (
          <p className="movie-card__genre">{movie.Genre}</p>
        )}

        {/* One-sentence plot synopsis */}
        {movie.Plot && movie.Plot !== "N/A" && (
          <p className="movie-card__plot">{movie.Plot}</p>
        )}

        {/* Director and cast — labeled with a small uppercase tag */}
        {movie.Director && movie.Director !== "N/A" && (
          <p className="movie-card__crew">
            <span className="label">Director</span> {movie.Director}
          </p>
        )}
        {movie.Actors && movie.Actors !== "N/A" && (
          <p className="movie-card__crew">
            <span className="label">Cast</span> {movie.Actors}
          </p>
        )}
      </div>
    </div>
  );
}

export default MovieDisplay;
