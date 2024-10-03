import React from "react";
import "./Grid.css";

function Grid({ favorites }) {
  return (
    <div className="grid">
      {favorites.map((favorite, index) => (
        <div key={index} className="column">
          {favorite && (
            <div>
              <h2>{favorite.Title}</h2>
              <img src={favorite.Poster} alt={favorite.Title} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Grid;
