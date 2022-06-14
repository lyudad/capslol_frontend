import styled from 'styled-components';
import { Button } from 'antd';
import { colors, fonts, statusOfContract } from 'constants/index';

export const Page = styled.div`
    position: relative;
    padding: 12px;
    width: 100%;
    min-height: calc(100vh - 64px);
`;

export const DateWrapper = styled.div`
    text-align: right;
    font-size: 10px;
    color: ${colors.textWhiteGrey};
`;

export const Title = styled.h2`
    margin-bottom: 4px;
    text-align: left;
    font-weight: ${fonts.jobListFontWeight};
    font-size: 24px;
    margin-left: calc(10vw + 15px);
    color: ${colors.brandColor};
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
    margin-left: 24px;
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

export const FieldStatusValue = styled.span<{ contrStatus: string }>`
    font-weight: ${fonts.jobListFontWeight};
    font-size: 12px;
    margin-left: 3px;
    color: ${({ contrStatus }) => {
        return contrStatus === statusOfContract.OPENED
            ? colors.brandColor
            : colors.textWhiteRed;
    }};
`;

export const StyledCardBtn = styled.button`
    width: 120px;
    padding: 4px 8px;
    margin-right: 8px;
    text-align: center;
    cursor: pointer;
    border: none;
    color: ${colors.textWhite};
    background-color: ${colors.brandColor};
`;

export const StatusValue = styled.span`
    color: ${colors.textWhiteRed};
    font-weight: ${fonts.jobListFontWeight};
    font-size: 18px;
    font-weight: 600;
    margin-left: 8px;
`;

export const ConfirmContainer = styled.div<{ confStatus: boolean }>`
    position: fixed;
    display: ${({ confStatus }) => {
        return confStatus ? 'flex' : 'none';
    }};
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.4);
`;

export const Confirm = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 24px;
    border: 1px solid ${colors.textWhite};
    background-color: rgba(0, 0, 0, 0.8);
    p {
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        color: ${colors.textWhite};
    }
    div {
        display: flex;
        justify-content: space-around;
    }
`;

export const StyledConfirmBtn = styled(Button)`
    border: none;
    background-color: ${colors.brandColor};
`;
