import styled from "styled-components";
import { styled as mStyled } from "@mui/material/styles";
import { LinearProgress } from "@mui/material";
import { linearProgressClasses } from "@mui/material";

export const HeaderButton = styled.button`
  width: 40px;
  height: 40px;
  background: transparent;
  color: #eee;
  border: 1px solid #636384;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    filter: brightness(150%);
  }

  svg {
    font-size: 20px;
  }
`;

export const BorderLinearProgress = mStyled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#303042",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary,
  },
}));
