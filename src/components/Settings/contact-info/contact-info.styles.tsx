import styled from "styled-components";

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
      /* background: gray; */
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
  /* font-weight: 600; */
  margin-left: 4px;
  margin-bottom: 4px;
`;

export const ChangeButtons = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  align-items: center;
  /* justify-content: space-between; */
`;

export const ChangePassword = styled.button<ChangePassword>`
  background: red;
  color: #fff;
  padding: 0.75rem 2rem;
  /* margin-top: 10px; */
  display: ${(p) => p.isChange ? "none": "flex"};
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  font-size: 18px;
`;

export const CancelButton = styled.button<ChangePassword>`
  background: transparent;
  border: 1px solid #000000;
  padding: 0.75rem 2rem;
  display: ${(p) => p.isChange ? "flex": "none"};
  justify-content: center;
  align-items: center;
  border-radius: 6px;

  color: red;
  font-size: 18px;
`;

export const SubmitButton = styled.button<ChangePassword>`
  width: 100%;
  /* display: ${(p) => p.isChange ? "flex" : "none"}; */
  display: none;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  background: #424242;
  color: #fff;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  font-size: 18px;
`;

export const PasswordContainer = styled.div`
  display: none;
  flex-direction: column;
  width: 100%;

  /* .inputs {
    display: none;
  } */
`;
