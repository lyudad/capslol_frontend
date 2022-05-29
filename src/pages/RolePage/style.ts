import { Typography } from 'antd';
import { colors } from 'constants/index';
import styled from 'styled-components';

export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 8px;
    margin-bottom: 8px;
`;

export const StyledButton = styled.div`
    border: 0;
    border-radius: 0.25rem;
    background: ${colors.brandColor} !important;
    color: white;
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.8;
    white-space: nowrap;
    text-decoration: none;
    text-align: center;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem;
    cursor: pointer;
    box-sizing: border-box;
    &:hover {
        border: 1px solid #fff;
    }
`;

export const Title = styled(Typography.Title)`
    color: #fff !important;
    text-align: center;
    margin-top: 16px;
    margin-bottom: 16px;
`;
