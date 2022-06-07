import styled from 'styled-components';
import { colors } from 'constants/index';
import { Button } from 'antd';

export const Page = styled.section`
    padding: 1px 12px;
    min-height: 100vh;
    width: 100%;
    background-color: ${colors.homeBgr};
    background-image: url(./images/bg-image.png);
    background-repeat: no-repeat;
`;

export const ProfileContainer = styled.section`
    margin-right: auto;
    margin-left: auto;
    margin-top: 80px;
    width: 800px;
    padding: 8px 12px;
    padding-bottom: 22px;
    border: 1px solid ${colors.signUpForm};
    background-color: ${colors.formWrapperBgr};
    color: ${colors.signUpFormColor};
    position: relative;
`;

export const TitleEmpty = styled.h1`
    display: flex;
    width: 250px;
    font-size: x-large;
    margin-left: auto;
    margin-right: auto;
    margin-top: 14px;
    margin-bottom: 20px;

    color: ${colors.navColor};
`;
export const Title = styled.h1`
    font-size: x-large;
    margin-top: 8px;
    margin-left: 15px;
    color: ${colors.navColor};
`;
export const Sections = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    margin-top: 8px;
    margin-left: 25px;
    color: ${colors.navColor};
`;
export const SectionsExperience = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    padding-top: -15px;
    margin-top: 0px;
    margin-left: 25px;
    color: ${colors.navColor};
`;

export const Description = styled.span`
    font-size: 18px;
    margin-top: 15px;
    margin-left: 35px;
    color: ${colors.titleOfSectionsProfile};
`;
export const Avatar = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    top: 0;
    right: 0;
    margin-top: 15px;
    margin-right: 15px;
`;
export const ButtonSet = styled(Button)`
    display: flex;
    background: none;
    border: 1px solid white;
    color: #fff;
    margin-top: 10px;
    margin-bottom: 12px;
    justify-content: center;
    :hover {
        background: ${colors.black};
        border: 1px solid #4caf50;
        color: ${colors.brandColor};
    }
    :focus {
        background: ${colors.brandColor};
        border: 1px solid ${colors.brandColor};
        color: ${colors.black};
    }
`;
export const ButtonDel = styled(Button)`
    display: flex;
    background: none;
    border: none;
    color: #fff;
    margin-top: 10px;
    margin-bottom: 12px;
    justify-content: center;
    :hover {
        background: ${colors.brandColor};
        color: ${colors.black};
    }
    :focus {
        background: none;
        border: 1px solid ${colors.brandColor};
        color: ${colors.black};
    }
`;
