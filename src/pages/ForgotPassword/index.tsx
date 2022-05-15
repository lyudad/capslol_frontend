import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { TypographyTitle } from 'pages/ResetPassword/style';
import { colors } from 'constants/index';
import { useConfirmEmailMutation } from 'store/apis/auth';
import { IFormValue } from './interfaces';
import {
    FormButton,
    FormInput,
    FormItem,
    FormLink,
    PwrButton,
    Section,
    StyledForm,
    Wrapper,
} from './styles';
import VerifyEmail from './components/VerifyEmail';

const ForgotPassword: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    const [confirmEmail, { data, isError }] = useConfirmEmailMutation();

    const onReset = (): void => form.resetFields();

    const enterLoading = (): void => setLoading(true);

    const onFinish = async (values: IFormValue): Promise<void> => {
        enterLoading();
        try {
            await confirmEmail(values.email);
            console.log(values);
        } catch (e) {
            message.error(e.data.message);
        }
        onReset();
    };

    return (
        <Section>
            {!(data || isError) && (
                <Wrapper width="340">
                    <TypographyTitle color={colors.textWhite} level={3}>
                        {t('ForgotPage.title')}
                    </TypographyTitle>
                    <StyledForm
                        name="normal_login"
                        className="form"
                        form={form}
                        initialValues={{ remember: true }}
                        onFinish={(values) => onFinish(values as IFormValue)}
                    >
                        <FormItem
                            name="email"
                            label={t('ForgotPage.email.item')}
                            rules={[
                                {
                                    required: true,
                                    message: `${t('ForgotPage.email.error')}`,
                                    type: 'email',
                                },
                            ]}
                        >
                            <FormInput
                                prefix={
                                    <MailOutlined className="site-form-item-icon" />
                                }
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
                                {t('ForgotPage.btnText')}
                            </PwrButton>
                        </FormButton>

                        <FormLink>
                            <NavLink to="/" className="form_link">
                                {t('ForgotPage.linkText')}
                            </NavLink>
                        </FormLink>
                    </StyledForm>
                </Wrapper>
            )}

            {(data || isError) && <VerifyEmail data={data} isError={isError} />}
        </Section>
    );
};

export default ForgotPassword;
