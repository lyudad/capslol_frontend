import styled from 'styled-components';
import { colors, fonts } from 'constants/index';

export const NoteBox = styled.div`
    max-width: 80vw;
    padding: 24px;
    margin-top: 12vh;
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
