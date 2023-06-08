import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./Requests";
// make sure here we are importing our local axios and not the global axios

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // it will be asynchronous function that will fetch the banner data
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
        // this will give us random movies set on our site
      );
      return request;
    }
    fetchData();
  }, []);
  // console.log(movie); // we just checked that we are getting the movies
  // in banner we have also created a truncate function it means whenwever the description is so long so it will put the dots
  function truncate(string, n) {
    // here n is the number of characters
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    // used string?. so if not string present so it will not break the function
    // if length is small so it will return the string as it is
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        // backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Black_flag.svg/1200px-Black_flag.svg.png")`,

        // we are using the tmdb url provided by this api
        // below now we will use the api provided information to make the remaining part
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        // backdrop path is image url is provided asa string by the api
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* these are the few different variable names by which api can provide us the name
        so title is provided by any of the variable if one is not working so see other variables values */}

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">
          {/* used backticks to support the line enclosing */}
          {truncate(movie?.overview, 150)}
          {/* here 150 is the character limit */}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
