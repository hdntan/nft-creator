import { IconStartHightlight, IconStartNull } from "@/assets/icons";
import React from "react";

const ShowRating = ({ index }: any) => {
  return (
    <>
      {index == 0 ? (
        <IconStartNull />
      ) : index == 1 ? (
        <IconStartHightlight />
      ) : index == 2 ? (
        <>
          <IconStartHightlight />
          <IconStartHightlight />
        </>
      ) : index == 3 ? (
        <>
          <IconStartHightlight />
          <IconStartHightlight />
          <IconStartHightlight />
        </>
      ) : index == 4 ? (
        <>
          <IconStartHightlight />
          <IconStartHightlight />
          <IconStartHightlight />
          <IconStartHightlight />
        </>
      ) : (
        <>
          <IconStartHightlight />
          <IconStartHightlight />
          <IconStartHightlight />
          <IconStartHightlight />
          <IconStartHightlight />
        </>
      )}
    </>
  );
};

export default ShowRating;
