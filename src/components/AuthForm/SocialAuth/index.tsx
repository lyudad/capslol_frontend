import { Col, Row } from "antd";
import { StyledParagraph } from "components/UI";
import * as React from "react";
import { StyledLink } from "./style";

interface ISocialAuth {
  text: string
  translator: (message: string) => string;
  href: string
}

const SocialAuth: React.FunctionComponent<ISocialAuth> = ({ translator, text, href }) => {
  return (
    <Row>
      <Col>
        <StyledParagraph>{translator("SignUpForm.signInWith")}</StyledParagraph>
        <StyledLink href={href}>{text}</StyledLink>
      </Col>
    </Row>
  );
};

export default SocialAuth;