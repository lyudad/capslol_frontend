/* eslint-disable no-unused-expressions */
import React from 'react';
import { Form, Input, message, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLoginMutation, useLazySignInUseGoogleQuery } from 'store/apis/auth';
import { setCredentials } from 'store/slices/auth/auth.slice';
import AuthGoogle from 'components/AuthGoogle';
import { useLazyGetJobsByOwnerQuery } from 'store/apis/jobs';
import { userRole } from 'constants/index';
import { RequestHeader } from 'constants/request.constants';
import {
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from 'react-google-login';
import { Paths } from 'router/paths';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import {
    Wrapper,
    DontAccount,
    StyledForm,
    ForgotPass,
    ButtonSignIn,
    StyledNavLink,
} from './styles';
import { FormValues } from './props';

type FormType = {
    email: string;
    password: string;
};

const SignInForm: React.FC = () => {
    const { t: translator } = useTranslation();
    const [form] = Form.useForm();
    const [loginUser, { isLoading }] = useLoginMutation();
    const [loginGoogleUser] = useLazySignInUseGoogleQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [getJobsByOwner] = useLazyGetJobsByOwnerQuery();

    const onFinish = async (values: FormType): Promise<void> => {
        try {
            const response = await loginUser(values).unwrap();
            dispatch(setCredentials(response));

            const { user } = response.data;

            const ownerJobs = await getJobsByOwner(user.id).unwrap();

            notification.open({
                message: translator('AuthGoogle.comeBackMessage'),
            });

            if (!user.role) {
                navigate(Paths.SELECT_ROLE);
                return;
            }

            if (user.role === userRole.freelancer) {
                navigate(Paths.JOBS);
                return;
            }

            if (user.role === userRole.owner && !!ownerJobs?.length) {
                navigate(Paths.TALENT);
                return;
            }

            if (userRole.owner && !ownerJobs?.length) {
                navigate(Paths.CREATE_JOB_PAGE);
                return;
            }
        } catch (error) {
            if ('data' in error) {
                message.error(error.data.message);
            }
            if ('error' in error) {
                message.error(error.status);
            }
            throw error;
        }
    };

    const handleLogin = async (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ): Promise<void> => {
        try {
            if (RequestHeader.ACCESS_TOKEN in response) {
                const authResponse = await loginGoogleUser(
                    response.tokenId
                ).unwrap();
                dispatch(setCredentials(authResponse));

                notification.open({
                    message: translator('AuthGoogle.comeBackMessage'),
                });

                const { user } = authResponse.data;

                if (!user.role) {
                    navigate(Paths.SELECT_ROLE);
                    return;
                }
                user.role === 'Freelancer'
                    ? navigate(Paths.JOBS)
                    : navigate(Paths.TALENT);
            }
        } catch (error) {
            if ('data' in error) {
                message.error(error.data.message);
            }
            if ('error' in error) {
                message.error(error.status);
            }
            throw error;
        }
    };

    const handleFailure = (): void => {
        message.error(translator('AuthGoogle.loginFail'));
    };

    return (
        <SpinnerWrapper isLoading={isLoading}>
            <Wrapper>
                <StyledForm
                    form={form}
                    onFinish={(values) => onFinish(values as FormValues)}
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label={translator('AuthForm.email')}
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: translator('AuthForm.checkEmail'),
                            },
                        ]}
                    >
                        <Input
                            name="email"
                            placeholder={translator('AuthForm.inputEmail')}
                        />
                    </Form.Item>
                    <Form.Item
                        label={translator('AuthForm.password')}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: translator('AuthForm.enterPassword'),
                            },
                        ]}
                    >
                        <Input.Password
                            name="password"
                            minLength={8}
                            maxLength={20}
                            placeholder={translator('AuthForm.inputPassword')}
                            autoComplete=""
                        />
                    </Form.Item>

                    <ForgotPass>
                        <StyledNavLink to={Paths.FORGOTTEN_PASSWORD}>
                            {translator('AuthForm.forgotPassword')}
                        </StyledNavLink>
                    </ForgotPass>
                    <Form.Item>
                        <ButtonSignIn type="primary" htmlType="submit">
                            {translator('AuthForm.signIn')}
                        </ButtonSignIn>
                    </Form.Item>
                    <DontAccount>
                        {translator('AuthForm.dontHaveAccount')}
                        <StyledNavLink to={Paths.SIGN_UP} className="styled">
                            {translator('AuthForm.registerNow')}
                        </StyledNavLink>
                    </DontAccount>
                    <AuthGoogle
                        onFailure={handleFailure}
                        onSuccess={handleLogin}
                        buttonText={translator('AuthGoogle.signInMessage')}
                    />
                </StyledForm>
            </Wrapper>
        </SpinnerWrapper>
    );
};

export default SignInForm;
