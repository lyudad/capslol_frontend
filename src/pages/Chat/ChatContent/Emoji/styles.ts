import EmojiPicker from 'emoji-picker-react';
import styled from 'styled-components';
import { colors } from 'constants/index';

export const EmojiContainer = styled(EmojiPicker)`
    .emoji-picker-react .emoji-scroll-wrapper {
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
    }
`;
