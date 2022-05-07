import Button from "common/Button";
import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import ModalWindow from "common/ModalWindow/ModalWindow";

const ContactInfo: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Wrapper>
      <Container>
        <TitleGroup mb="50">
          <Button mr="20" color={colors.btnWhite} bg={colors.btnDarkBlue}>
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

      <ModalWindow modalIsOpen={modalIsOpen} closeModal={closeModal}>
        <div>Hello</div>
      </ModalWindow>
    </Wrapper>
  );
};

export default ContactInfo;
