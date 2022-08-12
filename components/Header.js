import { useEffect, useRef, useState } from "react";
import Router, { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHamburger,
  faX,
  faUser,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

import logo from "../assets/logo.png";
import { UserAuth } from "../context/AuthContext";

export default function MovieCard() {
  const router = useRouter();
  const { user, logOut } = UserAuth();
  // State for mobile menu
  const [active, setActive] = useState(false);
  // State for active page
  const [activePage, setActivePage] = useState("");
  // Ref for search query
  const query = useRef("");

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle mobile menu
  const toggle = () => setActive(!active);

  // On enter trigger search
  const onKeyPress = (e) => {
    if (e.which == 13) {
      Router.push("/search/?query=" + query.current.value);
    }
  };

  // Handle active page
  const handleActiveLink = () => {
    if (typeof window !== "undefined") {
      if (
        document.getElementById("/").getAttribute("href") ===
        window.location.pathname
      ) {
        setActivePage("/");
      } else if (
        document.getElementById("/movies").getAttribute("href") ===
        window.location.pathname
      ) {
        setActivePage("/movies");
      } else if (
        document.getElementById("/exploreSeries").getAttribute("href") ===
        window.location.pathname
      ) {
        setActivePage("/exploreSeries");
      } else {
        setActivePage("");
      }
    }
  };

  useEffect(() => {
    // Set active page on load
    if (typeof window !== "undefined") {
      if (
        document.getElementById("/").getAttribute("href") ===
        window.location.pathname
      ) {
        setActivePage("/");
      } else if (
        document.getElementById("/movies").getAttribute("href") ===
        window.location.pathname
      ) {
        setActivePage("/movies");
      } else if (
        document.getElementById("/exploreSeries").getAttribute("href") ===
        window.location.pathname
      ) {
        setActivePage("/exploreSeries");
      } else if (
        document.getElementById("/favorites")?.getAttribute("href") ===
        window.location.pathname
      ) {
        setActivePage("/favorites");
      } else {
        setActivePage("");
      }
    }
  }, [handleActiveLink]);

  return (
    // Header
    <header id="header">
      {/* Logo */}
      <Link
        href={{
          pathname: "/",
        }}
        passHref={true}
      >
        <a>
          <Image src={logo} alt="" width={350} height={150} />
        </a>
      </Link>

      <nav className={active ? "nav-menu-mobile active" : "nav-menu"}>
        {/* Mobile Menu */}
        {active && (
          <ul>
            <li onClick={toggle}>
              <Link
                href={{
                  pathname: "/",
                }}
                passHref={true}
              >
                <a
                  id="/"
                  style={
                    activePage === "/"
                      ? { borderBottom: "2px solid #fff" }
                      : { fontSize: "1.2rem" }
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
                  pathname: "/movies",
                }}
                passHref={true}
              >
                <a
                  id="/movies"
                  style={
                    activePage === "/movies"
                      ? { borderBottom: "2px solid #fff" }
                      : { fontSize: "1.2rem" }
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
                  pathname: "/exploreSeries",
                }}
                passHref={true}
              >
                <a
                  id="/exploreSeries"
                  style={
                    activePage === "/exploreSeries"
                      ? { borderBottom: "2px solid #fff" }
                      : { fontSize: "1.2rem" }
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
                    pathname: "/favorites",
                  }}
                  passHref={true}
                >
                  <a
                    id="/favorites"
                    style={
                      activePage === "/favorites"
                        ? { borderBottom: "2px solid #fff" }
                        : { fontSize: "1.2rem" }
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
                  pathname: "/",
                }}
                passHref={true}
              >
                <a
                  id="/"
                  style={
                    activePage === "/"
                      ? { borderBottom: "2px solid #fff" }
                      : { fontSize: "1.2rem" }
                  }
                >
                  Home
                </a>
              </Link>
            </li>
            <li onClick={handleActiveLink}>
              <Link
                href={{
                  pathname: "/movies",
                }}
                passHref={true}
              >
                <a
                  id="/movies"
                  style={
                    activePage === "/movies"
                      ? { borderBottom: "2px solid #fff" }
                      : { fontSize: "1.2rem" }
                  }
                >
                  Movies
                </a>
              </Link>
            </li>
            <li onClick={handleActiveLink}>
              <Link
                href={{
                  pathname: "/exploreSeries",
                }}
                passHref={true}
              >
                <a
                  id="/exploreSeries"
                  style={
                    activePage === "/exploreSeries"
                      ? { borderBottom: "2px solid #fff" }
                      : { fontSize: "1.2rem" }
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
                    pathname: "/favorites",
                  }}
                  passHref={true}
                >
                  <a
                    id="/favorites"
                    style={
                      activePage === "/favorites"
                        ? { borderBottom: "2px solid #fff" }
                        : { fontSize: "1.2rem" }
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

      <div className="header-right-div">
        {/* Search */}
        <div id="searchUsers" className="instant-search">
          <div className="instant-search__input-container">
            <input
              className="instant-search__input"
              type="text"
              spellCheck="false"
              placeholder="Search..."
              ref={query}
              onKeyPress={onKeyPress}
            />
            <FontAwesomeIcon
              icon={faSearch}
              style={{ color: "#000", width: "25px", marginRight: "10px" }}
            ></FontAwesomeIcon>
          </div>
        </div>

        {user ? (
          <FontAwesomeIcon
            icon={faSignOut}
            style={{ color: "#fff", width: "25px", cursor: "pointer" }}
            size="lg"
            name="Logout"
            onClick={handleSignOut}
          ></FontAwesomeIcon>
        ) : (
          <Link
            href={{
              pathname: "/login",
            }}
            passHref={true}
          >
            <a>
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: "#fff", width: "25px" }}
                size="lg"
              ></FontAwesomeIcon>
            </a>
          </Link>
        )}

        {/* Hamburger Icon */}
        {!active && (
          <FontAwesomeIcon
            className="hamburger"
            icon={faHamburger}
            style={{ color: "#fff", width: "25px", marginRight: "20px" }}
            onClick={toggle}
          ></FontAwesomeIcon>
        )}

        {/* X Icon */}
        {active && (
          <FontAwesomeIcon
            className="hamburger"
            icon={faX}
            style={{ color: "#fff", width: "25px", marginRight: "20px" }}
            onClick={toggle}
          ></FontAwesomeIcon>
        )}
      </div>
    </header>
  );
}
