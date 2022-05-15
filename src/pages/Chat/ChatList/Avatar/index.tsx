import React from "react";
import { AvatarImg, Image, Online, Wrapper } from "./styles";

const Avatar: React.FC<any> = ({ image, alt, isOnline }) => {
  return (
    <Wrapper>
      <AvatarImg>
        <Image src={image} alt={alt} />
      </AvatarImg>
      <Online className={`isOnline ${isOnline}`}></Online>
    </Wrapper>
  );
};

export default Avatar;
