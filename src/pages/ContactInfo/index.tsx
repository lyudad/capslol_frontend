import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";

import {
  Wrapper,
  TitleGroup,
  Title,
  Block,
  Card,
  Label,
  StyledAvatar,
  CardInfo,
  Icon,
  Circle,
  IconNotFound,
} from "./styles";
import { FormButton, FormItem, PwrButton, StyledForm } from "pages/ForgotPassword/styles";
import { FormPassword } from "pages/ResetPassword/style";
import { colors } from "constants/index";
import { validatePassword } from "constants/validate";
import Button from "common/Button/Button";
import ModalWindow from "common/ModalWindow/ModalWindow";
import Container from "common/Container/Container";
import { IChangePassword } from "./interfaces";
import { useChangePasswordMutation, useGetSingleUserQuery } from "store/apis/profile";
import { useAppSelector } from "hooks/redux";
import { IPassword } from "store/apis/profile/profile.types";

const ContactInfo: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // TODO:
  // const {id} = useParams()

  // const { data } = useGetSingleUserQuery(3)
  const [changePassword, {isError, isSuccess}] = useChangePasswordMutation()
  const { user } = useAppSelector(s => s.authReducer)

  // const {email, firstName, lastName, phoneNumber} = data?.data

  console.log(user)

  const onFinish = async (values: IChangePassword): Promise<void> => {
    enterLoading()
    try {
      if (values.newPassword === values.confirmPassword) {
        const value: IPassword = {
          id: 1,
          password: values.confirmPassword,
        };

        const response = await changePassword(value).unwrap()
      }
    } catch (error) {
      throw new Error(`Error, ${error} `)
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleNavigate = () => navigate("/profile");

  const enterLoading = (): void => {
    setLoading(true);
  };

  return (
    <Wrapper>
      <Container>
        <TitleGroup mb="50">
          <Button
            onClick={handleNavigate}
            mr="20"
            color={colors.btnWhite}
            bg={colors.btnDarkBlue}
          >
            <LeftOutlined />
          </Button>
          <Title fs="35">{t("ContactInfo.title")}</Title>
        </TitleGroup>

        <Block>
          <div>
            <TitleGroup mb="35">
              <StyledAvatar size={64} icon={<UserOutlined />} />
              <div>
                {/* <Title fs="28">{`${firstName} ${lastName}`}</Title> */}
                <Circle>{t("ContactInfo.userRole")}</Circle>
              </div>
            </TitleGroup>
            <Card>
              <CardInfo>
                <Label>{t("ContactInfo.userFirstName")}</Label>
                <TitleGroup justify="space-between">
                  {/* <Title fs="16">{firstName}</Title> */}
                  {/* {firstName ? <Icon /> : <IconNotFound />} */}
                </TitleGroup>
              </CardInfo>

              <CardInfo>
                <Label>{t("ContactInfo.userLastName")}</Label>
                <TitleGroup justify="space-between">
                  {/* <Title fs="16">{lastName}</Title> */}
                  {/* {lastName ? <Icon /> : <IconNotFound />} */}
                </TitleGroup>
              </CardInfo>

              <CardInfo>
                <Label>{t("ContactInfo.userEmail")}</Label>
                <TitleGroup justify="space-between">
                  {/* <Title fs="16">{email}</Title> */}
                  {/* {email ? <Icon /> : <IconNotFound />} */}
                </TitleGroup>
              </CardInfo>

              <CardInfo>
                <Label>{t("ContactInfo.userPhone")}</Label>
                <TitleGroup justify="space-between">
                  {/* <Title fs="16">{phoneNumber ? phoneNumber : 'You phone number is empty'}</Title> */}
                  {/* {phoneNumber ? <Icon /> : <IconNotFound />} */}
                </TitleGroup>
              </CardInfo>

              <CardInfo>
                <Label>{t("ContactInfo.userPassword")}</Label>
                <TitleGroup justify="space-between">
                  <Title fs="16">********</Title>
                  <Button
                    onClick={openModal}
                    color={colors.btnWhite}
                    bg={colors.btnDarkBlue}
                    disabled={isSuccess || isError}
                  >
                    {t("ContactInfo.btnChangeText")}
                  </Button>
                </TitleGroup>
              </CardInfo>
            </Card>
          </div>
        </Block>
      </Container>

      <ModalWindow
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        bg={colors.passwordBg}
        modalBg={colors.passwordModalBg}
      >
        {(isSuccess || isError) ||
        <StyledForm
          name="normal_login"
          className="form"
          form={form}
          initialValues={{ remember: true }}
          onFinish={values => onFinish(values as IChangePassword)}
        >
          <FormItem
            label={t("ContactInfo.passwordTitle.item")}
            name="newPassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: `${t("ContactInfo.passwordTitle.error")}`,
              },
            ]}
          >
            <FormPassword
              placeholder={t("ContactInfo.passwordTitle.placeholder")}
            />
          </FormItem>

          <FormItem
            label={t("ContactInfo.conPasswordTitle.item")}
            name="confirmPassword"
            hasFeedback
            dependencies={['newPassword']}
            rules={[
              {
                required: true,
                message: `${t("ContactInfo.conPasswordTitle.error")}`,
                validator: (_, value) => {
                  if (validatePassword.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      `${t("ContactInfo.passwordTitle.error")}`
                    );
                  }
                },
              },
            ]}
          >
            <FormPassword
              placeholder={t("ContactInfo.conPasswordTitle.placeholder")}
            />
          </FormItem>

          <FormButton>
            <PwrButton
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
                {t('ContactInfo.btnText')}
            </PwrButton>
          </FormButton>

        </StyledForm>}

        {isSuccess && <Label>{t('ContactInfo.afterChangePassword.success')}</Label>}
        {isError && <Label>{t('ContactInfo.afterChangePassword.error')}</Label>}
      </ModalWindow>
    </Wrapper>
  );
};

export default ContactInfo;
