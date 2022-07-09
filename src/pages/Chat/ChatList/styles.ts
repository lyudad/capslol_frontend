import styled from 'styled-components';

import { colors } from 'constants/index';

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
    margin-top: 36px;
    padding-top: 6px;
    overflow: auto;
    max-height: calc(100vh - calc(100vh / 2));
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

export const ChatProject = styled.p`
    margin: 0;
    padding: 0;
    color: ${colors.labelText};
    font-weight: 600;
    font-size: 12px;
`;

export const ChatUserTime = styled.span`
    margin: 0;
    padding: 0;
    color: ${colors.chatUserTime};
    font-weight: 400;
    font-size: 12px;
    display: block;
`;

export const StyledRow = styled.div`
    display: flex;
    row-gap: 0px;
    justify-content: space-between;
    min-width: 350px;
    flex: 1;
    align-items: center;
`;

export const NotFoundTitle = styled.div`
    text-align: center;
    color: ${colors.textWhite};
    font-size: 16px;
    font-weight: 600;
`;
