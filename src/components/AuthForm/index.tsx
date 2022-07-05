import * as React from 'react';
import { useTranslation } from 'react-i18next';
import SignUp from 'components/AuthForm/SignUp';
import { StyledForm, Wrapper } from 'components/UI';
import { useNavigate } from 'react-router-dom';

import { message, notification } from 'antd';
import {
    useCreateUserMutation,
    useLazySignUpUseGoogleQuery,
} from 'store/apis/auth';
import { Paths } from 'router/paths';
import { RequestHeader } from 'constants/request.constants';
import {
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from 'react-google-login';
import { setCredentials } from 'store/slices/auth/auth.slice';
import { useDispatch } from 'react-redux';
import SubmitButton from './SubmitButton';
import AuthGoogle from '../AuthGoogle';
import AuthMessage from './AuthMessage';

type FormType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    comfirm: string;
};

const AuthForm: React.FC = () => {
    const [form] = StyledForm.useForm<FormType>();
    const { t: translator } = useTranslation();
    const [createUser] = useCreateUserMutation();
    const [createGoogleUser] = useLazySignUpUseGoogleQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values: FormType): Promise<void> => {
        try {
            await createUser(values).unwrap();

            notification.open({
                message: translator('AuthGoogle.welcomeMessage'),
            });

            navigate(Paths.CONFIRM_EMAIL);
        } catch (error) {
            if ('data' in error) {
                message.error(error.data.message);
            }
            if ('error' in error) {
                message.error(error.status);
            }
        }
    };

    const handleLogin = async (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ): Promise<void> => {
        try {
            if (RequestHeader.ACCESS_TOKEN in response) {
                const authResponse = await createGoogleUser(
                    response.tokenId
                ).unwrap();
                dispatch(setCredentials(authResponse));

                notification.open({
                    message: translator('AuthGoogle.welcomeMessage'),
                });

                navigate(Paths.SELECT_ROLE);
            }
        } catch (error) {
            if ('data' in error) {
                message.error(error.data.message);
            }
            if ('error' in error) {
                message.error(error.status);
            }
        }
    };

    const handleFailure = (): void => {
        message.error(translator('AuthGoogle.loginFail'));
    };
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
                <SubmitButton
                    translator={translator}
                    message="AuthForm.signUp"
                />
                <AuthMessage
                    href="/"
                    translator={translator}
                    leftText="AuthForm.haveAccount"
                    rightText="AuthForm.login"
                />
                <AuthGoogle
                    buttonText="AuthGoogle.signUpMessage"
                    onSuccess={handleLogin}
                    onFailure={handleFailure}
                />
            </StyledForm>
        </Wrapper>
    );
};

export default AuthForm;
