import styled from 'styled-components';
import { Button, Form, InputNumber, Tooltip } from 'antd';
import { colors, fonts } from 'constants/index';
import TextArea from 'antd/lib/input/TextArea';
import { IProps } from './interfaces';

const {
    bgBlack,
    proposalWhite,
    proposalGreen,
    proposalWhiteGreen,
    textWhite,
    appBarBrd,
    brandColor,
} = colors;

export const Wrapper = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center;
    background-blend-mode: darken;
    min-height: calc(100vh - 42px);
    width: 80vw;
    padding-top: 24px;
`;

export const ProposalCard = styled.div`
    min-height: 20%;
    background: ${bgBlack};
    color: white;
    border: 1px solid ${proposalWhite};
    border-radius: 5px;
    margin-bottom: 30px;
`;

export const Font = styled.p`
    font-family: ${fonts.logoFontFamily}, sans-serif;
    font-size: ${(props: IProps) => props.fs}px;
    color: ${(props: IProps) => props.color};
    padding: 10px 20px;
    margin-bottom: 0;
`;

export const Section = styled.section`
    border-top: 1px solid ${proposalWhite};
    padding: 20px;
`;

export const FormItem = styled(Form.Item)`
    width: 35%;
    border-radius: 5px;
    font-size: 16px;
    padding: 5px 10px;
    .ant-input-affix-wrapper {
        border-radius: 5px;
        font-size: 16px;
        padding: 10px;
    }
`;

export const StyledInput = styled(InputNumber)`
    width: 100%;
    border-radius: 5px;
    font-size: 16px;
    padding: 4px 10px;
`;

export const FontTitle = styled.h6`
    font-family: ${fonts.logoFontFamily}, sans-serif;
    font-size: ${(props: IProps) => props.fs}px;
    color: ${(props: IProps) => props.color};
    margin: 0;
    margin-bottom: 0px;
    padding: 10px 0;
`;

export const Hr = styled.hr`
    margin-top: 18px;
    margin-bottom: 18px;
    border: 0;
    border-top: 1px solid ${proposalWhite};
    height: 0;
    overflow: visible;
`;

export const StyledTooltip = styled(Tooltip)`
    .ant-input-textarea-show-count:after {
        color: ${textWhite};
    }

    textarea.ant-input {
        background: transparent !important;
        color: ${textWhite};
        border-radius: 5px;
    }
`;

export const StyledTextArea = styled(TextArea)`
    background: transparent !important;
    color: ${textWhite};
    border-radius: 5px;
    font-size: 18px;
    &:focus {
        border-color: ${brandColor};
        box-shadow: 0 0 0 2px ${appBarBrd};
        border-right-width: 1px;
        outline: 0;
    }

    &:hover {
        border-color: ${brandColor};
        border-right-width: 1px;
    }
    &:after {
        float: right;
        color: white;
        white-space: nowrap;
        content: attr(data-count);
        pointer-events: none;
        font-size: 14px;
    }
    textarea.ant-input {
        border-radius: 5px;
        font-size: 16px;

        &:focus {
            border-color: ${brandColor};
            box-shadow: 0 0 0 2px ${appBarBrd};
            border-right-width: 1px;
            outline: 0;
        }

        &:hover {
            border-color: ${brandColor};
            border-right-width: 1px;
        }
    }
`;

export const StyledButton = styled(Button)`
    background: transparent;
    color: ${textWhite};
    &:active {
        color: ${textWhite} !important;
        border-color: ${proposalGreen};
        background: ${proposalGreen};
    }

    &:focus,
    &:hover {
        color: ${textWhite};
        border-color: ${proposalWhiteGreen};
        background: ${proposalWhiteGreen};
    }
`;

export const Block = styled.div`
    padding: 20px 0;
`;

export const UploadForm = styled(Form.Item)`
    border: 1px dashed ${brandColor};
    padding: 20px;
    text-align: center;
    .ant-form-item-label > label {
        color: ${textWhite};
    }

    button {
        background: ${proposalGreen};
        border: 1px solid black;
        &:active {
            color: ${textWhite} !important;
            border-color: ${proposalGreen};
            background: ${proposalGreen};
        }

        &:focus,
        &:hover {
            color: ${textWhite}f;
            border-color: ${proposalWhiteGreen};
            background: ${proposalWhiteGreen};
            box-shadow: 0 0 0 2px ${appBarBrd};
        }
    }
`;

export const StyledFormItem = styled(Form.Item)`
    textarea.ant-input {
        font-size: 18px;
    }
`;
