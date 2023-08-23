import React from "react";
import Skeleton from "@mui/material/Skeleton";

const CardSkeleton = () => {
  return (
    <>
      <div
        className="m-2 col-lg-3"
        style={{ width: "190px", height: "243px", borderRadius: "50px" }}
      >
        <Skeleton
          sx={{ bgcolor: "grey.900" }}
          variant="rectangular"
          width={190}
          height={243}
        />
      </div>
    </>
  );
};

export default CardSkeleton;
