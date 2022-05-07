import React, { useState } from "react";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";

import {
  Container,
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
} from "./styles";
import { colors } from "constants/index";
import Button from "common/Button";
import ModalWindow from "common/ModalWindow/ModalWindow";
import { FormPassword } from "pages/ResetPassword/style";
import { validatePassword } from "constants/validate";
import { FormButton, FormItem, PwrButton, StyledForm } from "pages/ForgotPassword/styles";

const ContactInfo: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();


  const onFinish = async (values: any): Promise<void> => {
    enterLoading()
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
          <Title fs="35">My Account</Title>
        </TitleGroup>

        <Block>
          <div>
            <TitleGroup mb="35">
              <StyledAvatar size={64} icon={<UserOutlined />} />
              <div>
                <Title fs="28">Jon Doe</Title>
                <Circle>User</Circle>
              </div>
            </TitleGroup>
            <Card>
              <CardInfo>
                <Label>First Name</Label>
                <TitleGroup justify="space-between">
                  <Title fs="16">Jon</Title>
                  <Icon />
                </TitleGroup>
              </CardInfo>

              <CardInfo>
                <Label>Last Name</Label>
                <TitleGroup justify="space-between">
                  <Title fs="16">Jon</Title>
                  <Icon />
                </TitleGroup>
              </CardInfo>

              <CardInfo>
                <Label>Email</Label>
                <TitleGroup justify="space-between">
                  <Title fs="16">jondoe@gmail.com</Title>
                  <Icon />
                </TitleGroup>
              </CardInfo>

              <CardInfo>
                <Label>Phone</Label>
                <TitleGroup justify="space-between">
                  <Title fs="16">+996705223352</Title>
                  <Icon />
                </TitleGroup>
              </CardInfo>

              <CardInfo>
                <Label>Password</Label>
                <TitleGroup justify="space-between">
                  <Title fs="16">********</Title>
                  <Button
                    onClick={openModal}
                    color={colors.btnWhite}
                    bg={colors.btnDarkBlue}
                  >
                    Change
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
        bg={'#495057'}
        modalBg={"#343a40"}
      >
        <StyledForm
          name="normal_login"
          className="form"
          form={form}
          initialValues={{ remember: true }}
          onFinish={values => onFinish(values as any)}
        >
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
                validator: (_: any, value: string) => {
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

        </StyledForm>
      </ModalWindow>
    </Wrapper>
  );
};

export default ContactInfo;
