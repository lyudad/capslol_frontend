import { ComponentMeta, ComponentStory } from '@storybook/react';

import 'antd/dist/antd.css';
import EmptyListNotification from 'components/EmptyListNotification';
import { NoteBox } from 'components/EmptyListNotification/styles';

export default {
    title: 'EMPTY LIST/Empty list',
    component: EmptyListNotification,
} as ComponentMeta<typeof EmptyListNotification>;

const Template: ComponentStory<typeof EmptyListNotification> = (args) => (
    <NoteBox>
        {' '}
        <EmptyListNotification {...args} />
    </NoteBox>
);

export const Emptylistssssss = Template.bind({});
Emptylistssssss.args = {
    note: 'YOU DON’T HAVE ANY COMPONENTS ...',
};
