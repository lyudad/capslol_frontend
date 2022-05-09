import styled from "styled-components";
import { Input, Tooltip } from "antd";
import { colors, fonts } from "constants/index";
import { IProps } from "./interfaces";
import TextArea from "antd/lib/input/TextArea";

export const Wrapper = styled.div`
  background: ${colors.homeBgr};
  background-image: url(./images/bg-image.jpg);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 70px;
`;

export const ProposalCard = styled.div`
  min-height: 20%;
  background: #232b2b;
  color: white;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 30px;
`;

export const Font = styled.p`
  font-family: ${fonts.logoFontFamily}, sans-serif;
  font-size: ${(props: IProps) => props.fs}px;
  color: ${(props: IProps) => props.color};
  padding: 20px;
  margin-bottom: 0;
`;

export const Section = styled.section`
  border-top: 1px solid wheat;
  padding: 20px;
`;

export const StyledInput = styled(Input)`
  width: 35%;
  background: transparent !important;
  border-radius: 5px;
  .ant-input-affix-wrapper > input.ant-input {
    color: #fff;
    padding: 0 20px;
    text-align: end;
  }
`;

export const FontTitle = styled.h6`
  font-family: ${fonts.logoFontFamily}, sans-serif;
  font-size: ${(props: IProps) => props.fs}px;
  color: ${(props: IProps) => props.color};
  margin: 0;
  margin-bottom: ${(props: IProps) => props.mb}px;
  padding: 10px 0;
`;

export const Hr = styled.hr`
  margin-top: 18px;
  margin-bottom: 18px;
  border: 0;
  border-top: 1px solid #e0e0e0;
  height: 0;
  overflow: visible;
`;

export const StyledTooltip = styled(Tooltip)`
  .ant-input-textarea-show-count:after {
    color: #fff;
  }
`;

export const StyledTextArea = styled(TextArea)`
  textarea {
    background: transparent;
    color: #fff;
    border-radius: 5px;
  }
`;
