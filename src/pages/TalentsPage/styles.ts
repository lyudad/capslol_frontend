import styled from 'styled-components';
import { colors, fonts } from 'constants/index';
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

export const TitleFilter = styled.h2`
    text-align: center;
    border-bottom: 1px solid ${colors.appBarBrd};
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

export const Page = styled.div`
    padding: 12px;
    width: 100%;
    min-height: calc(100vh - 64px);
`;

export const Title = styled.h1`
    position: relative;
    z-index: 9;
    font-weight: ${fonts.jobListFontWeight};
    font-size: ${fonts.jobListTitleSize};
    color: ${colors.brandColor};
    @media (max-width: 768px) {
        text-align: center;
    }
`;

export const TalentsContainer = styled.div`
    align-items: flex-start;
    padding-top: 16px;
    border-top: 1px solid ${colors.appBarBrd};
    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
`;

export const ListContainer = styled.div`
    border-left: 1px solid ${colors.appBarBrd};
    margin-left: 330px;
    @media (max-width: 768px) {
        border-left: none;
        margin-left: 10px;
        margin-top: 10px;
    }
`;

export const TalentsList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-auto-flow: dense;
    grid-column-gap: 12px;
    grid-row-gap: 10px;
    padding-left: 16px;
    list-style: none;
    margin: 0;
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(300px, 10fr));
        width: 330px;
        padding-left: 16px;
    }
`;

export const TalentCard = styled.li`
    word-break: break-all;
    position: relative;
    padding: 0px 8px 8px 8px;
    background-color: ${colors.appBarBgr};
    border-bottom: 1px solid ${colors.appBarBrd};
    color: ${colors.textWhite};

    :hover {
        box-shadow: inset 0 0 4px 2px ${colors.brandColor};
        transition: all 0.3s ease;
        -webkit-transform: scale(1.04);
        -ms-transform: scale(1.04);
        transform: scale(1.04);
    }
`;

export const FiltersContainer = styled.div`
    @media (max-width: 768px) {
        margin-right: 0px;
        position: inherit;
        left: none;
    }
    display: flex;
    flex-direction: column;
    position: fixed;

    left: 0;
    /* top: 0; */
    padding-left: 5px;
    padding-right: 15px;
    margin-right: 16px;
    margin-left: 20px;
    background-color: ${colors.appBarBgr};
`;
