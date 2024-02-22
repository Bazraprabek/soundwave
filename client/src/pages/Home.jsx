import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";
import { axiosInstance } from "../utils/axois";
// import songs from "../components/songs";
function Home() {
  const [songs, setSongs] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      isLoading(true);

      const res = await axiosInstance.get("/api/product/popular");
      setSongs(res.data);
      isLoading(false);
    };
    const getRecommed = async () => {
      const res = await axiosInstance.get("/api/product/recommend");
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
          ) : songs.length > 0 ? (
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
          ) : (
            "No Songs Available"
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
          ) : recommend.length > 0 ? (
            recommend.map((value, index) => {
              return (
                <Card
                  path={value.item._id}
                  title={value.item.title}
                  artist={value.item.artist}
                  image={value.item.image}
                  key={index}
                  index={index}
                  score={value.score}
                />
              );
            })
          ) : (
            "No Recommend Songs"
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
