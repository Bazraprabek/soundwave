import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import CardSkeleton from "../components/CardSkeleton";

function Search() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState();
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      isLoading(true);
      const res = await axios.get(`http://localhost:5000/api/product/fetch`);
      setSongs(res.data);
      isLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      <div className="search pb-4">
        <div className="form">
          <i className="fa fa-search"></i>
          <input
            type="text"
            className="form-control form-input"
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
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
