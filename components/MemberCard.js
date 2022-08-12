import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faVideo } from "@fortawesome/free-solid-svg-icons";

export default function MemberCard({ name = "", character = "", img }) {
  return (
    // Member Card
    <div className="cast-member-card" title={name}>
      {/* Member Image */}
      <Image src={img} alt="Cast Image" width={150} height={190} />

      {/* Name */}
      <p>
        <FontAwesomeIcon
          icon={faUser}
          style={{ color: "#fff", width: "15px", marginRight: "5px" }}
        ></FontAwesomeIcon>
        {name}
      </p>

      {/* Character */}
      <p>
        <FontAwesomeIcon
          icon={faVideo}
          style={{ color: "#fff", width: "15px", marginRight: "5px" }}
        ></FontAwesomeIcon>
        {character}
      </p>
    </div>
  );
}
