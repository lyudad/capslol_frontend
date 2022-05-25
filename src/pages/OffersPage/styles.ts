import styled from 'styled-components';
import { colors, fonts } from 'constants/index';

export const Page = styled.div`
    padding: 12px;
    width: 100%;
    min-height: calc(100vh - 64px);
`;

export const Title = styled.h2`
    margin-bottom: 4px;
    text-align: left;
    font-weight: ${fonts.jobListFontWeight};
    /* font-size: ${fonts.jobListTitleSize}; */
    font-size: 24px;
    color: ${colors.brandColor};
`;

export const StyledNavBtn = styled.button`
    width: 120px;
    padding: 4px 8px;
    text-align: center;
    border: none;
    cursor: pointer;
    border-right: 1px solid ${colors.appBarBrd};
    border-left: 1px solid ${colors.appBarBrd};
    font-size: 14px;
    /* font-weight: 600; */
    font-style: italic;
    color: ${colors.textWhite};
    background-color: ${colors.appBarBgr};
`;

export const TopButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;
    padding: 4px 0;
    border-bottom: 1px solid ${colors.appBarBrd};
`;

export const OffersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    padding-top: 16px;
    border-top: 1px solid ${colors.appBarBrd};
`;

export const ListContainer = styled.div`
    width: 80vw;
`;

export const JobsList = styled.ul`
    list-style: none;
    margin: 0;
`;

export const JobCard = styled.li`
    padding: 24px 8px 8px 8px;
    background-color: ${colors.appBarBgr};
    border-bottom: 1px solid ${colors.appBarBrd};
    color: ${colors.textWhite};
`;

export const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    margin-left: 16px;
    background-color: ${colors.appBarBgr};
`;
