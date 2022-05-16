import React from "react";
import { AvatarImg, Image, Online, Wrapper } from "./styles";
import { IAvatarProps } from "pages/Chat/interfaces";

const Avatar: React.FC<IAvatarProps> = ({ image, alt, isOnline }) => {
  return (
    <Wrapper>
      <AvatarImg>
        <Image src={image} alt={alt} />
      </AvatarImg>
      <Online className={`${isOnline}`}></Online>
    </Wrapper>
  );
};

export default Avatar;
