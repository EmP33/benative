import React from "react";
import { useAppSelector } from "../../lib/hooks";
import { useNavigate } from "react-router-dom";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// Components
import { Card, CardContent, Typography } from "@mui/material";

const FlahcardsSwiper = () => {
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.data.data);

  return (
    <Swiper slidesPerView={"auto"} spaceBetween={15} className="mySwiper">
      {data.data.categories &&
        Object.values(
          // @ts-ignore
          Object.values(data?.data?.categories).find(
            (cat: any) => cat.title === "Fiszki"
          )?.sets
        ).map((set: any) => (
          <SwiperSlide key={set.id}>
            <CardContent
              sx={{ textAlign: "center", p: 0 }}
              onClick={() =>
                navigate(`/dashboard/categories/flash-cards/set/${set.id}`)
              }
            >
              <Card
                sx={{
                  p: 1,
                  pb: 3,
                  pt: 3,
                  background: "var(--color-base-light)",
                  color: "var(--color-white)",
                  cursor: "pointer",
                  "&:hover": {
                    filter: "brightness(90%)",
                  },
                  margin: "0 auto",
                }}
              >
                <Typography variant="h6">{set.title}</Typography>
                <Typography variant="body1" sx={{ mt: 1, color: "#aaa" }}>
                  {set.words.length}{" "}
                  {set.words.length === 1
                    ? "pojęcie"
                    : set.words.length > 1 && set.words.length < 5
                    ? "pojęcia"
                    : "pojęć"}
                </Typography>
              </Card>
            </CardContent>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default FlahcardsSwiper;
