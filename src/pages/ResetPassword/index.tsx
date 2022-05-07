import React, { useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import {
  StyledForm,
  FormButton,
  PwrButton,
  FormLink,
  Wrapper,
  FormItem,
} from "pages/ForgotPassword/styles";
import {
  Error,
  FormPassword,
  StyledSpace,
  TypographyTitle,
  WindowTitle,
  Section,
} from "./style";
import { IPassword } from "./interfaces";
import { colors } from "constants/index";
import { useResetPasswordMutation } from "redux/services/passwordApi/passwordApi";
import ModalWindow from "common/ModalWindow/ModalWindow";
import { Password } from "redux/models/passwordModels/password.model";
import { validatePassword } from "constants/validate";

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [resetPassword, {data, error: dataError, isError}] = useResetPasswordMutation()

  const onReset = (): void => {
    form.resetFields();
  };

  const enterLoading = (): void => {
    setLoading(true);
  };

  const onFinish = async (values: IPassword): Promise<void> => {
    enterLoading();
    if (values.password === values.confirmPassword) {
      const value: Password = {
        token: params.get("token")?.toString(),
        password: values.confirmPassword,
        
      };
      await resetPassword(value);
      setError(false);
      onReset();
      openModal()
    } else {
      setError(true);
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    navigate('/')
  }

  return (
    <Section>
      <Wrapper width="340">
        <TypographyTitle color={colors.textWhite} level={3}>{t("ResetPage.title")}</TypographyTitle>
        <StyledForm
          name="normal_login"
          className="form"
          form={form}
          initialValues={{ remember: true }}
          onFinish={values => onFinish(values as IPassword)}
        >
       
        <StyledSpace>
          <FormItem
            label={t("ResetPage.passwordTitle.item")}
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: `${t("ResetPage.passwordTitle.error")}`,
              },
            ]}
          >
            <FormPassword
              placeholder={t("ResetPage.passwordTitle.placeholder")}
            />
          </FormItem>

          <FormItem
            label={t("ResetPage.conPasswordTitle.item")}
            name="confirmPassword"
            hasFeedback
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: `${t("ResetPage.conPasswordTitle.error")}`,
                validator: (_, value) => {
                  if (validatePassword.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      `${t("ResetPage.passwordTitle.error")}`
                    );
                  }
                },
              },
            ]}
          >
            <FormPassword
              placeholder={t("ResetPage.conPasswordTitle.placeholder")}
            />
            </FormItem>

          {error ? <Error>{t("ResetPage.error")}</Error> : ''}
        </StyledSpace>

        <FormButton>
          <PwrButton
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            {t("ResetPage.btnText")}
          </PwrButton>
        </FormButton>

        <FormLink>
          <NavLink to="/" className="form_link">
            {t("ResetPage.linkText")}
          </NavLink>
        </FormLink>
      </StyledForm>
      </Wrapper>
      
      <ModalWindow 
          modalIsOpen={modalIsOpen} 
          closeModal={closeModal} 
          bg={colors.modalBg} 
          modalBg={colors.modalWindowBg}
      >
        <>
          { 
            data ? 
            <WindowTitle level={3}>{t("ResetPage.loginText")}</WindowTitle> 
            : dataError
          }

          {
            isError && <WindowTitle level={3}>{t("ResetPage.passwordError")}</WindowTitle> 
          }
        
          <NavLink to="/" className="form_link">
            {t("ResetPage.linkText")}
          </NavLink>
        </>
      </ModalWindow>
    </Section>
  );
};

export default ResetPassword;
