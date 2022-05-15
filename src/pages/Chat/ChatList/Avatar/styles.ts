import styled from "styled-components";

export const Wrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
  position: relative;
`;

export const AvatarImg = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

export const Image = styled.img`
  max-width: 100%;
  object-fit: cover;
`;

export const Online = styled.span`
  position: absolute;
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #ddd;
  border-radius: 50%;
  border: 2px solid #fff;
  &.active {
    background-color: tomato;
  }
`;
