import { Col, Row } from "antd";
import { StyledParagraph } from "components/UI";
import * as React from "react";
import { useLinkClickHandler } from "react-router-dom";

interface IAuthMessageProps {
  translator: (message: string) => string;
  leftText: string;
  rightText: string;
  setValue: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const AuthMessage: React.FunctionComponent<IAuthMessageProps> = ({
  translator,
  leftText,
  rightText,
  setValue,
}) => {
  return (
    <Row>
      <Col span={16}>
        <StyledParagraph>{translator(leftText)}</StyledParagraph>
      </Col>
      <Col span={8}>
        <a onClick={() => setValue((prev) => !prev)}>
          <StyledParagraph color="#4caf50">
            {translator(rightText)}
          </StyledParagraph>
        </a>
      </Col>
    </Row>
  );
};

export default AuthMessage;
function prev(prev: any): void {
  throw new Error("Function not implemented.");
}
