import styled from "styled-components";

export const Wrapper = styled.div`
  .chat__item {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-bottom: 15px;
    transition: all 0.3s ease;
    transform: scale(0);
    transform-origin: right;
    animation-name: showIn;
    animation-duration: 0.2s; /* or: Xms */
    animation-iteration-count: 1;
    animation-direction: normal; /* or: normal */
    animation-timing-function: cubic-bezier(
      0.88,
      0.19,
      0.37,
      1.11
    ); /* or: ease, ease-in, ease-in-out, linear, cubic-bezier(x1, y1, x2, y2) */
    animation-fill-mode: both; /* or: backwards, both, none */
    animation-delay: 0.2s; /* or: Xms */
  }
  @keyframes showIn {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  .chat__item .avatar {
    margin-right: 0px;
    margin-left: 20px;
    background: #fff;
    padding: 1px;
  }
  .chat__item__content {
    background-color: #4462ff;
    color: #fff;
    padding: 15px;
    border-radius: 10px 10px 0 10px;
    max-width: 50%;
    min-width: 215px;
  }
  .chat__item__content .chat__meta {
    justify-content: space-between;
    display: flex;
    margin-top: 10px;
  }
  .chat__item__content .chat__meta span {
    font-size: 14px;
    color: #8693d3;
    user-select: none;
  }
  .chat__msg {
    user-select: none;
  }

  .chat__item.other {
    flex-direction: row-reverse;
    transform-origin: left;
  }
  .chat__item.other .chat__item__content {
    background-color: #fff;
    color: #000;
    border-radius: 10px 10px 10px 0;
    max-width: 50%;
  }
  .chat__item.other .avatar {
    margin-right: 20px;
    margin-left: 0px;
  }
  .chat__item.other .chat__item__content .chat__meta span {
    color: #d1d1d1;
  }
`;
