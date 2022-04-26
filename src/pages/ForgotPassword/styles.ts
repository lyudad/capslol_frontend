import styled from "styled-components";
import { Button, Form, Input } from "antd";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 340px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #d9d9d9;
  background-color: rgba(0, 0, 0, 0.8);
  color: #d9d9d9;
  border: 1px solid transparent;
  border-radius: 4px;
`;

export const StyledForm = styled(Form)`
  .ant-form-item-required {
    color: #fff;
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

export const FormItem = styled(Form.Item)`
  display: block;
`;

export const FormInput = styled(Input)`
  width: 300px;
`;

export const FormButton = styled(Form.Item)`
  text-align: center;
  margin-bottom: 0;
  padding: 15px 0;
`;

export const PwrButton = styled(Button)`
  font-weight: 500;
  background: #4caf50;
  color: #fff;
  width: 100%;
  border: 1px solid #4caf50;
  transition: all 0.4s linear;
  text-transform: uppercase;
  &:hover {
    border: 1px solid #fff;
    background: #fff;
    color: #4caf50;
  }
  :active {
    color: #fff;
    border: 1px solid #fff;
    background: #4caf50;
  }
`;

export const FormLink = styled.div`
  text-align: end;

  a {
    transition: all 0.4s linear;

    &:hover {
      text-decoration: underline;
      color: #4caf50;
    }
  }
`;

export const Title = styled.h3`
  text-align: center;
  color: #fff;
  font-size: 22px;
  word-break: break-all;
`;
