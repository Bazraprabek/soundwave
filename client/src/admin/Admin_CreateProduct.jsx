import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import countryList from "../components/country";
import genreList from "../components/genres";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { index } = useSelector((state) => state.userData);
  const [loading, setLoading] = useState(false);

  const [data, setdata] = useState({
    title: "",
    artist: index.payload.name,
    song: "",
    country: "",
    image: "",
    year: "",
    genres: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const handlesong = (e) => {
    setdata({
      ...data,
      song: e.target.files[0],
    });
  };

  const handleImage = (e) => {
    setdata({
      ...data,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("artist", data.artist);
      formData.append("year", data.year);
      formData.append("genres", data.genres);
      formData.append("country", data.country);
      formData.append("song", data.song);
      formData.append("image", data.image);
      formData.append("uploaded_by", index.payload.email);
      if (data.title && data.artist && data.genres && data.song && data.image) {
        setLoading(true);
        const res = await axios.post(
          "http://localhost:5000/api/product/create",
          formData
        );
        if (res) {
          setLoading(false);
          alert(res.data.msg);
          navigate("/songs");
        }
      } else {
        setLoading(false);
        alert("Please fill all fileds!");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mb-3">
        <h2 className="text-center">Upload song</h2>
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
          <option selected value="">
            Select Genre
          </option>
          {genreList.map((value) => {
            return <option value={value}>{value}</option>;
          })}
        </select>
        <label htmlFor="artist" className="form-label">
          Artist
        </label>
        <input
          readOnly
          type="text"
          className="form-control"
          name="artist"
          id="artist"
          value={index.payload.name}
          onChange={handleInput}
        />
        <label htmlFor="country" className="form-label">
          Country
        </label>
        <select
          className="form-select"
          name="country"
          id="country"
          onChange={handleInput}
        >
          <option selected value="">
            Select Country
          </option>
          {countryList.map((value) => {
            return <option value={value.toLowerCase()}>{value}</option>;
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
        />
        <label htmlFor="image" className="form-label">
          Choose Image*
        </label>
        <input
          type="file"
          className="form-control"
          name="image"
          id="image"
          placeholder=""
          onChange={handleImage}
          accept="image/*"
        />
        <label htmlFor="song" className="form-label">
          Choose Song*
        </label>
        <input
          type="file"
          className="form-control"
          name="song"
          id="song"
          placeholder=""
          onChange={handlesong}
        />
        <br />
        {loading ? (
          <button class="btn btn-primary" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>{" "}
            Loading...
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateProduct;
