import { Col, Row } from 'antd';
import { StyledButton } from 'components/UI';
import * as React from 'react';

interface ISubmitButtonProps {
    translator: (message: string) => string;
    message: string;
}

const SubmitButton: React.FunctionComponent<ISubmitButtonProps> = ({
    translator,
    message,
}) => {
    return (
        <Row>
            <Col>
                <StyledButton type="primary" htmlType="submit" disabled={false}>
                    {translator(message)}
                </StyledButton>
            </Col>
        </Row>
    );
};

export default SubmitButton;
