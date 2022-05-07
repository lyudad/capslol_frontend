import React from "react";
import { Wrapper } from "./styles";

const Button: React.FC<any> = ({ children, mr, onClick, color, bg }) => {
  return (
    <Wrapper onClick={onClick} mr={mr} color={color} bg={bg}>
      {children}
    </Wrapper>
  );
};

export default Button;
