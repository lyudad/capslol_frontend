import React from 'react';
import { IAvatarProps } from 'pages/Chat/interfaces';
import { AvatarImg, Image, Online, Wrapper } from './styles';

const Avatar: React.FC<IAvatarProps> = ({ image, alt, isOnline }) => {
    return (
        <Wrapper>
            <AvatarImg>
                <Image src={image} alt={alt} />
            </AvatarImg>
            <Online className={`${isOnline}`} />
        </Wrapper>
    );
};

export default Avatar;
