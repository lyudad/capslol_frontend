/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { colors } from 'constants/index';
import { EmojiContainer } from './styles';

const Emoji: React.FC<any> = ({ onEmojiClick }) => {
    return (
        <>
            {' '}
            <EmojiContainer
                onEmojiClick={onEmojiClick}
                skinTone={SKIN_TONE_MEDIUM_DARK}
                pickerStyle={{
                    position: 'absolute',
                    bottom: '110px',
                    boxShadow: `0 5px 10px ${colors.black}`,
                    background: `${colors.chatNewMsg}`,
                    border: `1px solid ${colors.chatHeader}`,
                    color: `${colors.black}`,
                }}
                disableSearchBar
            />
        </>
    );
};

export default Emoji;
