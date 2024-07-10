import React, { useState } from "react";
import Results from "./Results";
import "./Dictionary.css";
import axios from "axios";

export default function Dictionary() {
  let [keyword, setKeyword] = useState("");
  let [results, setResults] = useState(null);

  function handleResponse(response) {
    console.log(response.data);
    setResults(response.data);
  }

  function search(event) {
    event.preventDefault();

    let key = "36314taf33204213d293afod0a3b00b2";
    let apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${key}`;
    axios.get(apiUrl).then(handleResponse);
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
    </div>
  );
}
