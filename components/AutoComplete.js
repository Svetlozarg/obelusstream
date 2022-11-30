import { useEffect, useState } from 'react';
import { getSearch } from '../utils/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function AutoComplete({ autoCompleteSearch = '', closeACBox }) {
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
    <div className='autocomplete'>
      {autoComplete.length === 0 ? (
        <div className='autocomplete-error'>
          No results match your search criteria
        </div>
      ) : (
        autoComplete.map((item, i) => {
          if (
            item?.media_type === 'movie' &&
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
                  <div
                    className='autocomplete-box'
                    key={i}
                    onClick={() => closeACBox(true)}
                  >
                    <div>
                      <img
                        src={
                          'https://image.tmdb.org/t/p/original/' +
                          item?.poster_path
                        }
                        alt='Movie Image'
                        loading='lazy'
                      ></img>
                    </div>
                    <div className='autocomplete-box-cont'>
                      <h4>
                        {item?.original_title.split(' ').length <= 10
                          ? item?.original_title
                          : item?.original_title.split(' ').map((word, i) => {
                              if (i > 10) return;
                              if (i < 10) return <span key={i}>{word} </span>;
                              if (i === 10)
                                return <span key={i}>{word}...</span>;
                            })}
                      </h4>
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
                        <p className='type'>{item?.media_type}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            );
          } else if (
            item?.media_type === 'tv' &&
            item?.poster_path &&
            item?.original_name &&
            item?.vote_average &&
            item?.first_air_date
          ) {
            return (
              <Link
                href={{
                  pathname: '/series',
                  query: { id: item?.id, season: '1', episode: '1' },
                }}
                key={item?.id}
                passHref={true}
              >
                <a>
                  <div
                    className='autocomplete-box'
                    key={i}
                    onClick={() => closeACBox(true)}
                  >
                    <div>
                      <img
                        src={
                          'https://image.tmdb.org/t/p/original/' +
                          item?.poster_path
                        }
                        alt='Movie Image'
                        loading='lazy'
                      ></img>
                    </div>
                    <div className='autocomplete-box-cont'>
                      <h4>{item?.original_name}</h4>
                      <div>
                        <p>{item?.first_air_date?.split('-')[0]}</p>
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
                        <p className='type'>{item?.media_type}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            );
          }
        })
      )}
    </div>
  );
}
