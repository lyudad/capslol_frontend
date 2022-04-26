import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Form } from "antd";
import { MailOutlined } from "@ant-design/icons";
import {
  FormButton,
  FormInput,
  FormItem,
  FormLink,
  PwrButton,
  StyledForm,
  Wrapper,
} from "./styles";
import { TypographyTitle } from "pages/ResetPassword/style";

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onReset = (): void => {
    form.resetFields();
  };

  const enterLoading = (): void => {
    setLoading(true);
  };

  const onFinish = (values: { email: string } | any): void => {
    onReset();
    enterLoading();
    navigate("/verify_email");
  };

  return (
    <Wrapper>
      <TypographyTitle level={3}>Forgot Password</TypographyTitle>
      <StyledForm
        name="normal_login"
        className="form"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <FormItem
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
              type: "email",
            },
          ]}
        >
          <FormInput
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="email@example.com"
          />
        </FormItem>

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

export default ForgotPassword;
