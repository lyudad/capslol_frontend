import styled from 'styled-components';
import { colors } from 'constants/index';

export const Wrapper = styled.div`
    background-color: ${colors.appBarBgr};
    form {
        border: 1px solid ${colors.appBarBrd};
        padding: 16px 16px 8px 0;
        label {
            color: #fff !important;
        }
    }
`;
export const Title = styled.h1`
    color: ${colors.brandColor};
    font-size: 2rem;
    border-bottom: 1px solid ${colors.appBarBrd};
`;
