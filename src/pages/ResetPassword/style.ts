import { Space, Typography } from "antd";
import styled from "styled-components";
import { colors } from "constants/index";

const { textWhite, textWhiteRed } = colors;

export const StyledSpace = styled(Space)`
  display: block;
  width: 300px;
  gap: 20px !important;
  display: flex;
  margin-bottom: 25px;
  flex-direction: column;
  .ant-space-item {
    width: 100%;
  }

  .titles {
    display: flex;
    align-items: center;
    margin-bottom: 13px;
  }
`;

export const TypographyTitle = styled(Typography.Title)`
  color: ${textWhite} !important;
  margin: 0 auto 0.5em;
`;

export const Title = styled.h4`
  color: ${textWhite};
  font-size: 16px;
  margin-bottom: 0;
`;

export const Star = styled.span`
  display: inline-block;
  margin-right: 4px;
  color: ${textWhiteRed};
  font-size: 14px;
  line-height: 1;
`;
