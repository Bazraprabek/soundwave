import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faHeartCircleCheck,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { playing } from "../redux/reducer/playerReducer";
import { setIndex } from "../redux/reducer/currentSong";
import Card from "../components/Card";
import { playin } from "../redux/reducer/playing";
import { Skeleton } from "@mui/material";
import CardSkeleton from "../components/CardSkeleton";

function Song() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { index } = useSelector((state) => state.userData);
  const [love, setLove] = useState(false);
  const [data, setData] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, isLoading] = useState(false);

  const handlePlay = () => {
    dispatch(playing());
    dispatch(setIndex(id));
    dispatch(playin());
  };

  const handleLove = async () => {
    try {
      if (love) {
        const res = await axios.post(
          "http://localhost:5000/api/user/review/remove",
          {
            data,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res) {
          setLove(false);
          window.location.reload();
        }
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/user/review/add",
          {
            data,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res) {
          setLove(true);
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    index.payload.review
      .filter((data) => data._id == id)
      .map((value) => {
        if (value) {
          setLove(true);
        } else {
          setLove(false);
        }
      });
    const getData = async () => {
      try {
        isLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/product/get/${id}`
        );
        if (res.status === 200) {
          isLoading(false);
          setData(res.data);
        } else {
          navigate("/");
        }
      } catch (err) {
        navigate("/");
        // console.log(err);
      }
    };
    const getRelatedData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/product/related",
          {
            id,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setSongs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    getRelatedData();
  }, [love, id]);

  return (
    <>
      <div className="song px-4">
        <div className="d-flex">
          {loading ? (
            <>
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
                width={200}
                height={200}
              />
              <div className="details">
                <Skeleton
                  sx={{ bgcolor: "grey.900" }}
                  height={60}
                  width={140}
                />
                <Skeleton
                  sx={{ bgcolor: "grey.900" }}
                  height={40}
                  width={140}
                />
                <Skeleton
                  sx={{ bgcolor: "grey.900" }}
                  height={30}
                  width={140}
                />
                <Skeleton
                  sx={{ bgcolor: "grey.900" }}
                  height={30}
                  width={140}
                />
              </div>
            </>
          ) : (
            <>
              <img
                className="title_img"
                src={import.meta.env.VITE_IMG_PATH + data.image}
                alt={data.title}
              />
              <div className="details">
                <h1>
                  <strong>{data.title}</strong>
                </h1>
                <h5>{data.artist}</h5>
                <h6>{data.genres}</h6>
                <h6>{data.year}</h6>
              </div>
            </>
          )}
        </div>
        <div className="actions">
          <button className="sbtn" onClick={handlePlay}>
            <FontAwesomeIcon icon={faPlay} size="lg" />
          </button>
          <button className="love" onClick={handleLove}>
            <FontAwesomeIcon
              icon={love ? faHeartCircleCheck : faHeart}
              size="3x"
            />
          </button>
        </div>
        <h2 className="text-center">Related Songs</h2>
        <div className="d-flex flex-row flex-wrap">
          {loading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            songs.slice(0, 5).map((value, index) => {
              return (
                <Card
                  path={value._id}
                  title={value.title}
                  artist={value.artist}
                  image={value.image}
                  key={index}
                  index={index}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Song;
