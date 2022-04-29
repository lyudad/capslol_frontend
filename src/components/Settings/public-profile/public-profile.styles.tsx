import styled from "styled-components";
import { Select } from "antd";
// import './public-prof.css'

export const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
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

    .select {
      width: 100%;
      font-size: 18px;
      background: gray;
    }

    .hour-rate {
      display: flex;
      /* justify-content: space-between; */
      /* background: gray; */
    }

    .date {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  }

  .available-hours {
    display: flex;
    justify-content: space-between;
  }
`;

export const StyledInput = styled.input`
  outline: none;
  border: 1px solid #000000;
  /* border: none; */
  /* border-bottom: 1px solid #000000; */
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

export const NumberInput = styled.input`
  width: 100px;
  margin: 0;
  /* max-width: 100px; */
  outline: none;
  border: 1px solid #000000;
  padding: 4px 6px;
  color: #3e3f4b;
  font-size: 18px;
  border-radius: 6px;
`;

export const DateInput = styled.input`
  outline: none;
  border: 1px solid #000000;
  /* border: none; */
  /* border-bottom: 1px solid #000000; */
  max-width: 200px;
  padding: 8px 10px;
  color: #3e3f4b;
  font-size: 18px;
  border-radius: 6px;
`;
export const SelectInput = styled(Select)`
  font-size: 18px;
  width: 300px;
`;
