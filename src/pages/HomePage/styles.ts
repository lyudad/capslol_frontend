import styled from "styled-components";
import { colors } from "constants/index";
export const HomeContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  height: 100vh;
  background-color: ${colors.homeBgr};
  background-image: url(./images/bg-image.png);
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Slogan = styled.p`
  text-align: center;
`;
