import styled from "styled-components";
import { colors } from "constants/index";

const { textWhite, homeBgr, bgBlack } = colors;

export const Parent = styled.section`
  position: relative;
  min-height: 14vh;
`;

export const Button = styled.button`
  position: absolute;
  color: white;
  right: 0;
  top: 0;
  border: none;
  color: ${homeBgr};
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.4s linear;
  border-radius: 50%;
  padding: 0px 13px 5px;
  &:hover {
    color: ${textWhite} !important;
    background: ${homeBgr};
  }
`;
