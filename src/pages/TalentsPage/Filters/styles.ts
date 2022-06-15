import styled from 'styled-components';
import { colors } from 'constants/index';
import { Slider, Form } from 'antd';
import 'antd/dist/antd.min.css';

export const StyledFilter = styled.div`
    padding-top: 0px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${colors.appBarBrd};
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

export const StyledRangeSlider = styled(Slider)`
    .ant-slider-handle {
        border-color: ${colors.brandColor} !important;
        background-color: ${colors.brandColor} !important;
    }
    .ant-slider-handle-2 {
        border-color: ${colors.brandColor} !important;
        background-color: ${colors.brandColor} !important;
    }
`;

export const StyledSlider = styled(Slider)`
    .ant-slider-handle {
        border-color: ${colors.brandColor} !important;
        background-color: ${colors.brandColor} !important;
    }
    .ant-slider-track {
        background-color: ${colors.brandColor} !important;
    }
`;

export const ButtonsItem = styled(Form.Item)`
    .ant-form-item-control-input-content {
        display: flex;
        justify-content: space-evenly;
        width: 300px;
    }
`;
