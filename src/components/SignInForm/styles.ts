import styled from 'styled-components';
import { Form, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { fonts, colors } from 'constants/index';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 340px;
    padding: 20px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid ${colors.signUpForm};
    background-color: ${colors.formWrapperBgr};
    color: ${colors.signUpFormColor};
`;
export const StyledForm = styled(Form)`
    .ant-form-item {
        display: flex;
        flex-direction: column;
        align-items: start;
        .ant-form-item-required {
            color: ${colors.signUpFormColor};
        }
        .ant-input {
            width: 300px;
        }
        .ant-input-password {
            width: 300px;
        }
    }
`;

export const ButtonSignIn = styled(Button)`
    width: 300px;
    padding: 4px;
    border: none;
    font-weight: ${fonts.signUpButtonsFontWeight};
    background: ${colors.brandColor} !important;
    color: ${colors.signUpFormColor};
    &[disabled] {
        background: ${colors.brandColor} !important;
        color: ${colors.signUpFormColor} !important;
    }
`;

export const StyledNavLink = styled(NavLink)`
    :hover {
        color: ${colors.brandColor};
    }
    font-weight: ${fonts.signUpButtonsFontWeight};
    color: ${colors.brandColor};
`;

export const ForgotPass = styled(Form.Item)`
    .ant-form-item-control-input-content {
        display: flex;
        justify-content: flex-end;
    }
`;

export const DontAccount = styled.span`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 8px;
    color: #fff !important;
`;
export const WithGoogle = styled.div`
    padding-top: 20px;
    align-items: end;
    p {
        margin-bottom: 6px;
    }

    .ant-btn-default {
        width: 300px;
        font-weight: ${fonts.signUpButtonsFontWeight};
    }
`;
export const GoogleLink = styled.a`
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 32px;
    padding: 4px 15px;
    border: 1px solid ${colors.formBrd};
    font-weight: ${fonts.signUpButtonsFontWeight};
    color: ${colors.signUpFormColor};
    :hover {
        color: ${colors.brandColor};
    }
    ::before {
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 8px;
        background-image: url(./icons/google.svg);
        background-size: contain;
        background-repeat: no-repeat;
    }
`;
