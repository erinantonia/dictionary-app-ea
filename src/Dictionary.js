import React, { useState } from "react";
import Results from "./Results";
import "./Dictionary.css";
import axios from "axios";
import Photos from "./Photos";

export default function Dictionary() {
  let [keyword, setKeyword] = useState("");
  let [results, setResults] = useState(null);
  let [photos, setPhotos] = useState(null);

  function handleResponse(response) {
    setResults(response.data);
  }

  function handlePexelsResponse(response) {
    console.log(response.data);
    setPhotos(response.data.photos);
  }

  function search(event) {
    event.preventDefault();

    let key = "36314taf33204213d293afod0a3b00b2";
    let apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${key}`;
    axios.get(apiUrl).then(handleResponse);

    let pexelsApiKey =
      "2kH0Q4SrKDeoivE9GL8QZ3orlTjXoivawznG93tOQboAxiiQQxDh6PVB";
    let headers = { Authorization: `${pexelsApiKey}` };
    let pexelsUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
    axios.get(pexelsUrl, { headers: headers }).then(handlePexelsResponse);
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="Dictionary Container">
      <section>
        <form onSubmit={search}>
          <input
            type="search"
            placeholder="Search any word"
            onChange={handleKeywordChange}
          ></input>
        </form>
      </section>
      <Results results={results} />
      <Photos photos={photos} />
    </div>
  );
}
