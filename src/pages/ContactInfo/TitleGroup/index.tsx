import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Circle, StyledAvatar, Title, TitleGroup } from '../styles';
import { ITitleProps } from '../interfaces';

const RoleAndName: React.FC<ITitleProps> = ({ user }) => {
    return (
        <TitleGroup mb="35">
            <StyledAvatar size={64} icon={<UserOutlined />} />
            <div>
                <Title fs="28">
                    {`${user?.firstName ? user?.firstName : 'Not'}
                      ${user?.lastName ? user?.lastName : 'Found'}`}
                </Title>
                <Circle>{user?.role ? user?.role : 'Not Found'}</Circle>
            </div>
        </TitleGroup>
    );
};

export default RoleAndName;
