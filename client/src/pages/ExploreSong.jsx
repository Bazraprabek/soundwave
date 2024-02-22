import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ExploreSong = () => {
  window.scrollTo(0, 0);
  const [data, setData] = useState({});
  const [songs, setSongs] = useState([]);
  const [distances, setDistances] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/product/explore/get/${id}`
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
      setSongs(res.data.song);
      setDistances(res.data.distances);
      console.log(res.data);
    };
    getData();
    getExplore();
  }, [id]);
  return (
    <>
      <div className="d-flex justify-content-center">
        <img
          className="me-3"
          src="/img/music.jpg"
          width={350}
          alt="this is music"
        />
        <div className="info text-start">
          <h4>Title: {data.title}</h4>
          <h5>Genre: {data.genre}</h5>
          <h5>Artisit: {data.artist}</h5>
          <h5>Duration: {data.duration} seconds</h5>
          <h5>Popularity: {data.popularity} rating</h5>
        </div>
      </div>
      <div>
        <h2 className="py-4">Recommend</h2>
        <div className="d-flex flex-row flex-wrap justify-content-center pt-3">
          {songs.map((value, index) => {
            return (
              <>
                <Link
                  to={"/explore/" + value._id}
                  className="bg-dark m-2 p-4"
                  style={{ height: "230px", width: "250px" }}
                  key={index}
                >
                  <h5>{value.title}</h5>
                  <h6 className="text-muted">{value.artist}</h6>
                  <h6 className="text-muted">{value.genre}</h6>
                  <h6 className="text-muted">{value.duration}</h6>
                  <h6 className="text-muted">{value.popularity} rating</h6>
                  <h6 className="text-danger">
                    Distance: {distances[index].toFixed(2)}
                  </h6>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ExploreSong;
