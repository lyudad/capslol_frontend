<<<<<<< HEAD
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Radio } from 'antd';
import { colors } from 'constants/index';
=======
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Radio, RadioChangeEvent } from 'antd';
import { colors, skills } from 'constants/index';
>>>>>>> develop
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
<<<<<<< HEAD
    const [timeAvailable, setTimeAvailable] = useState();
=======
    const [searchValue, setSearchValue] = useState<string>();
    const [englishLevel, setEnglishLevel] = useState<string>();
    const [timeAvailable, setTimeAvailable] = useState<string>();
    const [filteredSkills, setFilteredSkills] = useState<string[]>();
    const [category, setCategory] = useState<string>();
>>>>>>> develop
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const { t } = useTranslation();

<<<<<<< HEAD
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
=======
    const onClickButton = (): void => {
        console.log('englishLevel=', englishLevel);
        console.log('timeAvailable=', timeAvailable);
        console.log('search=', searchValue);
        console.log('skills=', filteredSkills);
        console.log('category=', category);
    };

    const onSearch = (value: string): void => {
        setSearchValue(value);
    };

    const handleChangeEng = (value: string): void => {
        setEnglishLevel(value);
    };

    const priceRange = (value: number[]): void => {
        setMinPrice(value[0] * 100);
        setMaxPrice(value[1] * 100);
    };

    const onChangeCategory = (e: RadioChangeEvent): void => {
        setCategory(e.target.value);
    };

    const onChangeTime = (e: RadioChangeEvent): void => {
        setTimeAvailable(e.target.value);
    };

    const handleChangeSkills = (value: string[]): void => {
        setFilteredSkills(value);
    };

    const skillsChildren = useMemo(() => {
        const result = [];
        for (let i = 0; i < skills.length; i += 1) {
            result.push(
                <Option key={i} value={skills[i]} label={skills[i]}>
                    <div>{skills[i]}</div>
                </Option>
            );
        }
        return result;
    }, []);
>>>>>>> develop

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
<<<<<<< HEAD
=======
                <FilterTitle>{t('JobPage.Category')}</FilterTitle>
                <Radio.Group onChange={onChangeCategory} value={category}>
                    <Radio
                        value="category#1"
                        style={{ color: `${colors.brandColor}` }}
                    >
                        {t('JobPage.category#1')}
                    </Radio>
                    <Radio
                        value="category#2"
                        style={{ color: `${colors.brandColor}` }}
                    >
                        {t('JobPage.category#2')}
                    </Radio>
                </Radio.Group>
            </StyledFilter>

            <StyledFilter>
>>>>>>> develop
                <FilterTitle>{t('JobPage.englishLevel')}</FilterTitle>
                <Select
                    defaultValue="None"
                    style={{ width: 300 }}
<<<<<<< HEAD
                    onChange={(values) => handleChangeEgl(values)}
=======
                    onChange={handleChangeEng}
>>>>>>> develop
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
<<<<<<< HEAD
                    <Option value="Fluent">{t('JobPage.fluent')}Fluent</Option>
=======
                    <Option value="Fluent">{t('JobPage.fluent')}</Option>
>>>>>>> develop
                </Select>
            </StyledFilter>

            <StyledFilter>
                <FilterTitle>{t('JobPage.Skills')}</FilterTitle>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: 300 }}
                    placeholder="Please select"
<<<<<<< HEAD
                    //   defaultValue={["skill#1"]}
                    onChange={(values) => handleChangeSkills(values)}
                >
                    {skills.map((item) => (
                        <Option key={item}>{item}</Option>
                    ))}
=======
                    onChange={handleChangeSkills}
                >
                    {skillsChildren}
>>>>>>> develop
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
<<<<<<< HEAD
                    // eslint-disable-next-line react/jsx-no-bind
=======
>>>>>>> develop
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
<<<<<<< HEAD
            <StyledSubmitButton type="submit">
=======

            <StyledSubmitButton type="submit" onClick={onClickButton}>
>>>>>>> develop
                {t('JobPage.submit')}
            </StyledSubmitButton>
        </>
    );
};

export default Filters;
