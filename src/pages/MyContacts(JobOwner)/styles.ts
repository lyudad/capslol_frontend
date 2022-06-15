import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { colors } from 'constants/index';

export const Avatar = styled.div`
    display: inline-block;
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 50%;
    background-color: ${colors.brandColor};
`;

export const StyledImg = styled.img`
    width: auto;
    height: 100%;
    object-fit: cover;
`;

export const Wrapper = styled.div`
    margin-right: 25px;
    position: relative;
`;

export const CustomFileUpload = styled(PlusOutlined)`
    border: 1px solid ${colors.textGreen};
    background: ${colors.textGreen};
    color: ${colors.textWhite};
    border-radius: 50%;
    font-size: 14px;
    padding: 2px;
    cursor: pointer;
    position: absolute;
    bottom: 32px;
    right: 13px;
    transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);
    &:hover {
        transform: scale(1.1);
        border: 1px solid ${colors.textWhite};
        background: ${colors.chatContent};
    }
`;
