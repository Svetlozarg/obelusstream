import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import MovieCard from "../components/MovieCard";
import MemberCard from "../components/MemberCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faClose,
  faHeartCirclePlus,
  faHeartCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

import { getEpisodes, getSeries } from "../utils/series";
import { getRelatedSeries } from "../utils/related";
import { getSeriesTrailer } from "../utils/trailer";
import { fetchCastSeries } from "../utils/cast";
import {
  setDoc,
  doc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { UserAuth } from "../context/AuthContext";

export default function Series({
  series,
  episodes,
  seasonNumber,
  related,
  trailer,
  cast,
}) {
  const { user } = UserAuth();
  // State for loading
  const [loading, setLoading] = useState(true);
  // State for iframe loaded
  const [loaded, setLoaded] = useState(false);
  // State for trailer popup open
  const [open, setOpen] = useState(false);
  // State for favourite
  const [favourite, setFavourite] = useState(false);
  // State to hold series info
  const [getSeriesInfo, setSeriesInfo] = useState([]);

  // Open/Close trailer popup
  const handleOpen = () => {
    setOpen(!open);
  };

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

  // Handle add to favourite
  const addFavourite = async () => {
    if (favourite === false && user !== undefined) {
      await setDoc(doc(db, user.displayName, series.original_name), {
        id: series.id,
        tag: "tv",
      });
      setFavourite(true);
    }
  };

  // Handle remove from favourite
  const removeFavourite = async () => {
    if (favourite === true && user !== undefined) {
      await deleteDoc(doc(db, user.displayName, series.original_name));
      setFavourite(false);
    }
  };

  // Check if favourite
  const handleFavourite = async () => {
    if (user?.displayName) {
      const userName = user.displayName;
      const query = await getDocs(collection(db, userName));
      query.forEach((item) => {
        if (item.data().id === series.id) {
          setFavourite(true);
        }
      });
    }
  };

  const handleSeries = () => {
    const seriesInfo = [];
    related.results.map(async (serie, i) => {
      const serieInfo = await getSeries(serie.id);
      seriesInfo.push(serieInfo);
      if (i === related.results.length - 1) {
        setSeriesInfo(seriesInfo);
      }
    });
  };

  useEffect(() => {
    handleSeries();
    setTimeout(() => {
      setLoading(false);
      if (document.getElementById("movieIframe").contentWindow.length === 0) {
        setLoaded(true);
        createEmptyIframe();
      }
    }, 1000);

    if (user !== undefined) {
      handleFavourite();
    }
  }, [user?.displayName]);

  if (
    series.length !== 0 ||
    episodes.length !== 0 ||
    seasonNumber.length !== 0
  ) {
    return (
      // Single Movie Page
      <div className="single-movie">
        <p className="series-path">
          Home / Series / {series?.original_name} - Season {seasonNumber[0]}{" "}
          Episode {seasonNumber[1]}
        </p>
        {/* Video Wrapper */}
        <div className="movie-wrapper" id="movie-wrapper">
          {loading && (
            <div className="loading-div">
              <ClipLoader color={"#123abv"} loading={loading} size={80} />
            </div>
          )}
          <iframe
            id="movieIframe"
            style={
              loading || loaded ? { display: "none" } : { display: "block" }
            }
            src={
              "https://vidsrc.me/embed/" +
              series.id +
              "/" +
              seasonNumber[0] +
              "-" +
              seasonNumber[1] +
              "/"
            }
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Series Seasons and Episodes */}
        <div
          className="series-wrapper"
          style={loading ? { display: "none" } : { width: "100%" }}
        >
          <div className="series-left">
            <h4>Seasons</h4>
            <div className="series-left-div">
              {series?.seasons?.map((serie, i) => {
                const splitDate = serie.air_date?.split("-");

                const seasonNum = i === 0 ? i + 1 : i;
                if (
                  serie.name !== "Specials" &&
                  i <= series.last_episode_to_air.season_number
                ) {
                  return (
                    <Link
                      href={{
                        pathname: "/series",
                        query: {
                          id: series.id,
                          season: seasonNum,
                          episode: "1",
                        },
                      }}
                      key={serie.id}
                      passHref={true}
                    >
                      <a>
                        <div className="season">
                          <p
                            className={
                              seasonNumber[0] == seasonNum ? "active" : ""
                            }
                          >
                            Season {seasonNum}
                            <span>
                              {splitDate !== undefined ? splitDate[0] : ""}
                            </span>
                          </p>
                        </div>
                      </a>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
          <div className="series-right">
            <h4>Episodes</h4>
            <div className="series-right-div">
              {episodes?.episodes?.map((episode, i) => {
                return (
                  <Link
                    href={{
                      pathname: "/series",
                      query: {
                        id: series.id,
                        season: seasonNumber[0],
                        episode: i + 1,
                      },
                    }}
                    key={episode.id}
                    passHref={true}
                  >
                    <a>
                      <p className={seasonNumber[1] == i + 1 ? "active" : ""}>
                        Episode {episode.episode_number}: {episode.name}
                      </p>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Movie Information */}
        <div className="movie-info">
          {/* Movie Left side */}
          <div className="movie-left">
            {/* Movie Image */}
            <Image
              src={"https://image.tmdb.org/t/p/original/" + series.poster_path}
              alt=""
              width={250}
              height={350}
            />
          </div>

          {/* Movie Right Side */}
          <div className="movie-right">
            <div className="movie-box">
              {/* Movie Title */}
              <h2>{series.original_name}</h2>

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
                  style={{ color: "#fff", width: "22px", marginRight: "8px" }}
                ></FontAwesomeIcon>
                Trailer
              </button>

              {open &&
                trailer.results.map((trailerUrl) => {
                  if (trailer.results.length > 0) {
                    return (
                      <div className="trailer-box" key={trailerUrl.id}>
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
                  } else {
                    if (
                      (trailerUrl.type === "Trailer" &&
                        trailerUrl.name === "Final Trailer") ||
                      trailerUrl.name === "Official Trailer"
                    ) {
                      return (
                        <div className="trailer-box" key={trailerUrl.id}>
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
                  }
                })}

              <p className="movie-rate">
                IMDb: {series.vote_average.toFixed(1)}
              </p>
            </div>

            {/* Movie Rate */}

            {/* Movie Description */}
            <p className="description">{series.overview}</p>

            {/* Movie Date */}
            <p>
              <span>Released:</span> {series.first_air_date}
            </p>

            {/* Movie Genre List */}
            <div className="movie-cont">
              <span>Genre: </span>
              {series.genres.map((genre, i, arr) => {
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
              <span>Number of seasons:</span> {series.number_of_seasons}
            </p>

            {/* Movie Country List */}
            <div className="movie-cont">
              <span>Country: </span>
              {series.production_countries.map((country, i, arr) => {
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
              {series.production_companies.map((companie, i, arr) => {
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

        {/* Related Series */}
        <h2
          className="related-title"
          style={
            loading || related.results.length === 0
              ? { display: "none" }
              : { display: "block" }
          }
        >
          You may also like
        </h2>
        <div
          className={
            related.results.length < 10
              ? "related-movies .start"
              : "related-movies .center"
          }
          style={loading ? { display: "none" } : { width: "100%" }}
        >
          {/* Iterate over related movies */}
          {getSeriesInfo.map((relatedMovie) => {
            if (
              relatedMovie.poster_path &&
              relatedMovie.original_name &&
              relatedMovie.origin_country &&
              relatedMovie.overview &&
              relatedMovie.vote_average
            ) {
              // Get first part of date
              const splitDate = relatedMovie?.last_air_date?.split("-");
              const splitDateFirst = relatedMovie?.first_air_date?.split("-");

              return (
                <Link
                  href={{
                    pathname: "/series",
                    query: { id: relatedMovie.id, season: "1", episode: "1" },
                  }}
                  key={relatedMovie.id}
                  passHref={true}
                >
                  <a>
                    <MovieCard
                      title={relatedMovie.name}
                      year={
                        splitDate !== undefined
                          ? splitDate[0]
                          : splitDateFirst[0]
                      }
                      vote={relatedMovie.vote_average.toFixed(1)}
                      tag="TV"
                      seasons={relatedMovie.last_episode_to_air?.season_number}
                      episodes={
                        relatedMovie.last_episode_to_air?.episode_number
                      }
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
  let series = await getSeries(context.query.id);

  let episodes = await getEpisodes(context.query.id, context.query.season);

  let seasonNumber = context.query.season;
  let episodeNumber = context.query.episode;
  let seasonNumberArr = [];
  seasonNumberArr.push(seasonNumber, episodeNumber);

  // Fetch Related
  let related = await getRelatedSeries(context.query.id);

  // Fetch Trailer
  let trailer = await getSeriesTrailer(context.query.id);

  // Fetch Cast
  let cast = await fetchCastSeries(context.query.id);

  if (
    series === undefined ||
    episodes === undefined ||
    seasonNumberArr.length === 0 ||
    related === undefined
  ) {
    series = [];
    episodes = [];
    seasonNumberArr = [];
    related = [];
  }

  return {
    props: {
      seasonNumber: seasonNumberArr,
      series: series,
      episodes: episodes,
      related: related,
      trailer: trailer,
      cast: cast.cast,
    },
  };
}
