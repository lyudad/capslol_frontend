import styled from 'styled-components';
import { SendOutlined, PlusOutlined } from '@ant-design/icons';
import { colors } from 'constants/index';

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
    border-bottom: 1px solid ${colors.chatHeader};
`;

export const CurrentChatUser = styled.div`
    display: flex;
    align-items: center;
`;

export const ProjectOwner = styled.h3`
    margin: 0;
    color: ${colors.textWhite};
`;

export const Project = styled.h5`
    margin: 0;
    color: ${colors.labelText};
`;

export const SettingsBtn = styled.button`
    color: ${colors.textWhite};
    border: 1px solid ${colors.proposalGreen};
    background: ${colors.proposalGreen};
    transition: all 0.3s linear;
    cursor: pointer;
    font-size: 13px;
    text-transform: uppercase;
    padding: 2px 4px;
    &:hover {
        transform: scale(1.1);
        color: ${colors.proposalGreen};
        border: 1px solid ${colors.textWhite};
        background: ${colors.textWhite};
    }
`;

export const ChatBody = styled.div`
    max-height: calc(100vh - calc(100vh / 2));
    overflow: auto;
    height: 100vh;
    padding: 20px 0 10px;
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

export const ChatFooter = styled.div`
    padding-top: 30px;
`;

export const SendNewMessage = styled.div`
    background-color: ${colors.chatNewMsg};
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 8px;
`;

export const SendNewMessageBtn = styled.button`
    width: 36px;
    height: 36px;
    background-color: ${colors.chatNewMsgBtn};
    border: none;
    box-shadow: none;
    outline: none;
    cursor: pointer;
    font-size: 16px;
    color: ${colors.textWhite};
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
    color: ${colors.textWhite};
`;

export const SendNewMessageIcon = styled(SendOutlined)`
    display: block;
`;

export const SendNewMessageIconPlus = styled(PlusOutlined)`
    display: block;
`;

export const HourlyRateInput = styled.input`
    margin: 15px 0;
    padding: 4px 10px;
    width: 300px;
    font-size: 16px;
    border: 1px solid ${colors.black};
    border-radius: 5px;
    background: ${colors.homeBgr};
    color: ${colors.textWhite};
    &:focus,
    &:active {
        outline: 0;
    }
`;
