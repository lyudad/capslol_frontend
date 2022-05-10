import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
} from "./styles";
import { FormButton, FormItem, PwrButton, StyledForm } from "pages/ForgotPassword/styles";
import { FormPassword } from "pages/ResetPassword/style";
import { colors } from "constants/index";
import { validatePassword } from "constants/validate";
import Button from "common/Button/Button";
import ModalWindow from "common/ModalWindow/ModalWindow";
import Container from "common/Container/Container";
import { IPassword } from "./interfaces";
import { useGetSingleUserQuery } from "redux/apis/settings";

const ContactInfo: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data } = useGetSingleUserQuery(3)

  useEffect(() => {
    console.log(data)

  }, [])

  const onFinish = async (values: IPassword): Promise<void> => {
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
          <Title fs="35">{t("ContactInfo.title")}</Title>
        </TitleGroup>

        <Block>
          <div>
            <TitleGroup mb="35">
              <StyledAvatar size={64} icon={<UserOutlined />} />
              <div>
                <Title fs="28">{t("ContactInfo.userFullName")}</Title>
                <Circle>{t("ContactInfo.userRole")}</Circle>
              </div>
            </TitleGroup>
            <Card>
              <CardInfo>
                <Label>{t("ContactInfo.userFirstName")}</Label>
                <TitleGroup justify="space-between">
                  <Title fs="16">---</Title>
                  <Icon />
                </TitleGroup>
              </CardInfo>

              <CardInfo>
                <Label>{t("ContactInfo.userLastName")}</Label>
                <TitleGroup justify="space-between">
                  <Title fs="16">---</Title>
                  <Icon />
                </TitleGroup>
              </CardInfo>

              <CardInfo>
                <Label>{t("ContactInfo.userEmail")}</Label>
                <TitleGroup justify="space-between">
                  <Title fs="16">----</Title>
                  <Icon />
                </TitleGroup>
              </CardInfo>

              <CardInfo>
                <Label>{t("ContactInfo.userPhone")}</Label>
                <TitleGroup justify="space-between">
                  <Title fs="16">+</Title>
                  <Icon />
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
        <StyledForm
          name="normal_login"
          className="form"
          form={form}
          initialValues={{ remember: true }}
          onFinish={values => onFinish(values as IPassword)}
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

        </StyledForm>

      </ModalWindow>
    </Wrapper>
  );
};

export default ContactInfo;
