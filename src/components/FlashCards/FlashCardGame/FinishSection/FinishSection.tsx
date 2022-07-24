import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
// Redux Store
import { updateSetsWords } from "../../../../store/data-slice";
import { useAppSelector, useAppDispatch } from "../../../../lib/hooks";

// Components
import { Box, Typography, Button } from "@mui/material";
import WordElement from "../../../Dashboard/ProfileSection/RepeatSection/WordElement";
// Types
import { FlashCardSetType, FlashCardWordType } from "../../../../data.types";

interface Props {
  words: any[];
}

const FinishSection: React.FC<Props> = ({ words }) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state?.data?.data);
  const user = useAppSelector((state) => state.user.user);
  // Local State
  const [currentSet, setCurrentSet] = useState<FlashCardSetType | null>(null);
  const [copyOfDataWords, setCopyOfDataWords] = useState<FlashCardWordType[]>(
    []
  );

  useEffect(() => {
    setCurrentSet(
      // @ts-ignore
      Object.values(data.data.categories).find((cat) => cat.title === "Fiszki")
        .sets[params.setID]
    );
  }, [data?.data?.categories]);

  useEffect(() => {
    if (currentSet?.words) {
      setCopyOfDataWords([...currentSet.words]);
    }
  }, [currentSet?.words]);

  useEffect(() => {
    words.map((w) => {
      const wordIndex = copyOfDataWords.findIndex(
        (word) => word.concept === w.concept
      );

      if (w.wasCorrect) {
        copyOfDataWords[wordIndex] = {
          status:
            w.status === "weak"
              ? "average"
              : w.status === "average"
              ? "well"
              : "weak",
          concept: w.concept,
          definition: w.definition,
        };
      } else {
        copyOfDataWords[wordIndex] = {
          status:
            w.status === "weak"
              ? "weak"
              : w.status === "average"
              ? "weak"
              : w.status === "well"
              ? "average"
              : "well",
          concept: w.concept,
          definition: w.definition,
        };
      }
    });
  }, [copyOfDataWords]);

  useEffect(() => {
    if (params.setID && copyOfDataWords.length === words.length) {
      dispatch(
        updateSetsWords(
          user.uid, // @ts-ignore
          Object.values(data.data.categories).find(
            (cat: any) => cat.title === "Fiszki"
          ).id,
          params.setID,
          copyOfDataWords
        )
      );
    }
  }, [copyOfDataWords, params?.setID]);

  return (
    <Box
      sx={{
        mt: 3,
        overflow: "auto",
        height: "78vh",
        "&::-webkit-scrollbar ": {
          display: "none",
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 300, textAlign: "center", mb: 2 }}
      >
        Ukończyłeś tryb powtarzania słówek
      </Typography>
      <Button
        onClick={() => {
          navigate(`/dashboard/categories/flash-cards/set/${params.setID}`, {
            replace: true,
          });
        }}
        sx={{ mt: 1 }}
        variant="outlined"
        fullWidth
        color="success"
      >
        Przejdź Dalej
      </Button>

      {words && (
        <>
          <Typography sx={{ mt: 3, textAlign: "center" }}>
            Słówka które udało się tobie utrwalić
          </Typography>

          {words &&
            words
              .map((word) =>
                copyOfDataWords.find((w) => w.concept === word.concept)
              )
              .map((word, i) => {
                if (word) {
                  return (
                    <WordElement
                      key={i}
                      oldStatus={words[i]}
                      status={word.status}
                      word={word.concept}
                      translation={word.definition}
                    />
                  );
                } else {
                  return "";
                }
              })}
        </>
      )}
    </Box>
  );
};

export default FinishSection;
