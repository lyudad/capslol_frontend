import styled from "styled-components";
import { colors, fonts } from "constants/index";
import { Input, Slider, Button } from "antd";
import "antd/dist/antd.min.css";

const { Search } = Input;

export const StyledFilter = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.appBarBrd};
`;

export const Title = styled.h2`
  text-align: center;
  border-bottom: 1px solid ${colors.appBarBrd};
  color: ${colors.textWhiteGrey};
`;

export const FilterTitle = styled.h3`
  margin-top: 8px;
  color: ${colors.textWhiteGrey};
`;

export const PriceValue = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.brandColor};
`;

export const StyledSlider = styled(Slider)`
  .ant-slider-handle {
    border-color: ${colors.brandColor} !important;
    background-color: ${colors.brandColor} !important;
  }
  .ant-slider-handle-2 {
    border-color: ${colors.brandColor} !important;
    background-color: ${colors.brandColor} !important;
  }
`;

export const StyledSearch = styled(Search)`
  .ant-btn-primary {
    border-color: ${colors.brandColor};
    background: ${colors.brandColor};
  }
`;
export const StyledSubmitButton = styled.button`
  margin-top: 12px;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  padding: 4px 12px;
  border: none;
  cursor: pointer;
  background: ${colors.brandColor};
  color: ${colors.textWhiteGrey};
`;
