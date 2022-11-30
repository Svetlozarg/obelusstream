import { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faHamburger,
  faX,
  faUser,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

import logo from '../assets/logo.png';
import { UserAuth } from '../context/AuthContext';
import AutoComplete from './AutoComplete';

export default function MovieCard() {
  const router = useRouter();
  const { user, logOut } = UserAuth();
  // State for mobile menu
  const [active, setActive] = useState(false);
  // State for active page
  const [activePage, setActivePage] = useState('');
  const [autoComplete, setAutoComplete] = useState('');
  // Ref for search query
  const query = useRef('');

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const pull_data = (data) => {
    if (data) {
      query.current.value = '';
    }
  };

  // Toggle mobile menu
  const toggle = () => setActive(!active);

  // On enter trigger search
  const onKeyPress = (e) => {
    if (query.current.value === '') return;
    if (e.which == 13) {
      Router.push('/search/?query=' + query.current.value);
      query.current.value = '';
    }
  };

  const handleAutoComplete = () => {
    setAutoComplete(query.current.value);
  };

  // Handle active page
  const handleActiveLink = () => {
    if (typeof window !== 'undefined') {
      if (
        document.getElementById('/').getAttribute('href') ===
        window.location.pathname
      ) {
        setActivePage('/');
      } else if (
        document.getElementById('/movies').getAttribute('href') ===
        window.location.pathname
      ) {
        setActivePage('/movies');
      } else if (
        document.getElementById('/exploreSeries').getAttribute('href') ===
        window.location.pathname
      ) {
        setActivePage('/exploreSeries');
      } else {
        setActivePage('');
      }
    }
  };

  useEffect(() => {
    // Set active page on load
    if (typeof window !== 'undefined') {
      if (
        document.getElementById('/').getAttribute('href') ===
        window.location.pathname
      ) {
        setActivePage('/');
      } else if (
        document.getElementById('/movies').getAttribute('href') ===
        window.location.pathname
      ) {
        setActivePage('/movies');
      } else if (
        document.getElementById('/exploreSeries').getAttribute('href') ===
        window.location.pathname
      ) {
        setActivePage('/exploreSeries');
      } else if (
        document.getElementById('/favorites')?.getAttribute('href') ===
        window.location.pathname
      ) {
        setActivePage('/favorites');
      } else {
        setActivePage('');
      }
    }
  }, [handleActiveLink]);

  return (
    // Header
    <header id='header'>
      {/* Logo */}
      <Link
        href={{
          pathname: '/',
        }}
        passHref={true}
      >
        <a>
          <Image src={logo} alt='' width={350} height={150} />
        </a>
      </Link>

      <nav className={active ? 'nav-menu-mobile active' : 'nav-menu'}>
        {/* Mobile Menu */}
        {active && (
          <ul>
            <li onClick={toggle}>
              <Link
                href={{
                  pathname: '/',
                }}
                passHref={true}
              >
                <a
                  id='/'
                  style={
                    activePage === '/'
                      ? { borderBottom: '2px solid #fff' }
                      : { fontSize: '1.2rem' }
                  }
                  onClick={handleActiveLink}
                >
                  Home
                </a>
              </Link>
            </li>
            <li onClick={toggle}>
              <Link
                href={{
                  pathname: '/movies',
                }}
                passHref={true}
              >
                <a
                  id='/movies'
                  style={
                    activePage === '/movies'
                      ? { borderBottom: '2px solid #fff' }
                      : { fontSize: '1.2rem' }
                  }
                  onClick={handleActiveLink}
                >
                  Movies
                </a>
              </Link>
            </li>
            <li onClick={toggle}>
              <Link
                href={{
                  pathname: '/exploreSeries',
                }}
                passHref={true}
              >
                <a
                  id='/exploreSeries'
                  style={
                    activePage === '/exploreSeries'
                      ? { borderBottom: '2px solid #fff' }
                      : { fontSize: '1.2rem' }
                  }
                  onClick={handleActiveLink}
                >
                  Series
                </a>
              </Link>
            </li>
            {user && (
              <li onClick={toggle}>
                <Link
                  href={{
                    pathname: '/favorites',
                  }}
                  passHref={true}
                >
                  <a
                    id='/favorites'
                    style={
                      activePage === '/favorites'
                        ? { borderBottom: '2px solid #fff' }
                        : { fontSize: '1.2rem' }
                    }
                    onClick={handleActiveLink}
                  >
                    Favorites
                  </a>
                </Link>
              </li>
            )}
          </ul>
        )}

        {/* Desktop Menu */}
        {!active && (
          <ul>
            <li onClick={handleActiveLink}>
              <Link
                href={{
                  pathname: '/',
                }}
                passHref={true}
              >
                <a
                  id='/'
                  style={
                    activePage === '/'
                      ? { borderBottom: '2px solid #fff' }
                      : { fontSize: '1.2rem' }
                  }
                >
                  Home
                </a>
              </Link>
            </li>
            <li onClick={handleActiveLink} className='second-child'>
              <Link
                href={{
                  pathname: '/movies',
                }}
                passHref={true}
              >
                <a
                  id='/movies'
                  style={
                    activePage === '/movies'
                      ? { borderBottom: '2px solid #fff' }
                      : { fontSize: '1.2rem' }
                  }
                >
                  Movies
                </a>
              </Link>
              <ul className='dropdown'>
                <li>
                  <Link
                    href={{
                      pathname: '/movies',
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      All
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 28 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Action
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 12 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Adventure
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 16 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Animation
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 35 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Comedy
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 80 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Crime
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 99 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Documentary
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 18 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Drama
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 10751 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Family
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 14 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Fantasy
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 36 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      History
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 27 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Horror
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 10402 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Music
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 9648 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Mystery
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 10749 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Romance
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 878 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Science Fiction
                    </a>
                  </Link>{' '}
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 53 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/thriller'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Thriller
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 10752 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/war'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      War
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/genres',
                      query: { id: 37 },
                    }}
                    passHref={true}
                  >
                    <a
                      id='/movies'
                      style={
                        activePage === '/movies'
                          ? { borderBottom: '2px solid #fff' }
                          : { fontSize: '1rem' }
                      }
                    >
                      Western
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li onClick={handleActiveLink}>
              <Link
                href={{
                  pathname: '/exploreSeries',
                }}
                passHref={true}
              >
                <a
                  id='/exploreSeries'
                  style={
                    activePage === '/exploreSeries'
                      ? { borderBottom: '2px solid #fff' }
                      : { fontSize: '1.2rem' }
                  }
                >
                  Series
                </a>
              </Link>
            </li>
            {user && (
              <li onClick={handleActiveLink}>
                <Link
                  href={{
                    pathname: '/favorites',
                  }}
                  passHref={true}
                >
                  <a
                    id='/favorites'
                    style={
                      activePage === '/favorites'
                        ? { borderBottom: '2px solid #fff' }
                        : { fontSize: '1.2rem' }
                    }
                  >
                    Favorites
                  </a>
                </Link>
              </li>
            )}
          </ul>
        )}
      </nav>

      <div className='header-right-div'>
        {/* Search */}
        <div id='searchUsers' className='instant-search'>
          <div className='instant-search__input-container'>
            <input
              className='instant-search__input'
              type='text'
              spellCheck='false'
              placeholder='Search...'
              ref={query}
              onKeyPress={onKeyPress}
              onChange={handleAutoComplete}
            />
            <FontAwesomeIcon
              icon={faSearch}
              style={{ color: '#000', width: '25px', marginRight: '10px' }}
            ></FontAwesomeIcon>
          </div>

          {autoComplete !== '' && query.current.value !== '' && (
            <AutoComplete
              autoCompleteSearch={autoComplete}
              closeACBox={pull_data}
            />
          )}
        </div>

        {user ? (
          <FontAwesomeIcon
            icon={faSignOut}
            style={{ color: '#fff', width: '25px', cursor: 'pointer' }}
            size='lg'
            name='Logout'
            onClick={handleSignOut}
          ></FontAwesomeIcon>
        ) : (
          <Link
            href={{
              pathname: '/login',
            }}
            passHref={true}
          >
            <a>
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: '#fff', width: '25px' }}
                size='lg'
              ></FontAwesomeIcon>
            </a>
          </Link>
        )}

        {/* Hamburger Icon */}
        {!active && (
          <FontAwesomeIcon
            className='hamburger'
            icon={faHamburger}
            style={{ color: '#fff', width: '25px', marginRight: '20px' }}
            onClick={toggle}
          ></FontAwesomeIcon>
        )}

        {/* X Icon */}
        {active && (
          <FontAwesomeIcon
            className='hamburger'
            icon={faX}
            style={{ color: '#fff', width: '25px', marginRight: '20px' }}
            onClick={toggle}
          ></FontAwesomeIcon>
        )}
      </div>
    </header>
  );
}
