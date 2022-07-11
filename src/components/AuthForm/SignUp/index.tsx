import { Input } from 'antd';
import { StyledForm } from 'components/UI';
import * as React from 'react';

interface ISignUpProps {
    translator: (message: string) => string;
}

const SignUp: React.FC<ISignUpProps> = ({ translator }) => {
    return (
        <>
            <StyledForm.Item
                label={translator('AuthForm.firstName')}
                name="firstName"
                rules={[
                    {
                        required: true,
                        type: 'string',
                        message: translator('AuthForm.enterFirstName'),
                    },
                ]}
            >
                <Input
                    name="firstName"
                    placeholder={translator('AuthForm.firstName')}
                />
            </StyledForm.Item>
            <StyledForm.Item
                label={translator('AuthForm.lastName')}
                name="lastName"
                rules={[
                    {
                        required: true,
                        type: 'string',
                        message: translator('AuthForm.enterLastName'),
                    },
                ]}
            >
                <Input
                    name="lastName"
                    placeholder={translator('AuthForm.lastName')}
                />
            </StyledForm.Item>
            <StyledForm.Item
                label={translator('AuthForm.email')}
                name="email"
                rules={[
                    {
                        required: true,
                        pattern: /^[A-Za-z][A-Za-z0-9]+@[^\s@]+\.[^\s@]+$/,
                        message: translator('AuthForm.checkEmail'),
                    },
                ]}
            >
                <Input
                    name="email"
                    placeholder={translator('AuthForm.inputEmail')}
                />
            </StyledForm.Item>
            <StyledForm.Item
                label={translator('AuthForm.password')}
                name="password"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: translator('AuthForm.enterPassword'),
                    },

                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value) {
                                return Promise.reject(
                                    new Error(
                                        translator('AuthForm.passwordCondition')
                                    )
                                );
                            }

                            const matched = getFieldValue('password').match(
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                            );
                            if (!matched) {
                                return Promise.reject(
                                    new Error(
                                        translator('AuthForm.passwordCondition')
                                    )
                                );
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <Input.Password
                    name="password"
                    placeholder={translator('AuthForm.inputPassword')}
                />
            </StyledForm.Item>
            <StyledForm.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: translator('confirmPassword'),
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error(translator('AuthForm.notMatch'))
                            );
                        },
                    }),
                ]}
            >
                <Input.Password
                    name="confirm"
                    minLength={8}
                    maxLength={20}
                    placeholder={translator('AuthForm.inputPassword')}
                    autoComplete=""
                />
            </StyledForm.Item>
        </>
    );
};

export default SignUp;
