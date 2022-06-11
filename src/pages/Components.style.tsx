import styled from "styled-components";
import TextField from "@mui/material/TextField";

export const GoBackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-white);
  outline: none;
  background: transparent;
  color: var(--color-white);
  border-radius: 10px;
  height: 40px;
  width: 40px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  & > svg {
    font-size: 26px;
  }
`;

export const CSSTextField = styled(TextField)`
  & label {
    color: #86868f;
  }
  & label.Mui-focused {
    color: #86868f;
  }
  & .MuiInput-underline:after {
    border-bottom-color: #fff;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #48484d;
      color: #fff;
    }
    &:hover fieldset {
      border-color: #48484d;
    }
    &.Mui-focused fieldset {
      border-color: #48484d;
    }
  }
`;
