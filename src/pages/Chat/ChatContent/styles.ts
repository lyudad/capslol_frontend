import styled from "styled-components";
import { SendOutlined, PlusOutlined } from "@ant-design/icons";

export const Wrapper = styled.div`
  width: 65%;
`;

export const MainChat = styled.div`
  flex-grow: 1;
  padding: 20px 40px;
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(76, 175, 80, 0.3);
`;

export const CurrentChatUser = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0;
    font-weight: 600;
    color: white;
  }
`;

export const SettingsBtn = styled.button`
  color: #fff;
  border: none;
  background: transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

export const ChatBody = styled.div`
  max-height: calc(100vh - calc(100vh / 2));
  overflow: auto;
  padding: 20px 0 10px;
  &::-webkit-scrollbar {
    transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);
    width: 5px;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 34, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);
    background: rgba(76, 175, 80, 0.3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(33, 122, 34, 0.3);
  }
`;

export const ChatFooter = styled.div`
  padding-top: 30px;
`;

export const SendNewMessage = styled.div`
  background-color: #243d25;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
`;

export const SendNewMessageBtn = styled.button`
  width: 36px;
  height: 36px;
  background-color: #ecefff;
  border: none;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  color: #0f0e0e;
  padding: 0;
  border-radius: 5px;
  line-height: 36px;
  transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);
  &:hover {
    transform: scale(1.2);
  }
`;

export const SendNewMessageInput = styled.input`
  flex-grow: 1;
  padding: 0 15px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: white;
`;

export const SendNewMessageIcon = styled(SendOutlined)`
  display: block;
`;

export const SendNewMessageIconPlus = styled(PlusOutlined)`
  display: block;
`;
