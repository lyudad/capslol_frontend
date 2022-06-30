import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { colors, fonts } from 'constants/index';

export const WrapperTitle = styled.div`
    font-weight: ${fonts.jobListFontWeight};
    font-size: ${fonts.jobListTitleSize};
    color: ${colors.brandColor};
    text-align: center;
    margin: 0;
`;

export const StyledNavLink = styled(NavLink)`
    font-size: ${fonts.jobListTitleSize};
    color: ${colors.linkColor};
    transition: 4s cubic-bezier(0.39, 0.575, 0.565, 1);
    &:hover {
        text-decoration: underline;
    }
`;
