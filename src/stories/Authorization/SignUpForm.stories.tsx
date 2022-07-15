import { ComponentMeta, ComponentStory } from '@storybook/react';
import SignUp from 'components/AuthForm/SignUp';

export default {
    title: 'Authorization/Google Authorization',
    component: SignUp,
    argTypes: {},
} as ComponentMeta<typeof SignUp>;

const Template: ComponentStory<typeof SignUp> = (args) => <SignUp {...args} />;
export const SignUpForm = Template.bind({});
SignUpForm.args = {
    translator: (leftText) => leftText,
};
