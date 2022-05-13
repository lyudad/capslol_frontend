import { Avatar } from "antd";
import styled from "styled-components";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { IProps } from "./interfaces";
import { colors } from "constants/index";

export const Wrapper = styled.div`
  padding: 50px 0;
`;

export const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props: IProps) => props.justify};
  margin-bottom: ${(props: IProps) => props.mb}px;
`;

export const Title = styled.h3`
  color: ${colors.navColor};
  font-weight: 600;
  margin-bottom: 0;
  font-size: ${(props: IProps) => props.fs}px;
`;

export const Block = styled.div`
  display: flex;
  justify-content: center;
`;

export const Card = styled.div`
  background: ${colors.bgBlack};
  width: 500px;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid ${colors.textWhiteGrey};
`;

export const CardInfo = styled.div`
  margin-bottom: 25px;
`;

export const Label = styled.h5`
  color: ${colors.labelText};
  opacity: 0.8;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const StyledAvatar = styled(Avatar)`
  margin-right: 15px;
`;

export const Icon = styled(CheckCircleOutlined)`
  color: ${colors.textGreen};
  font-size: 20px;
`;

export const IconNotFound = styled(CloseOutlined)`
  color: ${colors.textWhiteRed};
  font-size: 20px;
`;

export const Circle = styled.div`
  background: linear-gradient(
    90deg,
    ${colors.hslaCircleRed} 0%,
    ${colors.hslaCircleBlue} 100%
  );
  border-radius: 5px;
  color: ${colors.navColor};
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  padding: 3px;
  width: 60%;
`;
