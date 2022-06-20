import styled from 'styled-components';
import { colors, fonts } from 'constants/index';

export const NoteBox = styled.div`
    width: 80vw;
    padding: 12px;
    margin-top: 10vh;
    background-color: ${colors.appBarBgr};
    border: 1px solid ${colors.textGrey};
`;

export const Notification = styled.h1`
    font-weight: ${fonts.jobListFontWeight};
    font-size: ${fonts.jobListTitleSize};
    color: ${colors.brandColor};
    text-align: center;
    margin: 0;
`;
