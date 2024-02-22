import React from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";

function Library() {
  const { index } = useSelector((state) => state.userData);
  return (
    <>
      <h2 className="pb-3">Library</h2>
      {index.payload.review.length > 0 ? (
        <div className="d-flex flex-wrap">
          {index.payload.review.map((value, index) => {
            console.log(value);
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
          })}
        </div>
      ) : (
        <div className="py-4">No Library found</div>
      )}
    </>
  );
}

export default Library;
