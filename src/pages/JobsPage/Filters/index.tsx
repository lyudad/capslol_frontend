import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Radio, RadioChangeEvent } from 'antd';
import { colors, skills } from 'constants/index';
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
    const [searchValue, setSearchValue] = useState<string>();
    const [englishLevel, setEnglishLevel] = useState<string>();
    const [timeAvailable, setTimeAvailable] = useState<string>();
    const [filteredSkills, setFilteredSkills] = useState<string[]>();
    const [category, setCategory] = useState<string>();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const { t } = useTranslation();

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
                <FilterTitle>{t('JobPage.englishLevel')}</FilterTitle>
                <Select
                    defaultValue="None"
                    style={{ width: 300 }}
                    onChange={handleChangeEng}
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
                    <Option value="Fluent">{t('JobPage.fluent')}</Option>
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

            <StyledSubmitButton type="submit" onClick={onClickButton}>
                {t('JobPage.submit')}
            </StyledSubmitButton>
        </>
    );
};

export default Filters;
