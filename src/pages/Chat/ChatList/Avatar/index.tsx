import React from "react";
import { Wrapper } from "./styles";

const Avatar: React.FC<any> = ({ image }) => {
  return (
    <Wrapper>
      <div className="avatar-img">
        <img src={image} alt="#" />
      </div>
      {/* <span className={`isOnline ${this.props.isOnline}`}></span> */}
    </Wrapper>
  );
};

export default Avatar;
