import styled from "styled-components";

export const Wrapper = styled.div`
  width: 35%;
  .main__chatlist {
    border-right: 1px solid #32a308;
    padding: 20px;
    background: white;
    border-radius: 10px;
  }
  .chatlist__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn-nobg {
    background-color: transparent;
    border: none;
    box-shadow: none;
    font-size: 18px;
    cursor: pointer;
    padding: 10px;
    color: #dad9dd;
    outline: none;
  }
  .search_wrap {
    background-color: #e6e5ea;
    border-radius: 5px;
  }
  .search_wrap input {
    background-color: transparent;
    border: none;
    padding: 15px 15px;
    outline: none;
    width: 80%;
    padding-right: 0;
  }
  .search-btn {
    height: 46px;
    border: none;
    background-color: transparent;
    outline: none;
    width: 20%;
    cursor: pointer;
    font-size: 20px;
  }
  .chatlist__items {
    margin-top: 30px;
    overflow: auto;
    max-height: calc(100vh - calc(100vh / 2));
  }
`;
