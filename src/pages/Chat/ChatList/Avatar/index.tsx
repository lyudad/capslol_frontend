import React from 'react';
import { IAvatarProps } from 'pages/Chat/interfaces';
import avatar from 'assets/avatar.png';
import { useGetUserProfileQuery } from 'store/apis/jobs';
import { AvatarImg, Image, Online, Wrapper } from './styles';

const Avatar: React.FC<IAvatarProps> = ({ id }) => {
    const { data } = useGetUserProfileQuery(id);

    return (
        <Wrapper>
            <AvatarImg>
                <Image src={data?.profileImage || avatar} alt={data?.english} />
            </AvatarImg>
            <Online className="" />
        </Wrapper>
    );
};

export default Avatar;
