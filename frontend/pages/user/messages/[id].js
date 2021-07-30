import React from "react";
import DashboardAuth from "../../../layouts/PanelLayout/PanelAuth";
import MessagesContainer from "../../../components/messages/MessagesContainer";
import Messages from "../../../components/messages/Messages";

const chat = () => {
  return (
    <MessagesContainer>
      <Messages />
    </MessagesContainer>
  );
};
chat.Layout = DashboardAuth;
export default chat;
