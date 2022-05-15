import Avatar from "pages/Chat/ChatList/Avatar";
import React from "react";
import { Wrapper } from "./styles";

const ChatItem: React.FC<any> = ({ user, msg, image }) => {
  return (
    <Wrapper>
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${user ? user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{msg}</div>
          <div className="chat__meta">
            <span>16 mins ago</span>
            <span>Seen 1.03PM</span>
          </div>
        </div>
        <Avatar isOnline="active" image={image} />
      </div>
    </Wrapper>
  );
};

export default ChatItem;
