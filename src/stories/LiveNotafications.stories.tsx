import LiveNotification from 'components/LiveNotification';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HideWrapper } from 'components/HideWrapper/styles';

import 'antd/dist/antd.css';
import { LiveNote, Value } from 'components/LiveNotification/styles';

export default {
    title: 'Live Notification',
    component: LiveNotification,
} as ComponentMeta<typeof LiveNotification>;

const Template: ComponentStory<typeof LiveNotification> = (args) => (
    <HideWrapper showWhen>
        <LiveNote>
            <Value>
                <LiveNotification {...args} />
            </Value>
        </LiveNote>
    </HideWrapper>
);

export const LiveNotificationComponent = Template.bind({});
LiveNotificationComponent.args = {
    count: 1,
};
