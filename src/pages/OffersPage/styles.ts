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
    font-size: 24px;
    margin-left: calc(10vw + 15px);
    color: ${colors.brandColor};
`;

export const StyledNavBtn = styled.button<{ isActive: boolean }>`
    width: 120px;
    padding: 4px 8px;
    text-align: center;
    border: none;
    cursor: pointer;
    border-right: 1px solid ${colors.appBarBrd};
    border-left: 1px solid ${colors.appBarBrd};
    font-size: 14px;
    font-style: italic;
    background-color: ${colors.appBarBgr};
    color: ${({ isActive }) =>
        isActive ? colors.brandColor : colors.textWhite};
`;

export const NavBtnIsActive = styled(StyledNavBtn)`
    color: ${colors.brandColor};
`;

export const TopButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;
    padding: 4px 0;
    border-bottom: 1px solid ${colors.appBarBrd};
`;

export const ListWrapper = styled.div`
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

export const List = styled.li`
    list-style: none;
    margin: 0;
    ul {
        margin-bottom: 0;
    }
`;

export const StyledTitleCardButton = styled.button`
    padding: 0;
    margin-bottom: 8px;
    background: none;
    border: none;
    border-bottom: 1px solid ${colors.appBarBrd};
    cursor: pointer;
`;

export const OneCard = styled.div`
    padding: 8px;
    background-color: ${colors.appBarBgr};
    border-bottom: 1px solid ${colors.appBarBrd};
`;

export const DateContainer = styled.div`
    text-align: right;
    font-size: 10px;
    color: ${colors.textWhiteGrey};
`;

export const CardTitle = styled.span`
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

export const StyledCardBtn = styled.button`
    width: 100px;
    padding: 4px 8px;
    margin-right: 8px;
    text-align: center;
    cursor: pointer;
    border: none;
    color: ${colors.textWhite};
    background-color: ${colors.brandColor};
`;

export const StatusValue = styled.span`
    color: ${colors.brandColor};
    font-weight: ${fonts.jobListFontWeight};
    font-size: 18px;
    font-weight: 600;
    margin-left: 8px;
`;
