import React from "react";
import { useParams } from "react-router-dom";
// Redux Store
import { useAppSelector } from "../../../lib/hooks";

const SetSection = () => {
  const params = useParams();
  const data = useAppSelector((state) => state.data.data);

  if (data?.data?.categories) {
    console.log(
      Object.values(
        // @ts-ignore
        Object.values(data.data.categories).find(
          (cat: any) => cat.title === "Fiszki"
        ).sets
      ).find((set: any) => set.id === params.setID)
    );
  }

  return <div>SetSection</div>;
};

export default SetSection;
