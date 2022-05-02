import { colors, fonts } from "constants/index";
import styled from "styled-components";

export const StyledLink = styled.a`
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
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    background-image: url(./icons/google.svg);
    background-size: contain;
    background-repeat: no-repeat;
  }
`;
