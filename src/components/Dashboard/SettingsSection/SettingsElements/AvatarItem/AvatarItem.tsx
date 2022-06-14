import React from "react";
// Redux Store
import { useAppDispatch, useAppSelector } from "../../../../../lib/hooks";
import { updateUsername } from "../../../../../store/user-slice";
// Components
import { Grid, Box } from "@mui/material";
// Assets
import {
  AvatarFive,
  AvatarFour,
  AvatarOne,
  AvatarSix,
  AvatarThree,
  AvatarTwo,
} from "../../../../../assets/avatars";

interface Props {
  icon: string;
}

const AvatarItem: React.FC<Props> = ({ icon }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  return (
    <Grid
      item
      xs={4}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        objectFit: "cover",
      }}
      onClick={() => dispatch(updateUsername(user.displayName, icon))}
    >
      <Box
        sx={{
          width: 100,
          borderRadius: "50%",
          overflow: "hidden",
          cursor: "pointer",

          "&:hover": {
            filter: "brightness(50%)",
          },
        }}
      >
        {icon === "AvatarOne" ? (
          <AvatarOne />
        ) : icon === "AvatarTwo" ? (
          <AvatarTwo />
        ) : icon === "AvatarThree" ? (
          <AvatarThree />
        ) : icon === "AvatarFour" ? (
          <AvatarFour />
        ) : icon === "AvatarFive" ? (
          <AvatarFive />
        ) : (
          <AvatarSix />
        )}
      </Box>
    </Grid>
  );
};

export default AvatarItem;
