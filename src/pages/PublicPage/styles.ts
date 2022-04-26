import styled from "styled-components";

export const ProfileContainer = styled.section`
  display: flex;
  margin-right: auto;
  margin-left: auto;
  margin-top: 12px;
  max-width: 800px;
  height: 100vh;
  padding: 0px 12px;
  border: solid;
  position: relative;
`;

export const TitleContainer = styled.div`
  min-width: 340px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 0;
`;

export const Description = styled.p`
  text-align: center;
`;
export const Avatar = styled.div`
  display: block;
  position: absolute;
  right: 0;
  border: solid 1px tomato;
`;
