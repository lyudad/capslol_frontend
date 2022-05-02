import * as React from "react";
import { useTranslation } from "react-i18next";
import AuthMessage from "./AuthMessage";
import AuthGoogle from "./AuthGoogle";
import SubmitButton from "./SubmitButton";
import SignIn from "components/AuthForm/SignIn";
import SignUp from "components/AuthForm/SignUp";
import { StyledForm, Wrapper } from "components/UI";

type FormValues = {
  firstName: string,
  lastName: string,
  email: string,
  password?: string,
}

interface IAuthFormProps {}

const AuthForm: React.FC<IAuthFormProps> = () => {
  const [hasLogin, setHasLogin] = React.useState(true);
  const [form] = StyledForm.useForm<FormValues>();
  const { t: translator } = useTranslation();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values : FormValues) => {
    console.log(values)
    onReset()
  }
  return (
    <Wrapper>
      <StyledForm
        form={form}
        onFinish={(values) => onFinish(values as FormValues)}
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        {hasLogin ? (
          <SignIn translator={translator} />
        ) : (
          <SignUp translator={translator} />
        )}

        {hasLogin ? (
          <SubmitButton translator={translator} message="AuthForm.signIn" />
        ) : (
          <SubmitButton translator={translator} message="AuthForm.signUp" />
        )}
        {hasLogin ? (
          <AuthMessage
            setValue={setHasLogin}
            translator={translator}
            leftText="AuthForm.dontHaveAccount"
            rightText="AuthForm.registerNow"
          />
        ) : (
          <AuthMessage
            setValue={setHasLogin}
            translator={translator}
            leftText="AuthForm.haveAccount"
            rightText="AuthForm.login"
          />
        )}
            {hasLogin ? (
              <AuthGoogle
                text="Sign  in use Google"
                href="/google"
                translator={translator}
              />
            ) : (
              <AuthGoogle
                text="Sign  up use Google"
                href="/google"
                translator={translator}
              />
            )}
      </StyledForm>
    </Wrapper>
  );
};

export default AuthForm;
