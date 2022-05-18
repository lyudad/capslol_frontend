import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCategoriesQuery, useGetSkillsQuery } from 'store/apis/jobs';
import { Select, Radio, RadioChangeEvent } from 'antd';
import { colors, langLevel } from 'constants/index';
import {
    Title,
    StyledSlider,
    FilterTitle,
    StyledFilter,
    StyledSearch,
    PriceValue,
    StyledSubmitButton,
    StyledTimeSlider,
} from './styles';
import 'antd/dist/antd.min.css';

const { Option } = Select;

const Filters: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>();
    const [englishLevel, setEnglishLevel] = useState<string>();
    // const [timeAvailable, setTimeAvailable] = useState<string>();
    const [timeAvailable, setTimeAvailable] = useState<number>(
        Math.round(30 * 0.24)
    );
    const [filteredSkills, setFilteredSkills] = useState<string[]>();
    const [category, setCategory] = useState<string>();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const { t } = useTranslation();

    const { data: categoryData } = useGetCategoriesQuery('');

    const { data: skillsData } = useGetSkillsQuery('');

    // console.log('catDATA=', categoryData);

    // console.log('skillsDATA=', skillsData);

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

    const handleChangeCategory = (value: string): void => {
        setCategory(value);
    };

    const priceRange = (value: number[]): void => {
        setMinPrice(value[0] * 100);
        setMaxPrice(value[1] * 100);
    };

    // const onChangeTime = (e: RadioChangeEvent): void => {
    //     setTimeAvailable(e.target.value);
    // };

    const handleChangeSkills = (value: string[]): void => {
        setFilteredSkills(value);
    };

    const onChangeTimeAvailable = (value: number): void => {
        setTimeAvailable(Math.round(value * 0.24));
    };

    // const onAfterChangeTimeAvailable = (value: number): void => {
    //     console.log('onAfterChange: ', value);
    // };

    const categoryChildren = useMemo(() => {
        if (categoryData) {
            const result = [];
            for (let i = 0; i < categoryData.length; i += 1) {
                result.push(
                    <Option
                        key={i}
                        value={categoryData[i].categoryName}
                        label={categoryData[i].categoryName}
                    >
                        <div>{categoryData[i].categoryName}</div>
                    </Option>
                );
            }
            return result;
        }
        return null;
    }, [categoryData]);

    const skillsChildren = useMemo(() => {
        if (skillsData) {
            const result = [];
            for (let i = 0; i < skillsData.length; i += 1) {
                result.push(
                    <Option
                        key={i}
                        value={skillsData[i].name}
                        label={skillsData[i].name}
                    >
                        <div>{skillsData[i].name}</div>
                    </Option>
                );
            }
            return result;
        }
        return null;
    }, [skillsData]);

    const langChildren = useMemo(() => {
        const result = [];
        for (let i = 0; i < langLevel.length; i += 1) {
            result.push(
                <Option key={i} value={langLevel[i]} label={langLevel[i]}>
                    <div>{langLevel[i]}</div>
                </Option>
            );
        }
        return result;
    }, []);

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
                <FilterTitle>{t('JobPage.Category')}</FilterTitle>
                <Select
                    style={{ width: 300 }}
                    onChange={handleChangeCategory}
                    placeholder="select category"
                >
                    {categoryChildren}
                </Select>
            </StyledFilter>

            <StyledFilter>
                <FilterTitle>{t('JobPage.englishLevel')}</FilterTitle>
                <Select
                    defaultValue="None"
                    style={{ width: 300 }}
                    onChange={handleChangeEng}
                >
                    {langChildren}
                </Select>
            </StyledFilter>

            <StyledFilter>
                <FilterTitle>{t('JobPage.Skills')}</FilterTitle>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: 300 }}
                    placeholder="Please select"
                    onChange={handleChangeSkills}
                >
                    {skillsChildren}
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
                    onAfterChange={priceRange}
                    trackStyle={[{ backgroundColor: `${colors.brandColor} ` }]}
                />
            </StyledFilter>

            <StyledFilter>
                <FilterTitle>{t('JobPage.TimeAvailable')}</FilterTitle>
                {/* <Radio.Group onChange={onChangeTime} value={timeAvailable}>
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
                </Radio.Group> */}

                <PriceValue>
                    <span>time: {`${timeAvailable}`} h/day</span>
                </PriceValue>
                <StyledTimeSlider
                    defaultValue={30}
                    onChange={onChangeTimeAvailable}
                    // onAfterChange={onAfterChangeTimeAvailable}
                />
            </StyledFilter>

            <StyledSubmitButton type="submit" onClick={onClickButton}>
                {t('JobPage.submit')}
            </StyledSubmitButton>
        </>
    );
};

export default Filters;
