import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import CardSkeleton from "../components/CardSkeleton";
// import songs from "../components/songs";
function Home() {
  const [songs, setSongs] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      isLoading(true);

      const res = await axios.get("http://localhost:5000/api/product/popular", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setSongs(res.data);
      isLoading(false);
    };
    const getRecommed = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/product/recommend",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setRecommend(res.data);
    };
    getData();
    getRecommed();
  }, []);

  return (
    <>
      <div className="all_songs">
        <h2 className="pb-3">Popular Songs</h2>

        <div className="d-flex flex-row flex-wrap justify-content-center">
          {loading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
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
      <div className="recommend">
        <h2 className="py-3">Recommeded Songs</h2>
        <div className="d-flex flex-row flex-wrap justify-content-center">
          {loading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            recommend.map((value, index) => {
              return (
                <Card
                  path={value.item._id}
                  title={value.item.title}
                  artist={value.item.artist}
                  image={value.item.image}
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

export default Home;
