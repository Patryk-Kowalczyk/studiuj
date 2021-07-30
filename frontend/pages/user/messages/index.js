import React from "react";
import DashboardAuth from "../../../layouts/PanelLayout/PanelAuth";
import { Box } from "@material-ui/core";
import MessagesContainer from "../../../components/messages/MessagesContainer";

const index = () => {
  return (
    <MessagesContainer>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
      >
        Wybierz czat z listy z boku
      </Box>
    </MessagesContainer>
  );
};
index.Layout = DashboardAuth;
export default index;
