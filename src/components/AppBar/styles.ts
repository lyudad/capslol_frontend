import styled from 'styled-components';
import { NotificationOutlined, MessageOutlined } from '@ant-design/icons';
import { colors, fonts } from 'constants/index';

export const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    padding: 2px 24px;
    border-bottom: 1px solid ${colors.appBarBrd};
    background-color: ${colors.appBarBgr};
`;

export const NavigationContainer = styled.nav`
    display: flex;
    align-items: center;
    .navLink {
        position: relative;
        padding: 0;
        margin: 0 8px;
        font-size: ${fonts.navFontSize};
        color: ${colors.navColor};
    }
    .navLink.active {
        color: ${colors.brandColor};
    }
    .navLink:hover {
        color: ${colors.brandColor};
    }
    .navLink::after,
    .navLink.active::before {
        content: '';
        position: absolute;
        left: 0px;
        bottom: 0px;
        display: block;
        width: 100%;
        height: 2px;
        background-color: ${colors.brandColor};
    }
    .navLink::after {
        transform: scaleX(0);
        transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .navLink:hover::after,
    .navLink:focus::after {
        transform: scaleX(1);
    }
`;

export const Logo = styled.div`
    .logoLink {
        margin-right: 24px;
        /* font-family: ${fonts.logoFontFamily}; */
        font-weight: ${fonts.logoFontWeight};
        font-size: ${fonts.primeLogoFontSize};
        font-style: italic;
        line-height: ${fonts.logoLineHeight};
        color: ${colors.navColor};
        span {
            color: ${colors.brandColor};
            font-size: ${fonts.logoFontSize};
        }
    }
`;

export const NotificationIcon = styled(NotificationOutlined)`
    color: ${colors.textGreen};
    font-size: 18px;
    position: relative;
`;

export const MessageIcon = styled(MessageOutlined)`
    color: ${colors.textGreen};
    font-size: 18px;
    margin-left: 15px;
`;

export const NotificationFlex = styled.div`
    margin-left: auto;
`;

export const Counter = styled.div`
    width: 5px;
    height: 5px;
    background-color: ${colors.textWhiteRed};
    color: ${colors.textWhite};
    border-radius: 50%;
    padding: 6px;
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 20px;
    right: 54px;
    z-index: 10;
`;
