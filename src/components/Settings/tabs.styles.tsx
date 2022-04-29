import styled, { css } from 'styled-components';

interface isActive {
    active?: boolean,
    inactiveStyle?: number,
    inactiveTab?: any, 
    value?: any
}

interface Active {
    active: boolean,
}

export const TabHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StylizedTab = styled.button<isActive>`
  color: black;
  /* width: 100%; */
  padding: 15px 20px;
  font-size: 1.25rem;
  background: transparent;
  /* background-color: gray; */
  border: none;
  /* cursor: ${(p) => (p.disabled ? 'default' : 'pointer')}; */
  ${(p) =>
    p.active &&
    css`
      /* color: #00adb5; */
      border-bottom: 2px solid #000;
      font-weight: 600;
    `}
  /* ${(p) => !p.active && p.inactiveStyle} */
`;

export const StyledTabPanel = styled.div<Active>`
  display: ${(p) => (p.active ? 'flex' : 'none')}; 
  font-size: 4rem;
  /* background: #393e46; */
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: darkgreen; */
    font-size: 4rem;
  }
`;

export const TabsHolder = styled.div`
  display: flex;
`;

export const inactiveTab = {
  // opacity: 0.65,
};
