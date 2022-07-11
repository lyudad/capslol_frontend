import styled from 'styled-components';
import { colors } from 'constants/index';

export const LiveNote = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-items: center;
    right: 3px;
    top: -6px;
    z-index: 100;
    min-width: 14px;
    height: 14px;
    background-color: ${colors.appBarBgr};
    border: 1px solid ${colors.brandColor};
    border-radius: 50%;
    text-align: center;
    overflow: hidden;
`;

export const Value = styled.span`
    margin-left: auto;
    margin-right: auto;
    font-size: 10px;
    font-weight: 800;
    color: red;
`;

export const NavWrapper = styled.span`
    position: relative;
`;
