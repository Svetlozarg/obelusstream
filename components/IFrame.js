import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function iFrame({ id = "", season = "", episode = "" }) {
  // State for iframe loaded
  const [loaded, setLoaded] = useState(false);
  // State for loading
  const [loading, setLoading] = useState(true);

  // Create empty iframe if not loaded
  const createEmptyIframe = () => {
    const parent = document.getElementById("movie-wrapper");

    const newDiv = document.createElement("div");

    const newP = document.createElement("p");
    const newText = document.createTextNode("Video has not been added yet");
    newP.appendChild(newText);

    newDiv.classList.add("empty-iframe");
    newDiv.appendChild(newP);
    parent.appendChild(newDiv);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (document.getElementById("movieIframe").contentWindow.length === 0) {
        setLoaded(true);
        createEmptyIframe();
      }
    }, 1000);
  }, [id]);

  return (
    <div className="movie-wrapper" id="movie-wrapper">
      {loading && (
        <div className="loading-div">
          <ClipLoader color={"#123abv"} loading={loading} size={80} />
        </div>
      )}
      <iframe
        id="movieIframe"
        style={loading || loaded ? { display: "none" } : { display: "block" }}
        src={
          season && episode
            ? "https://vidsrc.me/embed/" +
              id +
              "/" +
              season +
              "-" +
              episode +
              "/"
            : "https://vidsrc.me/embed/" + id
        }
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}
