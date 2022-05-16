import styled from "styled-components";

export const Wrapper = styled.div`
  width: 35%;
  border: 1px solid rgba(76, 175, 80, 0.3);
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
`;

export const SearchWrap = styled.div`
  background-color: #e6e5ea;
  border-radius: 5px;
  margin: 20px;
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
  &::-webkit-scrollbar {
    transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);
    width: 5px;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 34, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);
    background: rgba(76, 175, 80, 0.3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(33, 122, 34, 0.3);
  }
`;
