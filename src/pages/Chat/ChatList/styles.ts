import styled from "styled-components";

import { colors } from "constants/index";

export const Wrapper = styled.div`
  width: 35%;
  border: 1px solid ${colors.chatHeader};
  background: ${colors.bgBlack};
  border-radius: 10px;
`;

export const SearchWrap = styled.div`
  background: ${colors.chatSearch};
  border-radius: 5px;
  margin: 20px;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  padding: 10px 15px;
  outline: none;
  width: 80%;
  padding-right: 0;
`;

export const ChatLists = styled.div`
  margin-top: 30px;
  overflow: auto;
  max-height: calc(100vh - calc(80vh / 2));
  &::-webkit-scrollbar {
    transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);
    width: 5px;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.chatScrollTrack};
  }

  &::-webkit-scrollbar-thumb {
    transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);
    background: ${colors.chatHeader};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.chatScrollTrack};
  }
`;
