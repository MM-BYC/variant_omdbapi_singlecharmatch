import { useState, useEffect } from "react";

function Form(props) {
  // State to hold the date of our form
  const [formData, setFormData] = useState({ searchterm: "" });

  // Debounce timeout   ***add ***
  let timeoutId;

  // handle the change - updates formData when we type into form.
  const handleChange = (event) => {
    //Use the event object to detect key, and value to update
    setFormData({ ...formData, [event.target.name]: event.target.value });
    // Debounce input changes      *** add ***
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      props.moviesearch(formData.searchterm);
    }, 500); //500ms delay
  };

  const handleSubmit = (event) => {
    // Prevent page from refreshing on form submission
    event.preventDefault();
    // Pass the search term to moviesearch prop, which is App's getMovie.
    // Clear timeout to prevent duplicate searches
    clearTimeout(timeoutId);
    props.moviesearch(formData.searchterm);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchterm"
          onChange={handleChange}
          value={formData.searchterm}
          className="searchbar"
        />

        <input type="submit" className="submitBtn" value="submit" />
      </form>
    </>
  );
}

export default Form;
