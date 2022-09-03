import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faClose } from "@fortawesome/free-solid-svg-icons";

export default function Trailer({ trailer }) {
  // State for trailer popup open
  const [open, setOpen] = useState(false);

  // Open/Close trailer popup
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="movie-box">
      <button className="trailer-btn" onClick={handleOpen}>
        <FontAwesomeIcon
          icon={faVideo}
          style={{ color: "#fff", width: "22px", marginRight: "8px" }}
        ></FontAwesomeIcon>
        Trailer
      </button>

      {open &&
        trailer.map((trailerUrl) => {
          if (trailer.length > 0) {
            return (
              <div className="trailer-box" key={trailerUrl.id}>
                <button className="trailer-box-close-btn" onClick={handleOpen}>
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
                  src={"https://www.youtube.com/embed/" + trailerUrl.key}
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
                    src={"https://www.youtube.com/embed/" + trailerUrl.key}
                  ></iframe>
                </div>
              );
            }
          }
        })}
    </div>
  );
}
