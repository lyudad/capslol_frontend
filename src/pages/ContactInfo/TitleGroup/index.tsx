import React from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUserQuery } from 'store/apis/publicProfile';
import avatar from 'assets/avatar.png';
import { StyledImg, Avatar } from 'pages/MyContacts(JobOwner)/styles';
import { Circle, Title, TitleGroup, AvatarBlock } from '../styles';
import { ITitleProps } from '../interfaces';

const RoleAndName: React.FC<ITitleProps> = ({ user }) => {
    const { data: userProfile } = useSearchUserQuery(user?.id);
    const { t } = useTranslation();

    return (
        <TitleGroup mb="35">
            <AvatarBlock>
                <Avatar>
                    <StyledImg
                        src={userProfile?.profileImage || avatar}
                        alt={user?.firstName}
                    />
                </Avatar>
            </AvatarBlock>
            <div>
                <Title fs="28">
                    {`${user?.firstName ? user?.firstName : ''}
                      ${user?.lastName ? user?.lastName : ''}`}
                </Title>
                <Circle>
                    {user?.role ? user?.role : `${t('ContactInfo.emptyRole')}`}
                </Circle>
            </div>
        </TitleGroup>
    );
};

export default RoleAndName;
