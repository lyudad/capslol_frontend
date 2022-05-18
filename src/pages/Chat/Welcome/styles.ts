import styled from "styled-components";
import { colors } from "constants/index";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 65%;
`;

export const WelcomeTitle = styled.h1`
  color: ${colors.textWhite};

  span {
    color: ${colors.proposalGreen};
  }
`;
