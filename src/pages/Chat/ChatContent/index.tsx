import React from "react";
import Avatar from "../ChatList/Avatar";
import ChatItem from "./ChatItem";
import {
  ChatBody,
  ChatFooter,
  ChatHeader,
  CurrentChatUser,
  MainChat,
  SendNewMessage,
  SendNewMessageBtn,
  SendNewMessageIcon,
  SendNewMessageIconPlus,
  SendNewMessageInput,
  SettingsBtn,
  Wrapper,
} from "./styles";

const ChatContent: React.FC<any> = () => {
  const chatItms = [
    {
      key: 1,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Hi Tim, How are you?",
    },
    {
      key: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I am fine.",
    },
    {
      key: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "What about you?",
    },
    {
      key: 4,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Awesome these days.",
    },
    {
      key: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "Finally. What's the plan?",
    },
    {
      key: 6,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "what plan mate?",
    },
    {
      key: 7,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I'm taliking about the tutorial",
    },
  ];

  return (
    <Wrapper>
      <MainChat>
        <ChatHeader>
          <div>
            <CurrentChatUser>
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              />
              <p>Tim Hover</p>
            </CurrentChatUser>
          </div>

          <div>
            <SettingsBtn>
              <span>...</span>
            </SettingsBtn>
          </div>
        </ChatHeader>
        <ChatBody>
          <div>
            {chatItms.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })}
          </div>
        </ChatBody>
        <ChatFooter>
          <SendNewMessage>
            <SendNewMessageBtn>
              <SendNewMessageIconPlus />
            </SendNewMessageBtn>
            <SendNewMessageInput type="text" placeholder="Write a message..." />
            <SendNewMessageBtn>
              <SendNewMessageIcon />
            </SendNewMessageBtn>
          </SendNewMessage>
        </ChatFooter>
      </MainChat>
    </Wrapper>
  );
};

export default ChatContent;
