import styled from 'styled-components';
import { colors, fonts } from 'constants/index';

export const Page = styled.div`
    padding: 78px 12px 12px 12px;
    width: 100%;
`;

export const Title = styled.h1`
    color: ${colors.brandColor};
`;

export const JobsContainer = styled.div`
    padding-top: 16px;
    border-top: 1px solid ${colors.brandColor};
`;

export const ListContainer = styled.div`
    width: 70vw;
    height: 100vh;
    border-right: 1px solid ${colors.brandColor};
`;

export const JobsList = styled.ul`
    padding-right: 12px;
    list-style: none;
    padding-left: 0;
    margin: 0;
`;

export const StyledButton = styled.button`
    padding: 0;
    margin-bottom: 8px;
    background: none;
    border: none;
    border-bottom: 1px solid ${colors.appBarBrd};
    cursor: pointer;
`;

export const OneOfferCard = styled.li`
    padding: 8px;
    background-color: ${colors.appBarBgr};
    border-bottom: 1px solid ${colors.appBarBrd};
`;

export const DateContainer = styled.div`
    text-align: right;
    font-size: 10px;
    color: ${colors.textWhiteGrey};
`;

export const JobTitle = styled.span`
    font-size: ${fonts.jobCardTitleSize};
    font-weight: ${fonts.jobListFontWeight};
    color: ${colors.brandColor};
`;

export const Salary = styled.span`
    margin-left: 8px;
    color: ${colors.textWhite};
    font-weight: ${fonts.jobListFontWeight};
`;

export const Descriptions = styled.p`
    margin-bottom: 0;
    color: ${colors.textWhiteGrey};
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 8px 0 4px 0;
`;

export const ValueBox = styled.div`
    padding: 2px;
`;

export const Field = styled.span`
    color: ${colors.textWhiteGrey};
    font-size: 12px;
`;

export const FieldValue = styled.span`
    color: ${colors.brandColor};
    font-weight: ${fonts.jobListFontWeight};
    font-size: 12px;
    margin-left: 3px;
`;

export const StyledNavBtn = styled.button`
    width: 100px;
    padding: 4px 8px;
    margin-right: 8px;
    text-align: center;
    cursor: pointer;
    border: none;
    color: ${colors.textWhite};
    background-color: ${colors.brandColor};
`;
