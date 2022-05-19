import styled from 'styled-components';
import { colors } from 'constants/index';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 65%;
`;

export const WelcomeTitle = styled.h1`
    color: ${colors.textWhite};

    span {
        color: ${colors.proposalGreen};
    }
`;

export const ChatBody = styled.div`
    max-height: calc(100vh - calc(100vh / 2));
    overflow: auto;
    height: 100vh;
    max-width: 100%;
    width: 100%;
    padding: 20px 0 10px 60px;
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
