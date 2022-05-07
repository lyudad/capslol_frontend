import styled from "styled-components";
import { IProps } from "./props";
import { colors } from "constants/index";

const { btnBoxShadow, btnOutline, btnShadow, btnTextShadow } = colors;

export const Wrapper = styled.button`
  color: ${(props: IProps) => props.color};
  text-transform: uppercase;
  font-weight: bold;
  background: ${(props: IProps) => props.bg};
  border-radius: 4px;
  margin-right: ${(props: IProps) => props.mr}px;
  padding: 3px 8px;
  border: 1px solid ${(props: IProps) => props.bg};
  box-shadow: inset 0 0 20px ${btnBoxShadow};
  outline: 1px solid ${btnOutline};
  outline-offset: 0;
  text-shadow: none;
  transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);

  &:hover {
    border: 1px solid;
    box-shadow: inset 0 0 20px ${btnOutline}, 0 0 20px ${btnShadow};
    outline: 1px ${btnBoxShadow};
    outline-offset: 15px;
    text-shadow: 1px 1px 2px ${btnTextShadow};
  }

  &:hover {
    color: ${(props: IProps) => props.bg};
    background: ${(props: IProps) => props.color};
  }
`;
