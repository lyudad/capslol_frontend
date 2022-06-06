import React from 'react';
import { IAvatarProps } from 'pages/Chat/interfaces';
import { useSearchUserQuery } from 'store/apis/publicProfile';
import avatar from 'assets/avatar.png';
import { AvatarImg, Image, Online, Wrapper } from './styles';

const Avatar: React.FC<IAvatarProps> = ({ id }) => {
    const { data } = useSearchUserQuery(id);

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
