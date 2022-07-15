import { ComponentMeta, ComponentStory } from '@storybook/react';
import SubmitButton from 'components/AuthForm/SubmitButton';
import { StyledButton } from 'components/UI';
import { Col, Row } from 'antd';

export default {
    title: 'Authorization/Google Authorization',
    component: SubmitButton,
    argTypes: {},
} as ComponentMeta<typeof SubmitButton>;

const Template: ComponentStory<typeof SubmitButton> = (args) => (
    <Row>
        <Col>
            <StyledButton type="primary" htmlType="submit" disabled={false}>
                <SubmitButton {...args} />
            </StyledButton>
        </Col>
    </Row>
);
export const SubmitButtons = Template.bind({});
SubmitButtons.args = {
    message: 'Submit',
    translator: (leftText) => leftText,
};
