import styled from "styled-components";
import { colors, fonts } from "constants/index";
import { NavLink } from "react-router-dom";

export const HomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  background-color: ${colors.homeBgr};
  background-image: url(./images/bg-image.png);
  background-repeat: no-repeat;
  background-size: contain;
  font-size: ${fonts.homeMessageFontSize};
`;

export const HomeTitle = styled.h1`
  margin-bottom: 24;
  font-weight: 700;
  color: ${colors.signUpFormColor};
`;

export const Message = styled.div`
  padding: 20px;
  border: 1px solid ${colors.signUpForm};
  background-color: ${colors.formWrapperBgr};
  text-align: center;
  color: ${colors.signUpFormColor};
`;

export const Name = styled.b`
  color: ${colors.brandColor};
`;

export const StyledNavLink = styled(NavLink)`
  color: ${colors.brandColor};
`;
