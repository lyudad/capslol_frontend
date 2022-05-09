import { Input } from "antd";
import { StyledForm } from "components/UI";
import * as React from "react";

interface ISignUpProps {
  translator: (message: string) => string;
}

const SignUp: React.FunctionComponent<ISignUpProps> = ({ translator }) => {
  return (
    <React.Fragment>
      <StyledForm.Item
        label={translator("AuthForm.firstName")}
        name="firstName"
        rules={[
          {
            required: true,
            type: "string",
            message: "Please enter your first name.",
          },
        ]}
      >
        <Input
          name="firstName"
          placeholder={translator("AuthForm.firstName")}
        />
      </StyledForm.Item>
      <StyledForm.Item
        label={translator("AuthForm.lastName")}
        name="lastName"
        rules={[
          {
            required: true,
            type: "string",
            message: "Please enter your last name.",
          },
        ]}
      >
        <Input name="lastName" placeholder={translator("AuthForm.lastName")} />
      </StyledForm.Item>
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
        rules={[
          { required: true, message: "Please enter your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                if (!getFieldValue("password")) {
                  return;
                }
                const result = getFieldValue("password").match(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                );
                if (result) {
                  return Promise.resolve();
                }
              }
              return Promise.reject(
                new Error(
                  "password must contain at least one capital letter, one number and length must be minimum 8 symbols"
                )
              );
            },
          }),
        ]}
      >
        <Input.Password
          name="password"
          placeholder={translator("AuthForm.inputPassword")}
        />
      </StyledForm.Item>
      <StyledForm.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          name="confirm"
          minLength={8}
          maxLength={20}
          placeholder={translator("AuthForm.inputPassword")}
          autoComplete=""
        />
      </StyledForm.Item>
    </React.Fragment>
  );
};

export default SignUp;

// <StyledButton type="primary" htmlType="submit" disabled={false}>
// {translator("AuthForm.signUp")}
// </StyledButton>
