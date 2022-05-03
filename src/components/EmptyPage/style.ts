import styled from "styled-components";
import { colors } from "constants/index";

export const WelcomePageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${colors.homeBgr};
  background-image: url(./images/bg-image.png);
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 30px 20px;
  border: 1px solid ${colors.brandColor};
  background-color: rgba(0, 0, 0, 0.8);
`;

export const Title = styled.h1`
  text-align: center;
  color: ${colors.textWhite};
`;

export const Button = styled.div`
  background: ${colors.brandColor};
  color: ${colors.textWhite};
  align-self: center;
  text-align: center;
  padding: 10px;
`;





