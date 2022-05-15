import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Radio } from 'antd';
import { colors } from 'constants/index';
import {
    Title,
    StyledSlider,
    FilterTitle,
    StyledFilter,
    StyledSearch,
    PriceValue,
    StyledSubmitButton,
} from './styles';
import 'antd/dist/antd.min.css';

const { Option } = Select;

const Filters: React.FC = () => {
    const [timeAvailable, setTimeAvailable] = useState();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const { t } = useTranslation();

    function handleChangeEgl(englishLevel: string): void {
        console.log(`englishLevel ${englishLevel}`);
    }

    const skills = [
        'skill 1',
        'skill 2',
        'skill 3',
        'skill 4',
        'skill 5',
        'skill 6',
    ];
    function handleChangeSkills(skillsValue: number): void {
        console.log(`skillsValue ${skillsValue}`);
    }

    function priceRange(price: number[]): void {
        console.log('priceRange: ', price, price[0], price[1]);
        setMinPrice(price[0] * 100);
        setMaxPrice(price[1] * 100);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChangeTime = (e: any): void => {
        console.log('radio checked', e.target.value);
        setTimeAvailable(e.target.value);
    };

    const onSearch = (search: string): void => console.log(search);

    return (
        <>
            <Title>{t('JobPage.filters')}</Title>
            <StyledFilter>
                <FilterTitle>{t('JobPage.search')}</FilterTitle>
                <StyledSearch
                    placeholder="input search text"
                    allowClear
                    onSearch={onSearch}
                    enterButton
                    style={{ width: 300 }}
                />
            </StyledFilter>

            <StyledFilter>
                <FilterTitle>{t('JobPage.englishLevel')}</FilterTitle>
                <Select
                    defaultValue="None"
                    style={{ width: 300 }}
                    onChange={(values) => handleChangeEgl(values)}
                >
                    <Option value="None">{t('JobPage.none')}</Option>
                    <Option value="Pre-intermediate">
                        {t('JobPage.preIntermediate')}
                    </Option>
                    <Option value="Intermediate">
                        {t('JobPage.intermediate')}
                    </Option>
                    <Option value="Upper Intermediate">
                        {t('JobPage.upperIntermediate')}
                    </Option>
                    <Option value="Fluent">{t('JobPage.fluent')}Fluent</Option>
                </Select>
            </StyledFilter>

            <StyledFilter>
                <FilterTitle>{t('JobPage.Skills')}</FilterTitle>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: 300 }}
                    placeholder="Please select"
                    //   defaultValue={["skill#1"]}
                    onChange={(values) => handleChangeSkills(values)}
                >
                    {skills.map((item) => (
                        <Option key={item}>{item}</Option>
                    ))}
                </Select>
            </StyledFilter>

            <StyledFilter>
                <FilterTitle>{t('JobPage.price')}</FilterTitle>
                <PriceValue>
                    <span>min: {`${minPrice}`}</span>
                    <span>max: {`${maxPrice}`}</span>
                </PriceValue>
                <StyledSlider
                    range
                    step={5}
                    defaultValue={[0, 100]}
                    // eslint-disable-next-line react/jsx-no-bind
                    onAfterChange={priceRange}
                    trackStyle={[{ backgroundColor: `${colors.brandColor} ` }]}
                />
            </StyledFilter>

            <StyledFilter>
                <FilterTitle>{t('JobPage.TimeAvailable')}</FilterTitle>
                <Radio.Group onChange={onChangeTime} value={timeAvailable}>
                    <Radio
                        value="per day"
                        style={{ color: `${colors.brandColor}` }}
                    >
                        {t('JobPage.perDay')}
                    </Radio>
                    <Radio
                        value="hour"
                        style={{ color: `${colors.brandColor}` }}
                    >
                        {t('JobPage.hour')}
                    </Radio>
                </Radio.Group>
            </StyledFilter>
            <StyledSubmitButton type="submit">
                {t('JobPage.submit')}
            </StyledSubmitButton>
        </>
    );
};

export default Filters;
