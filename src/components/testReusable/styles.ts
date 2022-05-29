import styled from 'styled-components';
import { colors } from 'constants/index';

export const Wrapper = styled.div`
    position: relative;
    width: 480px;
    height: 550px;
    margin-left: auto;
    margin-right: auto;
    background-repeat: no-repeat;
    background-size: contain;
`;

export const Title = styled.h2`
    position: absolute;
    width: 480px;
    top: 188px;
    text-align: center;
    color: ${colors.testReusableColor};
`;
