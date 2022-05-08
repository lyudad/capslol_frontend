import React from "react";
import { StyledContainer } from "./styles";
import { IProps } from "./types";

const Container: React.FC<IProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
