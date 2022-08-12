import Image from "next/image";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import MovieCard from "../components/MovieCard";
import MemberCard from "../components/MemberCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faClose,
  faHeartCirclePlus,
  faHeartCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

import { getMovie } from "../utils/movie";
import { getRelated } from "../utils/related";
import { getMovieTrailer } from "../utils/trailer";
import { fetchCast } from "../utils/cast";
import {
  setDoc,
  doc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { UserAuth } from "../context/AuthContext";

export default function Movie({ movie, related, trailer, cast }) {
  const { user } = UserAuth();
  // State for loading
  const [loading, setLoading] = useState(true);
  // State for iframe loaded
  const [loaded, setLoaded] = useState(false);
  // State for trailer popup open
  const [open, setOpen] = useState(false);
  // State for favourite
  const [favourite, setFavourite] = useState(false);

  // Open/Close trailer popup
  const handleOpen = () => {
    setOpen(!open);
  };

  // Create empty iframe if not loaded
  const createEmptyIframe = () => {
    const parent = document.getElementById("movie-wrapper");

    const newDiv = document.createElement("div");

    const newP = document.createElement("p");
    const newText = document.createTextNode(
      "Video has not been added yet. Once available it will be provided here."
    );
    newP.appendChild(newText);

    newDiv.classList.add("empty-iframe");
    newDiv.appendChild(newP);
    parent.appendChild(newDiv);
  };

  // Handle add to favourite
  const addFavourite = async () => {
    if (favourite === false && user !== undefined) {
      await setDoc(doc(db, user.displayName, movie.title), {
        id: movie.id,
        tag: "movie",
      });
      setFavourite(true);
    }
  };

  // Handle remove from favourite
  const removeFavourite = async () => {
    if (favourite === true && user !== undefined) {
      await deleteDoc(doc(db, user.displayName, movie.title));
      setFavourite(false);
    }
  };

  // Check if favourite
  const handleFavourite = async () => {
    if (user?.displayName) {
      const userName = user.displayName;
      const query = await getDocs(collection(db, userName));
      query.forEach((item) => {
        if (item.data().id === movie.id) {
          setFavourite(true);
        }
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      // Check if iframe is empty
      if (document.getElementById("movieIframe").contentWindow.length === 0) {
        setLoaded(true);
        createEmptyIframe();
      }
    }, 1000);

    if (user !== undefined) {
      handleFavourite();
    }
  }, [user?.displayName]);

  // Check if movie is found
  if (movie.length !== 0) {
    return (
      <div
        className="single-movie"
        style={
          movie[0] === "empty" ? { display: "none" } : { display: "block" }
        }
      >
        {/* Show path */}
        <p className="movie-path">Home / Movies / {movie.title}</p>

        {/* Video Wrapper */}
        <div className="movie-wrapper" id="movie-wrapper">
          {/* Loading Animation */}
          {loading && (
            <div className="loading-div">
              <ClipLoader color={"#123abv"} loading={loading} size={80} />
            </div>
          )}
          {/* Iframe */}
          <iframe
            id="movieIframe"
            style={
              loading || loaded ? { display: "none" } : { display: "block" }
            }
            src={"https://vidsrc.me/embed/" + movie.id}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Movie Information */}
        <div
          className="movie-info"
          style={loading ? { display: "none" } : { width: "100%" }}
        >
          {/* Movie Left side */}
          <div className="movie-left">
            {/* Movie Image */}
            <Image
              src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
              alt=""
              width={250}
              height={350}
            />
          </div>

          {/* Movie Right Side */}
          <div className="movie-right">
            <div className="movie-box">
              {/* Movie Title */}
              <h2>{movie.original_title}</h2>

              {/* Remove from favourite */}
              {favourite && user && (
                <button
                  className="favourite-btn"
                  title="Remove Favourite"
                  onClick={removeFavourite}
                >
                  <FontAwesomeIcon
                    icon={faHeartCircleMinus}
                    style={{ color: "#E94560", width: "30px" }}
                    size="2xl"
                  ></FontAwesomeIcon>
                </button>
              )}
              {/* Add to favourite */}
              {!favourite && user && (
                <button
                  className="favourite-btn"
                  title="Add Favourite"
                  onClick={addFavourite}
                >
                  <FontAwesomeIcon
                    icon={faHeartCirclePlus}
                    style={{ color: "#fff", width: "30px" }}
                    size="2xl"
                  ></FontAwesomeIcon>
                </button>
              )}
            </div>

            <div className="movie-box">
              {/* Movie Trailer */}
              <button className="trailer-btn" onClick={handleOpen}>
                <FontAwesomeIcon
                  icon={faVideo}
                  style={{ color: "#fff", width: "30px", marginRight: "8px" }}
                  size="xl"
                ></FontAwesomeIcon>
                Trailer
              </button>

              {/* Open trailer popup */}
              {open &&
                trailer.results.map((trailerUrl) => {
                  if (
                    trailerUrl.type === "Trailer" &&
                    trailerUrl.name === "Official Trailer"
                  ) {
                    return (
                      <div className="trailer-box">
                        <button
                          className="trailer-box-close-btn"
                          onClick={handleOpen}
                        >
                          Close
                          <FontAwesomeIcon
                            icon={faClose}
                            style={{
                              color: "#00",
                              width: "15px",
                              marginLeft: "5px",
                            }}
                          ></FontAwesomeIcon>
                        </button>
                        <iframe
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allowFullScreen
                          src={
                            "https://www.youtube.com/embed/" + trailerUrl.key
                          }
                        ></iframe>
                      </div>
                    );
                  }
                })}

              {/* Movie Rate */}
              <p className="movie-rate">
                IMDb: {movie.vote_average.toFixed(1)}
              </p>
            </div>

            {/* Movie Description */}
            <p className="description">{movie.overview}</p>

            {/* Movie Date */}
            <p>
              <span>Released:</span> {movie.release_date}
            </p>

            {/* Movie Genre List */}
            <div className="movie-cont">
              <span>Genre: </span>
              {movie.genres.map((genre, i, arr) => {
                let slash = "";
                if (arr.length - 1 === i) {
                  slash = "";
                } else {
                  slash = ",";
                }
                return (
                  <p key={genre.id}>
                    {genre.name}
                    {slash}
                  </p>
                );
              })}
            </div>

            {/* Movie Time */}
            <p>
              <span>Duration:</span> {movie.runtime}m
            </p>

            {/* Movie Country List */}
            <div className="movie-cont">
              <span>Country: </span>
              {movie.production_countries.map((country, i, arr) => {
                let slash = "";
                if (arr.length - 1 === i) {
                  slash = "";
                } else {
                  slash = ",";
                }

                return (
                  <p key={country.iso_3166_1}>
                    {country.name}
                    {slash}
                  </p>
                );
              })}
            </div>

            {/* Movie Production Companies List */}
            <div className="movie-cont">
              <span>Production: </span>
              {movie.production_companies.map((companie, i, arr) => {
                let slash = "";
                if (arr.length - 1 === i) {
                  slash = "";
                } else {
                  slash = ",";
                }
                return (
                  <p key={companie.id}>
                    {companie.name}
                    {slash}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cast Members */}
        <h2
          className="related-title"
          style={loading ? { display: "none" } : { display: "block" }}
        >
          Cast Members
        </h2>
        <div
          className="cast-members"
          style={
            cast.length < 10
              ? { justifyContent: "flex-start" }
              : { justifyContent: "center" }
          }
        >
          {cast.map((member, i) => {
            if (member.known_for_department === "Acting" && i <= 19) {
              const split = member.character.split("/");
              if (member.profile_path) {
                return (
                  <div className="cast-member-card" key={member.cast_id}>
                    <MemberCard
                      name={member.original_name}
                      character={split[0]}
                      img={
                        "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" +
                        member.profile_path
                      }
                    />
                  </div>
                );
              }
            }
          })}
        </div>

        {/* Related Movies */}
        <h2
          className="related-title"
          style={loading ? { display: "none" } : { display: "block" }}
        >
          You may also like
        </h2>
        <div
          className="related-movies"
          style={loading || loaded ? { display: "none" } : { width: "100%" }}
        >
          {/* Iterate over related movies */}
          {related.results.map((relatedMovie) => {
            // Get first part of date
            const splitDate = relatedMovie.release_date.split("-");

            if (
              relatedMovie.title !== movie.title &&
              relatedMovie.poster_path &&
              relatedMovie.title &&
              relatedMovie.vote_average &&
              relatedMovie.release_date &&
              relatedMovie.overview
            ) {
              return (
                <Link
                  href={{
                    pathname: "/movie",
                    query: { id: relatedMovie.id },
                  }}
                  key={relatedMovie.id}
                  passHref={true}
                >
                  <a>
                    <MovieCard
                      title={relatedMovie.original_title}
                      year={splitDate[0]}
                      vote={relatedMovie.vote_average.toFixed(1)}
                      tag="Movie"
                      img={
                        "https://image.tmdb.org/t/p/original/" +
                        relatedMovie.poster_path
                      }
                    />
                  </a>
                </Link>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }
}

// Get Static Props
export async function getServerSideProps(context) {
  // Fetch Movie
  let movie = await getMovie(context.query.id);

  // Fetch Related
  let related = await getRelated(context.query.id);

  // Fetch Trailer
  let trailer = await getMovieTrailer(context.query.id);

  // Fetch Cast
  let cast = await fetchCast(context.query.id);

  if (movie === undefined || related === undefined) {
    movie = [];
    related = [];
  }

  return {
    props: {
      movie: movie,
      related: related,
      trailer: trailer,
      cast: cast.cast,
    },
  };
}
