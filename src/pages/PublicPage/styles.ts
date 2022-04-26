import styled from "styled-components";
import { colors } from "constants/index";

export const ProfileContainer = styled.section`
  margin-right: auto;
  margin-left: auto;
  margin-top: 12px;
  max-width: 800px;
  padding: 0px 12px;
  padding-bottom: 12px;
  border: solid 1px;
  border-radius: 15px;
  position: relative;
`;

export const Title = styled.h1`
  margin-top: 8px;
  margin-left: 15px;
`;
export const Sections = styled.h2`
  margin-top: 8px;
  margin-left: 25px;
`;

export const Description = styled.p`
  font-size: 19px;
  margin-top: 15px;
  margin-left: 35px;
  color: ${colors.titleOfSectionsProfile};
`;
export const Avatar = styled.div`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  margin: 5px;
`;
