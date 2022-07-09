import { Button } from 'antd';
import styled from 'styled-components';
import { NotificationOutlined } from '@ant-design/icons';
import { colors, fonts } from 'constants/index';

export const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    min-height: 42px;
    padding: 2px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${colors.appBarBrd};
    background-color: ${colors.appBarBgr};
`;

export const NavigationContainer = styled.nav`
    display: flex;
    align-items: center;
    div {
        display: flex;
    }
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
        bottom: -6px;
        display: block;
        width: 100%;
        height: 2px;
        background-color: ${colors.brandColor};
    }
    .navLink::after {
        transform: scaleX(0);
        transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .navLink:hover::after {
        transform: scaleX(1);
        transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    .logoLink {
        margin-right: 24px;
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

export const MessageBtn = styled.button`
    background: transparent;
    color: ${colors.textGreen};
    font-size: 22px;
    height: 35px;
    align-items: center;
    display: flex;
    border: 1px solid ${colors.chatNewMsgBtn};
    border-radius: 50%;
    padding: 0 6px;
    transition: all 0.3s linear;
    margin: 0 0 0 5px;

    &:hover {
        transform: scale(1.1);
        color: ${colors.bgBlack};
        border: 1px solid ${colors.bgBlack};
        background: ${colors.textGreen};
    }
`;

export const NotificationFlex = styled.div`
    display: flex;
    align-items: center;
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
export const BarAvatarImg = styled.div`
    display: block;
    overflow: hidden;
    width: 36px;
    height: 36px;
    margin-right: 8px;
    border-radius: 50%;
    border: 1px solid ${colors.brandColor};
    background-color: ${colors.brandColor};
`;

export const LoggedName = styled.div`
    color: ${colors.navColor};
    span {
        margin: 0 4px;
        font-size: ${fonts.loggedNameSize};
        font-weight: 600;
        color: ${colors.brandColor};
    }
`;

export const LogoutButton = styled(Button)`
    margin-left: 12px;
    cursor: pointer;
    color: ${colors.navColor};
    background-color: ${colors.appBarBgr};
    border: 1px solid ${colors.brandColor};
    border-radius: 12px;
    :hover {
        background-color: ${colors.appBarBrd};
        border: 1px solid ${colors.brandColor};
    }
`;
