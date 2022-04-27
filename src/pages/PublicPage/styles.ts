import styled from "styled-components";
import { colors, fonts } from "constants/index";
import { Button } from "antd";

export const Page = styled.section`
  padding: 1px 12px;
  height: 100vh;
  background-color: ${colors.homeBgr};
  background-image: url(./images/bg-image.png);
  background-repeat: no-repeat;
  background-size: contain;
`;

export const ProfileContainer = styled.section`
  margin-right: auto;
  margin-left: auto;
  margin-top: 80px;
  max-width: 800px;
  padding: 0px 12px;
  padding-bottom: 12px;
  border: 1px solid ${colors.signUpForm};
  background-color: ${colors.formWrapperBgr};
  color: ${colors.signUpFormColor};
  position: relative;
`;

export const Title = styled.h1`
  margin-top: 8px;
  margin-left: 15px;
  color: ${colors.navColor};
`;
export const Sections = styled.h2`
  margin-top: 8px;
  margin-left: 25px;
  color: ${colors.navColor};
`;

export const Description = styled.p`
  font-size: 19px;
  margin-top: 15px;
  margin-left: 35px;
  color: ${colors.titleOfSectionsProfile};
`;
export const Avatar = styled.div`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  margin: 5px;
`;
