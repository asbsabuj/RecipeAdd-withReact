import React from "react";

export default function SearchBar({ handleFilterBySearch }) {
  return (
    <div>
      <div>Search</div>

      <input
        className="search__input"
        type="text"
        id="search"
        onChange={handleFilterBySearch}
      ></input>
    </div>
  );
}
