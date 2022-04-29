import styled, { css } from "styled-components";

interface ChangePassword {
  isChange: boolean;
}

export const InfoContainer = styled.div<ChangePassword>`
  display: flex;
  width: 100%;
  height: 100px;
  background: white;

  .info-form {
    width: 100%;
    max-width: 480px;
    padding: 40px;

    .inputs {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 10px;
    }

    .pass-inputs {
      display: ${(p) => (p.isChange ? "block" : "none")};
      margin-top: 25px;
    }

    .change-password {
      width: 100%;
      display: flex;
      justify-content: flex-start;
    }
  }
`;

export const StyledInput = styled.input`
  outline: none;
  border: 1px solid #000000;
  width: 100%;
  padding: 8px 10px;
  color: #3e3f4b;
  font-size: 18px;
  border-radius: 6px;
`;

export const StyledLabel = styled.label`
  display: block;
  font-size: 18px;
  margin-left: 4px;
  margin-bottom: 4px;
`;

export const ChangePassword = styled.button<ChangePassword>`
  background: red;
  color: #fff;
  padding: 0.75rem 2rem;
  margin-top: 10px;
  display: flex;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  ${(p) =>
    p.isChange &&
    css`
      color: red;
      background: transparent;
      border: 1px solid #000000;
  `}

  font-size: 18px;
`;

export const SubmitButton = styled.button<ChangePassword>`
  width: 100%;
  display: ${(p) => p.isChange ? "flex" : "none"};
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  background: #424242;
  color: #fff;
  padding: 1rem 0;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  font-size: 18px;
`;

