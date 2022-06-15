import AuthGoogle from 'components/AuthGoogle';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Authorization/Google Authorization',
    component: AuthGoogle,
    argTypes: {},
} as ComponentMeta<typeof AuthGoogle>;

const Template: ComponentStory<typeof AuthGoogle> = (args) => (
    <AuthGoogle {...args} />
);
export const Default = Template.bind({});
Default.args = {
    buttonText: 'Sign with Google account',
    onFailure: (error) => console.log(error),
    onSuccess: (response) => console.log(response),
};
