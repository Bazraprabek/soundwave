import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { playing } from "../redux/reducer/playerReducer";
import { setIndex } from "../redux/reducer/currentSong";
import { Link } from "react-router-dom";
import { playin } from "../redux/reducer/playing";

function Card({ title, image, artist, path }) {
  const dispatch = useDispatch();
  const handlePlay = () => {
    dispatch(playing());
    dispatch(setIndex(path));
    dispatch(playin());
  };
  return (
    <>
      <div className="card m-2 col-lg-3">
        <Link to={"/songs/" + path}>
          <img
            className="card-img-top"
            src={import.meta.env.VITE_IMG_PATH + image}
            // src={image}
            alt={title}
          />
          <div className="card-body">
            <h6 className="card-title">{title}</h6>
            <p className="card-text text-muted">{artist}</p>
          </div>
        </Link>
        <button className="play" onClick={handlePlay}>
          <FontAwesomeIcon icon={faPlay} />{" "}
        </button>
      </div>
    </>
  );
}

export default Card;
