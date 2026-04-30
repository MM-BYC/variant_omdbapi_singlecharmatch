// ─────────────────────────────────────────────────────────────
// Grid.jsx — Favorites display panel (3 × 2 = 6 slots)
// Receives two props:
//   favorites — array of 6 items; each item is either a movie object or null
//   onDelete(index) — callback passed up to App to clear a slot
//
// The grid always renders all 6 slots. Null slots show an "Empty slot"
// placeholder; filled slots show the movie poster, title, year, rating,
// and a Remove button.
// ─────────────────────────────────────────────────────────────
import React from "react";
import "./Grid.css";

function Grid({ favorites, onDelete }) {
  return (
    <section className="favorites-section">
      <h3 className="favorites-title">★ Favorites</h3>

      {/* Map over all 6 slots — index is used as the React key and also passed
          to onDelete so App knows which slot to clear */}
      <div className="grid">
        {favorites.map((favorite, index) => (
          <div
            key={index}
            // Add the --empty modifier class when the slot has no movie,
            // which swaps the card to a dashed-border placeholder style
            className={`fav-card ${favorite ? "" : "fav-card--empty"}`}
          >
            {favorite ? (
              // ── Filled slot ─────────────────────────────────
              <>
                {/* Poster — falls back to placeholder when OMDB has none */}
                <img
                  className="fav-card__poster"
                  src={favorite.Poster !== "N/A" ? favorite.Poster : "https://placehold.co/200x300/1c1c26/6b7280?text=No+Poster"}
                  alt={favorite.Title}
                />

                <div className="fav-card__info">
                  <p className="fav-card__title">{favorite.Title}</p>
                  <p className="fav-card__year">{favorite.Year}</p>

                  {/* Only show rating when OMDB returned a real value */}
                  {favorite.imdbRating && favorite.imdbRating !== "N/A" && (
                    <p className="fav-card__rating">⭐ {favorite.imdbRating}</p>
                  )}

                  {/* Remove button — fires onDelete with this slot's index,
                      which sets favorites[index] back to null in App state */}
                  <button className="fav-card__delete" onClick={() => onDelete(index)}>
                    ✕ Remove
                  </button>
                </div>
              </>
            ) : (
              // ── Empty slot ──────────────────────────────────
              <p className="fav-card__placeholder">Empty slot</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Grid;
