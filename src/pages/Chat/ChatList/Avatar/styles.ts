import styled from "styled-components";

export const Wrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  margin-right: 20px;
  position: relative;

  .avatar img {
    max-width: 100%;
    object-fit: cover;
  }

  .avatar-img {
    overflow: hidden;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  .isOnline {
    position: absolute;
    width: 10px;
    height: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #ddd;
    border-radius: 50%;
    border: 2px solid #fff;
  }
  .isOnline.active {
    background-color: tomato;
  }
`;
