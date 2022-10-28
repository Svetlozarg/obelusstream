import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faHeartCirclePlus,
  faHeartCircleMinus,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  setDoc,
  doc,
  deleteDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserAuth } from '../context/AuthContext';
import MovieInfoBox from './MovieInfoBox';

export default function MovieCard({
  id,
  title = 'No Title',
  year = 0,
  vote = 0,
  tag = 'No Tag',
  description,
  seasons = 0,
  episodes = 0,
  img,
  runtime,
  country,
  genre,
}) {
  const { user } = UserAuth();
  // State for favourite
  const [favourite, setFavourite] = useState(false);
  const [openMovieBox, setOpenMovieBox] = useState(false);
  const [isFurthestX, setIsFurthestX] = useState(false);

  const router = useRouter();

  // Handle add to favourite
  const addFavourite = async (e) => {
    e.preventDefault();

    if (tag === 'Movie') {
      await setDoc(doc(db, user.displayName, title), {
        id: id,
        tag: 'movie',
      });
      setFavourite(true);
    } else if (tag === 'TV') {
      await setDoc(doc(db, user.displayName, title), {
        id: id,
        tag: 'tv',
      });
      setFavourite(true);
    }
  };

  // Handle remove from favourite
  const removeFavourite = async (e) => {
    e.preventDefault();

    if (tag === 'Movie') {
      await deleteDoc(doc(db, user.displayName, title));
      setFavourite(false);
    } else {
      await deleteDoc(doc(db, user.displayName, title));
      setFavourite(false);
    }
  };

  // Check if id is in favourite
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
  }, [user]);

  return (
    // Movie Card
    <div
      className='moviecard'
      onMouseEnter={(event) => {
        setOpenMovieBox(true);

        var x = event.screenX;
        var y = event.screenY;

        if (x >= 1050) {
          setIsFurthestX(true);
        }
      }}
      onMouseLeave={() => {
        setOpenMovieBox(false);
      }}
    >
      <div className='moviecard-img'>
        {/* Movie Image */}
        <Image
          src={img}
          alt='Movie Image'
          width={170}
          height={240}
          loading='lazy'
        />

        {tag === 'TV' && (
          <div className='season-info-count'>
            <p>S{seasons}</p>
            <p>E{episodes}</p>
          </div>
        )}

        {/* If Favourite */}
        {favourite && user && (
          <FontAwesomeIcon
            icon={faHeartCircleMinus}
            style={{
              color: '#E94560',
              width: '30px',
            }}
            size='2xl'
            className='heart-icon'
            title='Remove Favourite'
            onClick={(e) => removeFavourite(e)}
          ></FontAwesomeIcon>
        )}

        {/* If Not Favourite */}
        {!favourite && user && (
          <FontAwesomeIcon
            icon={faHeartCirclePlus}
            style={{
              color: '#fff',
              width: '30px',
            }}
            size='2xl'
            className='heart-icon'
            title='Add Favourite'
            onClick={(e) => addFavourite(e)}
          ></FontAwesomeIcon>
        )}

        {/* Play Icon */}
        <FontAwesomeIcon
          icon={faPlay}
          style={{
            color: '#fff',
            width: '30px',
          }}
          size='2xl'
          className='play-icon'
        ></FontAwesomeIcon>
      </div>

      <div className='moviecard-cont'>
        {/* Title */}
        <h4>{title.length >= 10 ? title.substring(0, 20) : title}</h4>
        <div className='moviecard-cont-div'>
          {/* Year */}
          <p>{year}</p>
          {/* Vote */}
          <p>
            <FontAwesomeIcon
              icon={faStar}
              style={{
                color: 'rgb(199, 199, 199)',
                width: '15px',
                marginRight: '5px',
              }}
            ></FontAwesomeIcon>
            {vote}
          </p>
          {/* Tag */}
          <p>{tag}</p>
        </div>
      </div>

      {openMovieBox && (
        <MovieInfoBox
          title={title}
          vote={vote}
          year={year}
          description={description}
          quality='HD'
          runtime={runtime}
          country={country}
          genre={genre}
          left={!isFurthestX ? 49 : -139}
        />
      )}
    </div>
  );
}
