import styled from "styled-components";
import { colors } from "constants/index";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0px 24px;
`;

export const Title = styled.h4`
  color: ${colors.testPageColor};
`;
