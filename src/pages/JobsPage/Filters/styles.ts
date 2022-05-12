import styled from "styled-components";
import { colors, fonts } from "constants/index";
import { Input, Slider } from "antd";

const { Search } = Input;

export const Page = styled.div`
  padding: 78px 12px 12px 12px;
  width: 100%;
`;

export const StyledInput = styled(Search)`
  button {
    .ant-btn-primary {
      background: ${colors.brandColor} !important;
    }
  }
`;

export const StyledSlider = styled(Slider)`
  .ant-slider-handle-2 {
    background-color: "purple";
  }
`;
