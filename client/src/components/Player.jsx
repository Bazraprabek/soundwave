import React, { useState, useRef, useEffect } from "react";
// import { useSelector } from 'react-redux';
import PlayerControl from "./PlayerControl";
import PlayerDetails from "./PlayerDetails";
import { useDispatch, useSelector } from "react-redux";
import { pausein, playin } from "../redux/reducer/playing";

function Player(props) {
  const playingSong = props.songs.filter(function (x) {
    return x._id == props.currentSongIndex;
  });

  const { play } = useSelector((state) => state.playing);
  const dispatch = useDispatch();
  const audioEl = useRef(null);
  const [isMute, setMute] = useState(false);
  const [time, setTime] = useState(0);
  const [currentSong, setCurrentSong] = useState({});
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setCurrentSong(playingSong[0]);
    if (currentSong) {
      if (play) {
        audioEl.current.play();
        const run = () => {
          setDuration(Math.floor(audioEl.current.duration));
        };
        run();
        setInterval(() => {
          let timestamp = Math.floor(audioEl.current.currentTime);
          setTime(timestamp);
          if (audioEl.current.ended) {
            dispatch(pausein());
            setDuration(0);
            clearInterval();
          }
        }, 1200);
      } else {
        audioEl.current.pause();
      }
      if (isMute) {
        audioEl.current.volume = 0;
      } else {
        audioEl.current.volume = 1;
      }
    }
  });

  const skipSong = (forward = true) => {
    if (forward) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = props.songs.length - 1;
        }

        return temp;
      });
    }
  };

  if (currentSong) {
    return (
      <>
        <audio
          id="audio"
          ref={audioEl}
          src={import.meta.env.VITE_IMG_PATH + currentSong.song}
        ></audio>
        <nav className="player">
          {/* <PlayerDetails song={props.songs[props.currentSongIndex]} /> */}
          {/* <PlayerDetails song={props.songs._id} /> */}
          <PlayerDetails song={currentSong} />
          <PlayerControl
            skipSong={skipSong}
            isMute={isMute}
            setMute={setMute}
            time={time}
            duration={duration}
            audioEl={audioEl}
          />
        </nav>
      </>
    );
  }
}

export default Player;
