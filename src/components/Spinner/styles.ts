import { Spin } from 'antd';
import styled from 'styled-components';
import { colors } from 'constants/index';

export const StyledSpinner = styled(Spin)`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    color: ${colors.brandColor};
    background: ${colors.appBarBgr};

    .anticon {
        font-size: 64px;
    }
`;
