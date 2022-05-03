import styled from "styled-components";
import { colors } from "constants/index";

const { textGreen, bgBlack } = colors;

export const Button = styled.button`
  border: none;
  color: ${bgBlack};
  border: none;
  color: black;
  background: none;
  font-size: 20px;
  margin-bottom: 4px;
  margin-right: auto;
  cursor: pointer;
  transition: all 0.4s linear;
  &:hover {
    color: ${textGreen};
  }
`;
