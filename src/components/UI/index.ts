import { Button, Form, Typography } from "antd";
import { colors, fonts } from "constants/index";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FlexType, TextType } from "./ui.type";

const { Paragraph } = Typography;

export const StyledButton = styled(Button)`
  width: 300px;
  padding: 4px;
  border: none;
  font-weight: ${fonts.signUpButtonsFontWeight};
  background: ${colors.brandColor} !important;
  color: ${colors.signUpFormColor};
  &[disabled] {
    background: ${colors.brandColor} !important;
    color: ${colors.signUpFormColor} !important;
  }
`;

export const StyledParagraph =
  styled(Paragraph) <
  TextType >
  `
  color: ${({ color }) => color || "#fff"};
`;

export const StyledForm = styled(Form)`
  .ant-form-item {
    display: flex;
    flex-direction: column;
    align-items: start;
    .ant-form-item-required {
      color: ${colors.signUpFormColor};
    }
    .ant-input {
      width: 300px;
    }
    .ant-input-password {
      width: 300px;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 340px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid ${colors.signUpForm};
  background-color: ${colors.formWrapperBgr};
  color: ${colors.signUpFormColor};
`;

export const StyledContent = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  background-color: ${colors.homeBgr};
  background-image: url(./images/bg-image.png);
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Flex =
  styled(Form.Item) <
  FlexType >
  `
  display: flex;
  justify-content: ${({ justify }) => justify || "flex-start"};
`;

export const StyledNavLink = styled.a`
  :hover {
    color: ${colors.brandColor};
  }
  font-weight: ${fonts.signUpButtonsFontWeight};
  color: ${colors.brandColor};
`;
