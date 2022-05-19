import { Input, Space, Typography } from 'antd';
import styled from 'styled-components';
import { colors } from 'constants/index';

const { textWhite, textWhiteRed, bgWhiteDark, homeBgr } = colors;
export interface Props {
    color: string;
}

export const Section = styled.section`
    background: ${bgWhiteDark};
    height: 100vh;
`;

export const StyledSpace = styled(Space)`
    display: block;
    width: 300px;
    gap: 20px !important;
    display: flex;
    margin-bottom: 25px;
    flex-direction: column;
    .ant-space-item {
        width: 100%;
    }

    .titles {
        display: flex;
        align-items: center;
        margin-bottom: 13px;
    }
`;

export const TypographyTitle = styled(Typography.Title)`
    color: ${(props: Props) => props.color} !important;
    margin: 0 auto 0.5em;
`;

export const Title = styled.h4`
    color: ${textWhite};
    font-size: 16px;
    margin-bottom: 0;
`;

export const Star = styled.span`
    display: inline-block;
    margin-right: 4px;
    color: ${textWhiteRed};
    font-size: 14px;
    line-height: 1;
`;

export const ErrorBox = styled.div`
    color: ${textWhiteRed};
    position: absolute;
    bottom: 120px;
`;

export const FormPassword = styled(Input.Password)`
    width: 300px;
`;

export const WindowTitle = styled(Typography.Title)`
    margin: 0 auto 1.5em;
    color: ${homeBgr} !important;
`;
