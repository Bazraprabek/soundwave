import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";
import { axiosInstance } from "../utils/axois";

function Search() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState();
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      isLoading(true);
      const res = await axiosInstance.get("/api/product/fetch");
      setSongs(res.data);
      isLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      <div className="search pb-4">
        <div className="form ">
          <i className="fa fa-search"></i>
          <input
            type="text"
            className="form-control form-input m-auto"
            placeholder="Search anything..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="d-flex flex-row flex-wrap justify-content-center mt-3">
          {loading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : songs.length > 0 ? (
            songs
              .filter(
                (data) =>
                  data.title.toLowerCase().includes(search || "") ||
                  data.artist.toLowerCase().includes(search || "")
              )
              .map((value, index) => {
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
    </>
  );
}

export default Search;
