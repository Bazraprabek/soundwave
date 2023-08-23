import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Admin_Item = () => {
  const [data, setData] = useState([]);
  const { index } = useSelector((state) => state.userData);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/product/fetch/${index.payload.email}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res) {
          setData(res.data);
        }
      } catch (err) {
        // console.log(err);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Songs</h2>
        <Link className="btn btn-secondary" to="/songs/create">
          Create
        </Link>
      </div>
      <div className="songs mt-3">
        <div className="d-flex flex-row flex-wrap">
          {data.map((value, index) => {
            return (
              <>
                <Link
                  className="card"
                  to={"/songs/update/" + value._id}
                  key={value._id}
                >
                  <img
                    className="card-img-top"
                    src={import.meta.env.VITE_IMG_PATH + value.image}
                    alt={value.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{value.title}</h5>
                    <p className="card-text">{value.artist}</p>
                    <p className="card-text">{value.year}</p>
                  </div>
                  {/* <button>Delete</button> */}
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Admin_Item;
