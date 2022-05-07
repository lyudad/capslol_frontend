import React, { useState, useMemo } from 'react';
import { Form, Input } from 'antd';
import { FormValues, Values } from './props';
import { useTranslation } from "react-i18next";
import {
  Wrapper,
  DontAccount,
  WithGoogle,
  GoogleLink,
  StyledForm,
  ForgotPass,
  ButtonSignIn,
  StyledNavLink
} from './styles';
import { useAppDispatch} from 'hooks/redux';
import { useLoginMutation } from 'redux/authApiSlice';
import { setCredentials } from 'redux/reducers/userSlice'; 

const SignInForm: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const memoDisabled = useMemo<boolean>(() => !email || !password, [email, password]);

  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();
  const loginUser = async (value: Values ) => {
    try {
      const userData: any = await login(value).unwrap();
      dispatch(setCredentials(userData));
    } catch(error) {console.log('ERROR:',error)}
  };

  function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = evt.currentTarget;
      switch (name) {
        case 'email':
          setEmail(value);
          break;
        case 'password':
          setPassword(value);
          break;
        default:
          break;
      }
    }

  const onReset = () => {
    form.resetFields();
  };
  
  const onFinish = (values: FormValues) => {
    loginUser({ user: values });
    onReset();
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <Wrapper>
        <StyledForm
          form={form}
          onFinish={values => onFinish(values as FormValues)}
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label={t("SignInForm.email")}
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: '', //'Check if the email you entered is correct our input your email!',
              },
            ]}
          >
            <Input
              name="email"
              placeholder={t("SignInForm.inputEmail")}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item

            label={t("SignInForm.password")}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              name="password"
              minLength={8}
              maxLength={20}
              placeholder={t("SignInForm.inputPassword")}
              autoComplete=""
              onChange={onChange}
            />
          </Form.Item>

          <ForgotPass>
            <StyledNavLink to="/forgotten_password">
              {t("SignInForm.forgotPassword")}
            </StyledNavLink>
          </ForgotPass>
          <Form.Item>
            <ButtonSignIn
              type="primary"
              htmlType="submit"
              disabled={memoDisabled}
            >
              {t("SignInForm.signIn")}
            </ButtonSignIn>
          </Form.Item>
        </StyledForm>
        <DontAccount>
          {t("SignInForm.dontHaveAccount")}
          <StyledNavLink to="/test" className="styled">
              {t("SignInForm.registerNow")}
            </StyledNavLink>
        </DontAccount>
        <WithGoogle>
          <p>{t("SignInForm.signInWith")}</p>
          <GoogleLink href="https:/................./auth/google">
            Google
          </GoogleLink>
        </WithGoogle>
      </Wrapper>
    </div>
  );
};

export default SignInForm;
