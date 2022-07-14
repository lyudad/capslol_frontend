import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from 'components/Button/Button';

export default {
    title: 'MY CONTACTS/Password Cahnge',
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const ButtonChange = Template.bind({});
ButtonChange.args = {
    children: 'CHANGE',
    // eslint-disable-next-line no-alert
    onClick: () => alert('Change Actions!'),
};
