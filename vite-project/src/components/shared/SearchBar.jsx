import { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// This component takes two props:
// - onSearch: A function to call with the final search term.
// - placeholder: The text to display in the input field.
const SearchBar = ({ onSearch, placeholder }) => {
  // Local state to hold the immediate value of the input field.
  const [query, setQuery] = useState("");

  // This useEffect hook implements the debounce logic.
  useEffect(() => {
    // Set up a timer.
    const timer = setTimeout(() => {
      // After 500ms of inactivity, call the onSearch function
      // that was passed down from the parent page.
      onSearch(query);
    }, 500); // 500ms delay

    // This is the cleanup function. It runs every time the user types a new
    // character, cancelling the previous timer. This is the magic of debounce.
    return () => {
      clearTimeout(timer);
    };
  }, [query, onSearch]); // This effect re-runs whenever the user types a new character.

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder || "Search..."}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 1.2,
          backgroundColor: "background.paper",
          px: 3.5,
          // py: 0,
          height: "46px",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
