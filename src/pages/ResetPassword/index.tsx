import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  StyledForm,
  FormInput,
  FormButton,
  PwrButton,
  FormLink,
  Wrapper,
} from "pages/ForgotPassword/styles";
import { Error, Star, StyledSpace, Title, TypographyTitle } from "./style";

const ResetPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const onReset = (): void => {
    form.resetFields();
  };

  const enterLoading = (): void => {
    setLoading(true);
  };

  const onFinish = (): void => {
    if (password === confirmPassword) {
      onReset();
      enterLoading();
      navigate("/");
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Wrapper>
      <TypographyTitle level={3}>Reset Password</TypographyTitle>
      <StyledForm
        name="normal_login"
        className="form"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <StyledSpace>
          <div>
            <div className="titles">
              <Star>*</Star>
              <Title>Password:</Title>
            </div>
            <FormInput.Password
              placeholder="Your password"
              minLength={8}
              maxLength={16}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <div className="titles">
              <Star>*</Star>
              <Title>Confirm Password:</Title>
            </div>
            <FormInput.Password
              placeholder="Confirm your password"
              value={confirmPassword}
              minLength={8}
              maxLength={20}
              onChange={(e) => setConfirmPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>

          {error ? <Error>Passwords do not match, please try again</Error> : ""}
        </StyledSpace>

        <FormButton>
          <PwrButton
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Submit
          </PwrButton>
        </FormButton>
        <FormLink>
          <NavLink to="/" className="form_link">
            Back to Login?
          </NavLink>
        </FormLink>
      </StyledForm>
    </Wrapper>
  );
};

export default ResetPassword;
