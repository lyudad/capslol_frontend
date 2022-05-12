import * as React from "react";
import { useTranslation } from "react-i18next";
import SignUp from "components/AuthForm/SignUp";
import { StyledForm, Wrapper } from "components/UI";
import { useNavigate } from "react-router-dom";

import {  message, notification } from 'antd';
import { useDispatch } from "react-redux";
import { setCredentials } from "store/slices/auth/auth.slice";
import { useCreateUserMutation } from "store/apis/auth";
import SubmitButton from "./SubmitButton";
import AuthGoogle from "./AuthGoogle";
import AuthMessage from "./AuthMessage";


type FormType = {
  firstName?: string
  lastName?: string
  email: string
  password: string
  comfirm: string
}


const AuthForm: React.FC = () => {
  const [form] = StyledForm.useForm<FormType>();
  const { t: translator } = useTranslation();
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const onFinish = async (values: FormType) => {
    try {
      const response = await createUser(values).unwrap()
      dispatch(setCredentials(response))

      notification.open({
        message: 'Congratulation!',
        description: 'New User was created!',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });

      navigate('/select-role')

    } catch (error:any) {
      if (error.data.message) {
        message.error(error.data.message);
      }
    }
  }
  return (
    <Wrapper>
      <StyledForm
        form={form}
        onFinish={(values) => onFinish(values as FormType)}
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <SignUp translator={translator} />
        <SubmitButton translator={translator} message="AuthForm.signUp" />
        <AuthMessage
          href="/"
          translator={translator}
          leftText="AuthForm.haveAccount"
          rightText="AuthForm.login"
        />
        <AuthGoogle />
      </StyledForm>
    </Wrapper>
  );
};

export default AuthForm;
