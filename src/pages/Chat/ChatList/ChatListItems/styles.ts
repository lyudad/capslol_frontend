import styled from "styled-components";

import { colors } from "constants/index";

export const ChatListItem = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  cursor: pointer;
  padding: 10px 10px 10px 20px;
  transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);
  transform: scale(0);
  animation-name: showIn;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-timing-function: cubic-bezier(0.88, 0.19, 0.37, 1.11);
  animation-fill-mode: both;
  animation-delay: 0.1s;

  @keyframes showIn {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  &:first-child {
    margin-top: 0;
  }

  &:hover,
  &.active {
    background: ${colors.chatNewMsg};
  }
`;

export const ChatUser = styled.p`
  margin: 0;
  padding: 0;
  color: ${colors.textWhite};
  font-weight: 600;
  font-size: 14px;
`;

export const ChatUserTime = styled.span`
  margin: 0;
  padding: 0;
  color: ${colors.chatUserTime};
  font-weight: 400;
  font-size: 12px;
  display: block;
`;
