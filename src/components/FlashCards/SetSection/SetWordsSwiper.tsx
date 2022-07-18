import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../lib/hooks";
import { useNavigate } from "react-router-dom";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
// import required modules
import { FreeMode } from "swiper";
// Components
import { Box, CardContent, Typography } from "@mui/material";
// Types
import { FlashCardWordType } from "../../../data.types";

interface Props {
  words: any[];
}

const SetWordsSwiper: React.FC<Props> = ({ words }) => {
  const navigate = useNavigate();
  const [setsWords, setSetsWords] = useState(words);

  useEffect(() => {
    setSetsWords(words);
  }, [words]);

  const rotateCardHandler = (w: FlashCardWordType) => {
    setSetsWords((prev) =>
      prev.map((word: FlashCardWordType) => ({
        concept: word.concept,
        definition: word.definition,
        active:
          word.concept === w.concept
            ? setsWords.find((word) => word.concept === w.concept).active
              ? false
              : true
            : setsWords.find((wo) => wo.concept === word.concept).active
            ? true
            : false,
      }))
    );
  };

  return (
    <Swiper
      slidesPerView={1.5}
      spaceBetween={30}
      freeMode={true}
      modules={[FreeMode]}
      className="mySwiper"
    >
      {setsWords &&
        setsWords.map((word: any, i: number) => (
          <SwiperSlide key={i}>
            <CardContent
              sx={{ textAlign: "center", p: 0 }}
              onClick={() => rotateCardHandler(word)}
            >
              <Box
                sx={{
                  position: "realtive",
                  cursor: "pointer",
                  width: "100%",
                  height: "250px",
                  transition: ".5s ease-in-out",
                  transformStyle: "preserve-3d",
                  background: "var(--color-base-light)",
                  borderRadius: 5,
                  transform: word.active ? "rotateY(0.5turn)" : "",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backfaceVisibility: "hidden",
                    transition: "1s ease-in-out",
                    WebkitBoxReflect:
                      "below 0 linear-gradient(transparent,transparent,rgba(0,0,0,.4))",
                  }}
                >
                  <Typography variant="h6">{word.concept}</Typography>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backfaceVisibility: "hidden",
                    transition: "1s ease-in-out",
                    WebkitBoxReflect:
                      "below 0 linear-gradient(transparent,transparent,rgba(0,0,0,.4))",
                    transform: "rotateY(0.5turn)",
                  }}
                >
                  <Typography variant="h6">{word.definition}</Typography>
                </Box>
              </Box>
            </CardContent>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SetWordsSwiper;
