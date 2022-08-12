import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import dmcLogo from "../assets/dmc-logo.png";

export default function Layout() {
  const [show, setShow] = useState(false);

  // Show Arrow Up
  const showArrowUp = () => {
    if (window.scrollY >= 400) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  // Go to the top of the page
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add scroll event listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", showArrowUp);
  }

  return (
    <footer>
      <div className="footer-up">
        <div className="footer-up-left">
          {/* Title */}
          <h2>ObelusStream</h2>
          {/* Description */}
          <p>
            ObelusStream was created with the idea of no more jumping ads, no
            more super slow loading and no more bad video quaity! We support
            more than 600k movies and series on demand with HD quality and
            subtitles to enjoy your watching time. Just grab your popcorns and
            your favourite bevarage and enjoy!
          </p>
        </div>
        <div className="footer-up-right">
          {/* Footer Menu */}
          <h2>Menu</h2>
          <nav>
            <ul>
              <li>
                <Link
                  href={{
                    pathname: "/",
                  }}
                  passHref={true}
                >
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/movies",
                  }}
                  passHref={true}
                >
                  <a>Movies</a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/exploreSeries",
                  }}
                  passHref={true}
                >
                  <a>Series</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer-up-left2">
          <Image src={dmcLogo} width={300} height={100} alt="" />
        </div>
      </div>
      <div className="footer-down">
        <p>ObelusStream © Copyright </p>
      </div>

      {/* Arrow Up */}
      {show && (
        <div className="arrow-up" onClick={goToTop} title="Scroll to the top">
          <a href="#header">
            <FontAwesomeIcon
              className="arrow"
              icon={faArrowUp}
              style={{ color: "#000", width: "20px" }}
            ></FontAwesomeIcon>
          </a>
        </div>
      )}
    </footer>
  );
}
