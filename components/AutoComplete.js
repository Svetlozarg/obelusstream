import { useEffect, useState } from 'react';
import { getSearch } from '../utils/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function AutoComplete({ autoCompleteSearch = '' }) {
  const [autoComplete, setAutoComplete] = useState([]);

  const handleAutoCompleteResults = async () => {
    const search = await getSearch(autoCompleteSearch);
    setAutoComplete(search.results);
    console.log(search);
  };

  useEffect(() => {
    handleAutoCompleteResults();
  }, [autoCompleteSearch]);

  return (
    <div className="autocomplete">
      {autoComplete.map((item, i) => {
        if (i > 5) return;
        if (
          item?.poster_path &&
          item?.title &&
          item?.vote_average &&
          item?.release_date &&
          item?.overview &&
          item?.genre_ids.length !== 0
        ) {
          return (
            <Link
              href={{
                pathname: '/movie',
                query: { id: item?.id },
              }}
              key={item?.id}
              passHref={true}
            >
              <a>
                <div className="autocomplete-box" key={i}>
                  <div>
                    <img
                      src={
                        'https://image.tmdb.org/t/p/original/' +
                        item?.poster_path
                      }
                      alt="Movie Image"
                      loading="lazy"
                    ></img>
                  </div>
                  <div className="autocomplete-box-cont">
                    <h4>{item?.original_title}</h4>
                    <div>
                      <p>{item?.release_date.split('-')[0]}</p>
                      <p>
                        <FontAwesomeIcon
                          icon={faStar}
                          style={{
                            color: 'rgb(199, 199, 199)',
                            width: '15px',
                            marginRight: '5px',
                          }}
                        ></FontAwesomeIcon>
                        {item?.vote_average}
                      </p>
                      <p className="type">{item?.media_type}</p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          );
        }
      })}
    </div>
  );
}
