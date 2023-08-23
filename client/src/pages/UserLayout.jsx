import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { useState } from "react";
import Player from "../components/Player";
// import songs from "../components/songs";
import { useSelector } from "react-redux";
import axios from "axios";

function UserLayout() {
  const { show } = useSelector((state) => state.player);
  const { index } = useSelector((state) => state.currentSong);
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:5000/api/product/fetch");
      setSongs(res.data);
    };
    getData();

    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length + 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
    setCurrentSongIndex(index.payload);
  }, [currentSongIndex, index]);
  return (
    <>
      <Navbar />
      <Sidebar />
      {show ? (
        <Player
          songs={songs}
          currentSongIndex={currentSongIndex || 0}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
        />
      ) : (
        ""
      )}
      <section id="main">
        <Outlet />
      </section>
    </>
  );
}

export default UserLayout;
