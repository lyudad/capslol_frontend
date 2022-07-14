import { ComponentMeta, ComponentStory } from '@storybook/react';
import ChangePassword from 'components/ChangePassword';
import 'antd/dist/antd.css';

export default {
    title: 'MY CONTACTS/Password Cahnge',
    component: ChangePassword,
} as ComponentMeta<typeof ChangePassword>;

const Template: ComponentStory<typeof ChangePassword> = (args) => (
    <ChangePassword {...args}> </ChangePassword>
);

export const ModalPasswordChangeForm = Template.bind({});
ModalPasswordChangeForm.args = {};
