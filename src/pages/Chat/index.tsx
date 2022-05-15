import React from "react";
import ChatContent from "./ChatContent";
import ChatList from "./ChatList";
import { Wrapper } from "./styles";

const Chat: React.FC = () => {
  return (
    <Wrapper>
      <ChatList />
      <ChatContent />
    </Wrapper>
  );
};

export default Chat;
