import React, { useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Form } from "antd";
import Modal from 'react-modal';
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
  Button,
  Error,
  FormPassword,
  StyledSpace,
  TypographyTitle,
} from "./style";
import { useAppDispatch } from "hooks/redux";
import axios from "axios";
import { resetPassword } from "redux/reducers/passwordSlice";
import { IPassword } from "./interfaces";
import { colors } from "constants/index";

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onReset = (): void => {
    form.resetFields();
  };

  const enterLoading = (): void => {
    setLoading(true);
  };

  const onFinish = async (values: IPassword): Promise<void> => {
    enterLoading();
    if (values.password === values.confirmPassword) {
      const { data } = await axios.patch(
        "http://localhost:3000/password/changePassword",
        {
          user: {
            id: params.get("token"),
            password: values.confirmPassword,
          },
        }
      );
      dispatch(resetPassword(data));
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
    <>
    <Wrapper>
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
          rules={[
            {
              required: true,
              message: `${t("ResetPage.passwordTitle.error")}`,
              validator: (_, value) => {
                if (
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
                ) {
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
            placeholder={t("ResetPage.passwordTitle.placeholder")}
          />
        </FormItem>

        <FormItem
          label={t("ResetPage.conPasswordTitle.item")}
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: `${t("ResetPage.conPasswordTitle.error")}`,
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
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Button onClick={closeModal}>x</Button>
        <TypographyTitle color={colors.bgBlack} level={3}>{t("ResetPage.loginText")}</TypographyTitle>
        <NavLink to="/" className="form_link">
            {t("ResetPage.linkText")}
          </NavLink>
      </Modal>
  </>
  );
};

export default ResetPassword;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};