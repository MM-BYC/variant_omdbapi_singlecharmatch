import React, { useState, useEffect } from "react";
import "./App.css";
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";
import Grid from "./components/Grid";

function App() {
  const [apiKey, setApiKey] = useState("d34293d4");
  const [movie, setMovie] = useState(null);
  const [favorites, setFavorites] = useState([null, null]);

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

  useEffect(() => {
    getMovie("Spider man");
  }, []);

  const handleFavorite = () => {
    if (!favorites[0]) {
      setFavorites([movie, null]);
    } else if (!favorites[1]) {
      setFavorites([favorites[0], movie]);
    }
  };

  return (
    <>
      <Form moviesearch={getMovie} />

      {movie && (
        <div>
          <MovieDisplay movie={movie} />
          <button onClick={handleFavorite}>Favorite</button>
        </div>
      )}

      <Grid favorites={favorites} />
    </>
  );
}

export default App;
