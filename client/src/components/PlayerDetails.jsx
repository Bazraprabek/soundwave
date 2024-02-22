import React from "react";

function PlayerDetails(props) {
  return (
    <>
      <div className="song_details">
        <img
          src={import.meta.env.VITE_IMG_PATH + props.song.image}
          alt={props.song.title}
        />
        <div className="info px-2 d-flex flex-column justify-content-start">
          <h6 className="song_title">{props.song.title}</h6>
          <h6 className="text-muted">{props.song.artist}</h6>
        </div>
      </div>
    </>
  );
}

export default PlayerDetails;
