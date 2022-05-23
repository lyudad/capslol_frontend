import styled from 'styled-components';
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
