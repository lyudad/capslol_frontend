import React from "react";
import Avatar from "../Avatar";
import { Wrapper } from "./styles";

const ChatListItems: React.FC<any> = ({ active, image, name }) => {
  return (
    <Wrapper>
      <div
        // style={{ animationDelay: `0.${this.props.animationDelay}s` }}
        // onClick={this.selectChat}
        className={`chatlist__item ${active ? active : ""} `}
      >
        <Avatar
          image={image ? image : "http://placehold.it/80x80"}
          // isOnline={this.props.isOnline}
        />

        <div className="userMeta">
          <p>{name}</p>
          <span className="activeTime">32 mins ago</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default ChatListItems;
