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
            message: translator("AuthForm.enterFirstName"),
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
            message: translator("AuthForm.enterLastName"),
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
            message: translator("AuthForm.checkEmail"),
          },
        ]}
      >
        <Input name="email" placeholder={translator("AuthForm.inputEmail")} />
      </StyledForm.Item>
      <StyledForm.Item
        label={translator("AuthForm.password")}
        name="password"
        rules={[
          { required: true, message: translator("AuthForm.enterPassword") },
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
                new Error(translator("AuthForm.passwordCondition"))
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
            message: translator("confirmPassword"),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(translator("AuthForm.notMatch")));
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
