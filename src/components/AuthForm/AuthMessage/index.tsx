import { Col, Row } from "antd";
import { StyledParagraph } from "components/UI";
import { colors } from "constants/index";
import * as React from "react";
import { Link } from "react-router-dom";

interface IAuthMessageProps {
  translator: (message: string) => string;
  leftText: string;
  rightText: string;
  href: string;
}

const AuthMessage: React.FunctionComponent<IAuthMessageProps> = ({
  translator,
  leftText,
  rightText,
  href,
}) => {
  return (
    <Row>
      <Col span={16}>
        <StyledParagraph>{translator(leftText)}</StyledParagraph>
      </Col>
      <Col span={8}>
        <Link to={href}>
          <StyledParagraph color={colors.brandColor}>
            {translator(rightText)}
          </StyledParagraph>
        </Link>
      </Col>
    </Row>
  );
};

export default AuthMessage;
function prev(prev: any): void {
  throw new Error("Function not implemented.");
}
