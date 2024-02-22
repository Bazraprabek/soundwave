import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Explore = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/product/explore/fetch",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSongs(res.data);
    };
    getData();
  }, []);
  return (
    <div className="explore">
      <h2>Explore</h2>
      <div className="d-flex flex-row flex-wrap justify-content-center pt-3">
        {songs.map((value, index) => {
          return (
            <Link
              to={"/explore/" + value._id}
              className="bg-dark m-2 p-4"
              style={{ height: "300px", width: "250px" }}
              key={index}
            >
              <img src="img/music.jpg" width={200} alt="this is music" />
              <h5>{value.title}</h5>
              <h6 className="text-muted">{value.artist}</h6>
              <h6 className="text-muted">{value.genre}</h6>
              <h6 className="text-muted">{value.duration} seconds</h6>
              <h6 className="text-muted">{value.popularity} rating</h6>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Explore;
