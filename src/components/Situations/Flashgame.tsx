import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Redux Store
import { useAppSelector } from "../../lib/hooks";
// Components
import { Box, Typography, CircularProgress } from "@mui/material";
import SectionHeader from "../UI/SectionHeader";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar } from "swiper";
// Types
import { SituationLessonType, SituationWordType } from "../../data.types";

const Flashgame = () => {
  const params = useParams();
  const data = useAppSelector((state) => state.data.data);
  const [currentSet, setCurrentSet] = useState<SituationLessonType | null>(
    null
  );
  const [setsWords, setSetsWords] = useState<SituationWordType[]>([]);
  console.log(currentSet, setsWords);

  const rotateCardHandler = (w: SituationWordType) => {
    //@ts-ignore
    setSetsWords((prev) => {
      if (prev && setsWords) {
        return prev.map((word: SituationWordType) => ({
          word: word.word,
          translation: word.translation,
          active:
            word.translation === w.translation
              ? // @ts-ignore
                setsWords.find((word) => word.translation === w.translation)
                  .active
                ? false
                : true // @ts-ignore
              : setsWords.find((wo) => wo.translation === word.translation)
                  .active
              ? true
              : false,
        }));
      }
    });
  };

  useEffect(() => {
    if (data?.data?.categories) {
      setCurrentSet(
        // @ts-ignore
        Object.values(data.data.categories).find(
          (cat: any) => cat.title === "Sytuacje"
        ).lessons[params.lessonID]
      );
      setSetsWords(
        // @ts-ignore
        Object.values(data.data.categories).find(
          (cat: any) => cat.title === "Sytuacje"
        ).lessons[params.lessonID].words
      );
    }
  }, [data?.data?.categories]);

  return (
    <Box>
      <Box sx={{ mt: 1 }}>
        <SectionHeader title={currentSet?.title} />
      </Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          height: "88vh",
        }}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          scrollbar={{
            hide: true,
          }}
          modules={[Scrollbar]}
          className="mySwiper"
        >
          {setsWords?.length ? (
            setsWords.map((word: any, i: number) => (
              <SwiperSlide key={i}>
                <Box
                  onClick={() => rotateCardHandler(word)}
                  sx={{
                    position: "realtive",
                    cursor: "pointer",
                    width: "100%",
                    height: "60vh",
                    transition: ".5s ease-in-out",
                    transformStyle: "preserve-3d",
                    background: "linear-gradient(45deg,#22222f,#232331)",
                    borderRadius: 5,
                    mb: 3,
                    transform: word.active ? "rotateY(0.5turn)" : "",
                    filter: "blur(200%)",
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
                    <Typography variant="h6" sx={{ fontSize: 23 }}>
                      {typeof word.word === "string" ? word.word : word.word[0]}
                    </Typography>
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
                    <Typography variant="h6">{word.translation}</Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))
          ) : (
            <CircularProgress />
          )}
        </Swiper>
      </Box>
    </Box>
  );
};

export default Flashgame;
