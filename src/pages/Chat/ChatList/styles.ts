import styled from "styled-components";

export const Wrapper = styled.div`
  width: 35%;
  border: 1px solid rgba(76, 175, 80, 0.3);
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: red;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: yellow;
  }
`;

export const SearchWrap = styled.div`
  background-color: #e6e5ea;
  border-radius: 5px;
`;

export const Input = styled.input`
  background-color: transparent;
  border: none;
  padding: 10px 15px;
  outline: none;
  width: 80%;
  padding-right: 0;
`;

export const ChatLists = styled.div`
  margin-top: 30px;
  overflow: auto;
  max-height: calc(100vh - calc(80vh / 2));
`;
