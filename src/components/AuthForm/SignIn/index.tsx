import { Col, Input, Row } from "antd";
import {
  StyledButton,
  StyledForm,
  StyledNavLink,
  StyledParagraph,
} from "components/UI";
import * as React from "react";
import { Link } from "react-router-dom";
import SocialAuth from "../SocialAuth";

interface ISignProps {
  translator: (message: string) => string;
}

const SignIn: React.FC<ISignProps> = ({ translator }) => {
  return (
    <React.Fragment>
      <StyledForm.Item
        label={translator("AuthForm.email")}
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message:
              "Check if the email you entered is correct our input your email!",
          },
        ]}
      >
        <Input name="email" placeholder={translator("AuthForm.inputEmail")} />
      </StyledForm.Item>
      <StyledForm.Item
        label={translator("AuthForm.password")}
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          name="password"
          minLength={8}
          maxLength={20}
          placeholder={translator("AuthForm.inputPassword")}
          autoComplete=""
        />
      </StyledForm.Item>

      <Row justify="end">
        <Col>
          <StyledNavLink>
            <StyledParagraph color="#4caf50">
              {translator("SignUpForm.forgotPassword")}
            </StyledParagraph>
          </StyledNavLink>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SignIn;
