// ─────────────────────────────────────────────────────────────
// App.jsx — Root component
// Owns all shared state and passes data/callbacks down to children
// via props (one-way data flow).
// ─────────────────────────────────────────────────────────────
import React, { useState, useEffect } from "react";
import "./App.css";
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";
import Grid from "./components/Grid";

function App() {
  // ── State ──────────────────────────────────────────────────
  // apiKey   : OMDB API key used in every fetch request
  // movie    : the single movie object returned by the last search
  // favorites: array of 6 slots (null = empty); holds saved movie objects
  const [apiKey, setApiKey] = useState("d34293d4");
  const [movie, setMovie] = useState(null);
  const [favorites, setFavorites] = useState([null, null, null, null, null, null]);

  // ── Data fetching ──────────────────────────────────────────
  // Calls the OMDB API with the user's search term (&t= = exact title match).
  // On success the raw movie object is stored in state; on failure the error
  // is logged and the UI stays unchanged.
  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      const data = await response.json();
      setMovie(data);
      console.log(JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  // ── Side effect — initial load ─────────────────────────────
  // Empty dependency array [] means this runs once after the first render,
  // pre-populating the UI with a default movie so the page isn't blank.
  useEffect(() => {
    getMovie("Spider man");
  }, []);

  // ── handleFavorite ─────────────────────────────────────────
  // Saves the currently displayed movie to the first available empty slot.
  // Two guard clauses prevent bad state:
  //   1. Duplicate check  — compares imdbID so the same movie can't be added twice.
  //   2. Full grid check  — if all 6 slots are filled, findIndex returns -1 and we bail.
  // Spread [...favorites] creates a new array so React detects the state change.
  const handleFavorite = () => {
    const alreadySaved = favorites.some(
      (fav) => fav && fav.imdbID === movie.imdbID
    );
    if (alreadySaved) return;

    const emptyIndex = favorites.findIndex((fav) => !fav);
    if (emptyIndex === -1) return; // grid is full

    const updated = [...favorites];
    updated[emptyIndex] = movie;
    setFavorites(updated);
  };

  // ── handleDelete ───────────────────────────────────────────
  // Removes a favorite by setting its slot back to null.
  // The index comes from the Grid component via the onDelete prop callback.
  const handleDelete = (index) => {
    const updated = [...favorites];
    updated[index] = null;
    setFavorites(updated);
  };

  // ── Render ─────────────────────────────────────────────────
  // Layout is divided into three clear sections:
  //   1. <header>  — app branding
  //   2. <section> — search form (always visible)
  //   3. <section> — movie result + favorite button (only when a movie is loaded)
  //   4. <Grid>    — favorites panel (always visible, shows empty slots)
  return (
    <>
      {/* App branding */}
      <header className="app-header">
        <h1>🎬 Cine<span className="accent">Search</span></h1>
      </header>

      {/* Search bar — passes getMovie down as the moviesearch prop */}
      <section className="search-section">
        <Form moviesearch={getMovie} />
      </section>

      {/* Conditionally rendered: only shown once a movie object exists in state */}
      {movie && (
        <section className="movie-result">
          <MovieDisplay movie={movie} />
          <button className="favorite-btn" onClick={handleFavorite}>
            ★ Add to Favorites
          </button>
        </section>
      )}

      {/* Favorites grid — receives the array and the delete callback */}
      <Grid favorites={favorites} onDelete={handleDelete} />
    </>
  );
}

export default App;
