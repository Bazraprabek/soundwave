import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faBackward,
  faForward,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { pausein, playin } from "../redux/reducer/playing";
import { useDispatch, useSelector } from "react-redux";

function PlayerControl(props) {
  const dispatch = useDispatch();
  const { play } = useSelector((state) => state.playing);

  const updateTime = (value) => {
    props.audioEl.current.currentTime = value;
  };

  const handleClick = () => {
    if (play) {
      dispatch(pausein());
    } else {
      dispatch(playin());
    }
    // props.setPlaying(!props.isPlaying);
  };

  return (
    <>
      <div className="timestamp px-4">
        <span className="date"> {props.time || 0}</span>
        {props.time && props.duration ? (
          <>
            <input
              type="range"
              className="range mx-2"
              min="0"
              max={props.duration}
              onChange={(e) => updateTime(e.target.value)}
              value={props.time}
            />
            <span className="date">{props.duration}</span>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="control">
        {/* <button className="skip_btn" onClick={()=>props.skipSong(false)}><FontAwesomeIcon icon={faBackward}/></button> */}
        <button className="play_btn" onClick={handleClick}>
          <FontAwesomeIcon icon={play ? faPause : faPlay} />
        </button>
        {/* <button className="skip_btn" onClick={()=>props.skipSong()}><FontAwesomeIcon icon={faForward}/></button> */}
        <button
          className="skip_btn px-3"
          onClick={() => props.setMute(!props.isMute)}
        >
          <FontAwesomeIcon icon={props.isMute ? faVolumeMute : faVolumeHigh} />
        </button>
      </div>
    </>
  );
}

export default PlayerControl;
