import styled from 'styled-components';
import { colors, fonts } from 'constants/index';

export const Page = styled.div`
    padding: 12px;
    width: 100%;
    min-height: calc(100vh - 64px);
`;

export const Title = styled.h1`
    font-weight: ${fonts.jobListFontWeight};
    font-size: ${fonts.jobListTitleSize};
    color: ${colors.brandColor};
`;

export const TalentsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 16px;
    border-top: 1px solid ${colors.appBarBrd};
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const ListContainer = styled.div`
    border-left: 1px solid ${colors.appBarBrd};
    @media (max-width: 768px) {
        border-left: none;
    }
`;

export const TalentsList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-auto-flow: dense;
    grid-column-gap: 12px;
    grid-row-gap: 10px;
    padding-left: 16px;
    list-style: none;
    margin: 0;
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(300px, 10fr));
        width: 330px;
    }
`;

export const TalentCard = styled.li`
    position: relative;
    padding: 0px 8px 8px 8px;
    background-color: ${colors.appBarBgr};
    border-bottom: 1px solid ${colors.appBarBrd};
    color: ${colors.textWhite};

    :hover {
        box-shadow: inset 0 0 4px 2px ${colors.brandColor};
        transition: all 0.3s ease;
        -webkit-transform: scale(1.04);
        -ms-transform: scale(1.04);
        transform: scale(1.04);
    }
`;

export const FiltersContainer = styled.div`
    @media (max-width: 768px) {
        margin-right: 0px;
    }
    display: flex;
    flex-direction: column;

    padding: 15px;
    margin-right: 16px;
    background-color: ${colors.appBarBgr};
`;
