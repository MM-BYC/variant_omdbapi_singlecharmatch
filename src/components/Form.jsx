// ─────────────────────────────────────────────────────────────
// Form.jsx — Search input component
// Receives one prop:
//   moviesearch(term) — callback from App that triggers an OMDB fetch
//
// Two search strategies are supported:
//   1. Debounced typing  — fires automatically 500 ms after the user stops typing
//   2. Submit button     — fires immediately when the form is submitted
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

function Form(props) {
  // Controlled input: formData mirrors exactly what is in the text field.
  // Using an object allows the form to scale to multiple fields later.
  const [formData, setFormData] = useState({ searchterm: "" });

  // timeoutId holds the reference to the pending debounce timer so it can
  // be cancelled if the user keeps typing or hits submit before 500 ms elapses.
  let timeoutId;

  // ── handleChange ───────────────────────────────────────────
  // Called on every keystroke.
  //   • Updates controlled state with the new value (spread preserves other fields).
  //   • Resets the debounce timer — if the user types again within 500 ms the
  //     previous timer is cleared and a new one starts, preventing rapid-fire API calls.
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    // Cancel the previous pending search before starting a new countdown
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      props.moviesearch(formData.searchterm);
    }, 500); // wait 500 ms of inactivity before searching
  };

  // ── handleSubmit ───────────────────────────────────────────
  // Called when the user clicks Submit or presses Enter.
  //   • preventDefault stops the browser from doing a full page reload.
  //   • clearTimeout cancels any debounce in flight to avoid a duplicate search.
  const handleSubmit = (event) => {
    event.preventDefault();
    clearTimeout(timeoutId);
    props.moviesearch(formData.searchterm);
  };

  // ── Render ─────────────────────────────────────────────────
  // A controlled <input> whose value is always driven by React state (formData).
  // The name attribute ("searchterm") is the key used in handleChange to update
  // the correct field inside formData.
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchterm"
          onChange={handleChange}
          value={formData.searchterm}
          className="searchbar"
          placeholder="Search for a movie..."
        />
        <input type="submit" className="submitBtn" value="submit" />
      </form>
    </>
  );
}

export default Form;
