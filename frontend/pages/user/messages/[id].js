import React from "react";
import DashboardAuth from "../../../components/dashboard/DashboardAuth";
import MessagesContainer from "../../../components/dashboard/messages/MessagesContainer";
import Messages from "../../../components/dashboard/messages/Messages";

const chat = () => {
  return (
    <MessagesContainer>
      <Messages />
    </MessagesContainer>
  );
};
chat.Layout = DashboardAuth;
export default chat;
