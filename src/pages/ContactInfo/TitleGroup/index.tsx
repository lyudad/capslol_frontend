import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import { useSearchUserQuery } from 'store/apis/publicProfile';
import { Circle, StyledAvatar, Title, TitleGroup } from '../styles';
import { ITitleProps } from '../interfaces';

const RoleAndName: React.FC<ITitleProps> = ({ user }) => {
    const { data: userProfile } = useSearchUserQuery(user?.id);

    return (
        <TitleGroup mb="35">
            <StyledAvatar
                size={64}
                icon={userProfile?.profileImage || <UserOutlined />}
            />
            <div>
                <Title fs="28">
                    {`${user?.firstName ? user?.firstName : ''}
                      ${user?.lastName ? user?.lastName : ''}`}
                </Title>
                <Circle>{user?.role ? user?.role : 'Not Found'}</Circle>
            </div>
        </TitleGroup>
    );
};

export default RoleAndName;
