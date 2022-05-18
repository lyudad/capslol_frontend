import styled from 'styled-components';
import { colors, fonts } from 'constants/index';

export const Page = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    width: 100%;
    min-height: calc(100vh - 64px);
`;

export const JobCard = styled.div`
    width: 80vw;
    padding: 12px;
    background-color: ${colors.appBarBgr};
    border: 1px solid ${colors.textGrey};
`;

export const Owner = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 12px;
    font-size: 20px;
    font-weight: 600;
    color: ${colors.brandColor};
    border-bottom: 1px solid ${colors.appBarBrd};
`;

export const AvatarImg = styled.div`
    display: block;
    width: 48px;
    margin-right: 8px;
    border-radius: 50%;
    background-color: ${colors.brandColor};
`;

export const Title = styled.h1`
    font-weight: ${fonts.jobListFontWeight};
    font-size: ${fonts.jobListTitleSize};
    color: ${colors.brandColor};
    border-bottom: 1px solid ${colors.appBarBrd};
`;

export const SubTitle = styled.h2`
    padding-top: 12px;
    font-weight: ${fonts.jobListFontWeight};
    color: ${colors.textWhiteGrey};
    border-top: 1px solid ${colors.appBarBrd};
`;

export const Date = styled.p`
    text-align: right;
    color: ${colors.textWhiteGrey};
`;

export const Value = styled.span`
    font-size: 16px;
    color: ${colors.brandColor};
`;

export const Field = styled.span`
    font-size: 16px;
    font-style: italic;
    color: ${colors.textWhiteGrey};
`;

export const Description = styled.div`
    padding: 12px 0;
    font-size: 18px;
    color: ${colors.textWhiteGrey};
`;

export const OptionContent = styled.div`
    padding: 8px 0 8px 36px;
`;
