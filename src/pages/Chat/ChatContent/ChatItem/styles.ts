import styled from 'styled-components';
import { colors } from 'constants/index';

export const ChatMsg = styled.div`
    user-select: none;
    word-break: break-word;

    .Declined {
        color: ${colors.decline};
    }

    .Pending {
        color: ${colors.pending};
    }

    .Accepted {
        color: ${colors.accept};
    }

    .title {
        font-size: 16px;
        display: block;
        margin-bottom: 5px;
        font-weight: bold;

        span {
            opacity: 1.4;
            font-weight: 500;
            font-size: 14px;
        }
    }

    .offer,
    .contract,
    .terminated {
        font-size: 17px;
        margin-bottom: 8px;
        text-align: center;
        font-style: italic;
    }

    .offer {
        color: ${colors.pending};
    }

    .contract {
        color: ${colors.textWhite};
    }

    .terminated {
        color: ${colors.decline};
    }

    .Freelancer,
    .JobOwner {
        display: block;
    }

    .Date {
        color: ${colors.textWhiteRed};
    }
`;

export const ChatTime = styled.span`
    font-size: 12px;
    color: ${colors.chatTime};
    user-select: none;
`;

export const ChatMeta = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;

export const ChatItemContent = styled.div`
    background-color: ${colors.chatContent};
    color: ${colors.textWhite};
    padding: 15px;
    border-radius: 10px 10px 0 10px;
    max-width: 50%;
    min-width: 215px;
    margin-right: 20px;
`;

export const ChatItemCard = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-bottom: 15px;
    transition: all 0.3s ease;
    transform: scale(0);
    transform-origin: right;
    animation-name: showIn;
    animation-duration: 0.2s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-timing-function: cubic-bezier(0.88, 0.19, 0.37, 1.11);
    animation-fill-mode: both;
    animation-delay: 0.2s;
    @keyframes showIn {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }

    &.other {
        flex-direction: row-reverse;
        transform-origin: left;
    }

    &.other .chat__item__content {
        background-color: ${colors.bgBlack};
        color: white;
        border-radius: 10px 10px 10px 0;
        max-width: 50%;
        margin-right: 0;
    }
`;

export const ButtonGroup = styled.div`
    padding: 20px 0 0;
`;
