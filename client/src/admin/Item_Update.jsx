import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import countryList from "../components/country";
import genreList from "../components/genres";

const Item_Manage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSongs] = useState({});
  const [loading, setLoading] = useState(false);

  const [data, setdata] = useState({
    title: song.title,
    country: song.country,
    year: song.year,
    genres: song.genres,
  });

  console.log(song);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/product/fetch");
      if (res) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/product/get/${id}`
        );
        if (res.status === 200) {
          setSongs(res.data);
        } else {
          navigate("/");
        }
      } catch (err) {
        navigate("/songs");
        // console.log(err);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="mb-3">
          <h2 className="text-center">Update song</h2>
          <label htmlFor="title" className="form-label">
            Title*
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            placeholder="Enter Title"
            onChange={handleInput}
            value={data.title}
          />
          <label htmlFor="genres" className="form-label">
            Genres*
          </label>
          <select
            className="form-select"
            name="genres"
            id="genres"
            onChange={handleInput}
          >
            {genreList.map((value) => {
              return (
                <option value={value} key={value}>
                  {value}
                </option>
              );
            })}
          </select>
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <select
            className="form-select"
            name="country"
            id="country"
            onChange={handleInput}
          >
            {countryList.map((value) => {
              return (
                <option value={value.toLowerCase()} defaultValue="Nepal">
                  {value}
                </option>
              );
            })}
          </select>
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <input
            type="number"
            className="form-control"
            name="year"
            id="year"
            placeholder="Enter Year"
            onChange={handleInput}
            value={data.year}
          />
          <br />
          {loading ? (
            <button class="btn btn-primary" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Updating...
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Item_Manage;
