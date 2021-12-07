import React from "react";
import { useEffect, useState } from "react";
import "./RowPost.css";
import YouTube from "react-youtube";
import { API_KEY, imageUrl } from "../../Constants/Constants";
import axios from "../../axios";

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, seturlId] = useState("");
  useEffect(() => {
    axios.get(props.url).then((response) => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }, []);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleMovie = (id) => {
    axios
      .get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          seturlId(response.data.results[0]);
        } else {
          console.log("Array empty");
        }
      });
  };
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            onClick={() => handleMovie(obj.id)}
            src={`${imageUrl + obj.backdrop_path}`}
            alt="poster"
            className={props.isSmall ? "small-poster" : "poster"}
          />
        ))}
      </div>
      {urlId && <YouTube videoId={urlId.key} opts={opts} />}
    </div>
  );
}

export default RowPost;
