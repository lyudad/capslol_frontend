import styled from "styled-components";
import { colors } from "constants/index";

export const Wrapper = styled.div`
  width: 480px;
  height: 550px;
  margin-left: auto;
  margin-right: auto;
  background-image: url(./images/test-img.jpg);
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Title = styled.h1`
  text-align: center;
  color: ${colors.testReusableColor};
`;
