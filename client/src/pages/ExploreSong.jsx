import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ExploreSong = () => {
  window.scrollTo(0, 0);
  const [data, setData] = useState({});
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/product//explore/get/${id}`
        );
        if (res.status === 200) {
          setData(res.data);
        } else {
          navigate("/");
        }
      } catch (err) {
        navigate("/");
        // console.log(err);
      }
    };
    const getExplore = async () => {
      const res = await axios.post(
        "http://localhost:5000/api/product/explore",
        { id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSongs(res.data);
    };
    getData();
    getExplore();
  }, [id]);
  return (
    <>
      <img src="img/music.jpg" width={500} alt="this is music" />
      <h3>{data.title}</h3>
      <h4>{data.genre}</h4>
      <h4>{data.artist}</h4>
      <h4>{data.duration}</h4>
      <h4>{data.popularity}</h4>
      <div>
        <h2>Explore</h2>
        <div className="d-flex flex-row flex-wrap justify-content-center pt-3">
          {songs.map((value, index) => {
            return (
              <Link
                to={"/explore/" + value._id}
                className="bg-dark m-2 p-4"
                style={{ height: "200px", width: "250px" }}
                key={index}
              >
                <h5>{value.title}</h5>
                <h6 className="text-muted">{value.artist}</h6>
                <h6 className="text-muted">{value.genre}</h6>
                <h6 className="text-muted">{value.duration}</h6>
                <h6 className="text-muted">{value.popularity} views</h6>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ExploreSong;
