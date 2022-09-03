import { useState, useEffect } from "react";
import Image from "next/image";
import Trailer from "./Trailer";
import { UserAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCirclePlus,
  faHeartCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { db } from "../config/firebase";
import {
  setDoc,
  doc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";

export default function SeriesInfo({
  id = "",
  img = "",
  title = "",
  rate = "",
  description = "",
  date = "",
  genre = "",
  seasons = "",
  country = "",
  production = "",
  trailer = "",
  runtime = "",
}) {
  // Get user data
  const { user } = UserAuth();
  // State for favourite
  const [favourite, setFavourite] = useState(false);

  // Handle add to favourite
  const addFavourite = async () => {
    if (favourite === false && user !== undefined) {
      await setDoc(doc(db, user.displayName, title), {
        id: id,
        tag: "tv",
      });
      setFavourite(true);
    }
  };

  // Handle remove from favourite
  const removeFavourite = async () => {
    if (favourite === true && user !== undefined) {
      await deleteDoc(doc(db, user.displayName, title));
      setFavourite(false);
    }
  };

  // Check if favourite
  const handleFavourite = async () => {
    if (user?.displayName) {
      const userName = user.displayName;
      const query = await getDocs(collection(db, userName));
      query.forEach((item) => {
        if (item.data().id === id) {
          setFavourite(true);
        }
      });
    }
  };

  useEffect(() => {
    if (user !== undefined) {
      handleFavourite();
    }
  }, [user?.displayName]);

  return (
    <div className="movie-info">
      {/* Series Left side */}
      <div className="movie-left">
        {/* Series Image */}
        <Image
          src={"https://image.tmdb.org/t/p/original/" + img}
          alt=""
          width={250}
          height={350}
        />
      </div>

      {/* Series Right Side */}
      <div className="movie-right">
        <div className="movie-box">
          {/* Series Title */}
          <h2>{title}</h2>

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

        <Trailer trailer={trailer.results} />

        {/* Series Rate */}
        <div className="movie-box">
          <p className="movie-rate">IMDb: {rate}</p>
        </div>

        {/* Series Description */}
        <p className="description">{description}</p>

        {/* Series Date */}
        <p>
          <span>Released:</span> {date}
        </p>

        {/* Series Genre List */}
        <div className="movie-cont">
          <span>Genre: </span>
          {genre.map((genre, i, arr) => {
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

        {/* Series Total Seasons */}
        <p>
          {seasons && (
            <span>
              Number of seasons: <span className="cont">{seasons}</span>
            </span>
          )}
          {runtime && (
            <span>
              Duration: <span className="cont">{runtime}m</span>{" "}
            </span>
          )}
        </p>

        {/* Series Country List */}
        <div className="movie-cont">
          <span>Country: </span>
          {country.map((country, i, arr) => {
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

        {/* Series Production List */}
        <div className="movie-cont">
          <span>Production: </span>
          {production.map((companie, i, arr) => {
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
  );
}
