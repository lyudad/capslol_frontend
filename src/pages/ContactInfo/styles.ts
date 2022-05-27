import { Avatar } from 'antd';
import styled from 'styled-components';
import {
    CheckCircleOutlined,
    CloseOutlined,
    EditOutlined,
    SaveOutlined,
} from '@ant-design/icons';
import { colors } from 'constants/index';
import { IProps } from './interfaces';

export const Wrapper = styled.div`
    padding: 50px 0;
`;

export const TitleGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${(props: IProps) => props.justify};
    margin-bottom: ${(props: IProps) => props.mb}px;
`;

export const Title = styled.h3`
    color: ${colors.navColor};
    font-weight: 600;
    margin-bottom: 0;
    font-size: ${(props: IProps) => props.fs}px;
`;

export const Block = styled.div`
    display: flex;
    justify-content: center;
`;

export const Card = styled.div`
    background: ${colors.bgBlack};
    width: 500px;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid ${colors.textWhiteGrey};
`;

export const CardInfo = styled.div`
    margin-bottom: 25px;
`;

export const Label = styled.h5`
    color: ${colors.labelText};
    opacity: 0.8;
    font-size: 16px;
    margin-bottom: 5px;
`;

export const StyledAvatar = styled(Avatar)`
    margin-right: 15px;
`;

export const Icon = styled(CheckCircleOutlined)`
    color: ${colors.textGreen};
    font-size: 20px;
    cursor: pointer;
`;

export const IconNotFound = styled(CloseOutlined)`
    color: ${colors.textWhiteRed};
    font-size: 20px;
    cursor: pointer;
`;

export const EditIcon = styled(EditOutlined)`
    color: ${colors.testReusableColor};
    font-size: 20px;
    padding-right: 20px;
    cursor: pointer;
`;

export const SaveIcon = styled(SaveOutlined)`
    color: ${colors.proposalGreen};
    font-size: 20px;
    padding-right: 20px;
    cursor: pointer;
`;

export const Circle = styled.div`
    background: linear-gradient(
        90deg,
        ${colors.hslaCircleRed} 0%,
        ${colors.hslaCircleBlue} 100%
    );
    border-radius: 5px;
    color: ${colors.navColor};
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    padding: 3px;
    width: 60%;
`;

export const StyledInput = styled.input`
    color: ${colors.black};
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 0 5px;
    &:hover {
        border: 1px solid ${colors.textGreen};
    }
    &:focus,
    &:active {
        outline: 0;
        box-shadow: ${colors.textGreen} 0px 0px 8px 2px,
            ${colors.textGreen} 0px 0px 0px 1px;
        border: none;
    }
`;
