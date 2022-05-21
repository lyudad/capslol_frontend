import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/redux';
import { setJobs } from 'store/slices/jobs/jobs.slice';
import {
    useGetCategoriesQuery,
    useGetSkillsQuery,
    useLazyGetJobsQuery,
} from 'store/apis/jobs';
import { Select, Form, Button, Input } from 'antd';
import { colors, langLevel } from 'constants/index';
import { IQueryFilters } from './props';
import {
    Title,
    StyledSlider,
    FilterTitle,
    StyledFilter,
    PriceValue,
    ButtonsItem,
} from './styles';
import 'antd/dist/antd.min.css';

const { Option } = Select;

const Filters: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [categoryQuery, setCategoryQuery] = useState<string>('');
    const [hoursQuery, setHoursQuery] = useState<string>('');
    const [languageLevelQuery, setLanguageLevelQuery] = useState<string>('');
    const [timeAvailableQuery, setTimeAvailableQuery] = useState<string>('');
    const [skillsQuery, setSkillsQuery] = useState<string>('');
    const [timeAvailable, setTimeAvailable] = useState<number>();
    const [maxSalary, setMaxSalary] = useState<number>();

    const [form] = Form.useForm();

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const [getJobs] = useLazyGetJobsQuery();

    const { data: categoryData } = useGetCategoriesQuery('');

    const { data: skillsData } = useGetSkillsQuery('');

    useEffect(() => {
        const handleGetJobs = async (): Promise<void> => {
            const query = `/search?${searchQuery}${categoryQuery}${hoursQuery}${languageLevelQuery}${timeAvailableQuery}${skillsQuery}`;
            const jobs = await getJobs(query).unwrap();
            dispatch(setJobs(jobs));
        };
        handleGetJobs();
    }, [
        dispatch,
        getJobs,
        searchQuery,
        categoryQuery,
        hoursQuery,
        languageLevelQuery,
        timeAvailableQuery,
        skillsQuery,
    ]);

    const onFinish = (values: IQueryFilters): void => {
        setSearchQuery(`&q=${values.searchValue}`);

        if (values.category) {
            setCategoryQuery(`&category=${values.category}`);
        } else {
            setCategoryQuery('');
        }

        if (values.maxSalary) {
            setHoursQuery(`&price=${values.maxSalary}`);
        } else {
            setHoursQuery('');
        }

        if (values.englishLevel) {
            setLanguageLevelQuery(`&languageLevel=${values.englishLevel}`);
        } else {
            setLanguageLevelQuery('');
        }

        if (values.timeAvailable) {
            setTimeAvailableQuery(
                `&timeAvailable=${Math.round(values.timeAvailable * 0.12)}`
            );
        } else {
            setTimeAvailableQuery('');
        }

        if (values.filteredSkills) {
            setSkillsQuery(`&skills=${values.filteredSkills?.join('')}`);
        } else {
            setSkillsQuery('');
        }
    };

    const onReset = (): void => {
        form.resetFields();
        setSearchQuery('');
        setCategoryQuery('');
        setHoursQuery('');
        setLanguageLevelQuery('');
        setTimeAvailableQuery('');
        setSkillsQuery('');
    };

    const onChangeSalary = (value: number): void => {
        setMaxSalary(value);
    };

    const onChangeTimeAvailable = (value: number): void => {
        setTimeAvailable(Math.round(value * 0.12));
    };

    const categoryChildren = useMemo(() => {
        if (categoryData) {
            const result = [];
            for (let i = 0; i < categoryData.length; i += 1) {
                result.push(
                    <Option
                        key={i}
                        value={categoryData[i].id}
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
                        value={skillsData[i].id}
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
            <Form
                form={form}
                name="basic"
                initialValues={{
                    category: undefined,
                    englishLevel: '',
                    filteredSkills: undefined,
                    maxSalary: undefined,
                    searchValue: '',
                    timeAvailable: undefined,
                }}
                onFinish={onFinish}
            >
                <StyledFilter>
                    <FilterTitle>{t('JobPage.search')}</FilterTitle>
                    <Form.Item
                        name="searchValue"
                        style={{
                            marginBottom: '0px',
                        }}
                    >
                        <Input
                            placeholder="Please enter"
                            style={{ width: 300 }}
                        />
                    </Form.Item>
                </StyledFilter>

                <StyledFilter>
                    <FilterTitle>{t('JobPage.Category')}</FilterTitle>
                    <Form.Item name="category" noStyle>
                        <Select
                            placeholder="Select category"
                            style={{ width: 300 }}
                        >
                            <Option value="" label="All">
                                <div>All</div>
                            </Option>
                            {categoryChildren}
                        </Select>
                    </Form.Item>
                </StyledFilter>

                <StyledFilter>
                    <FilterTitle>{t('JobPage.englishLevel')}</FilterTitle>
                    <Form.Item name="englishLevel" noStyle>
                        <Select style={{ width: 300 }}>
                            <Option value="" label="All">
                                <div>All</div>
                            </Option>
                            {langChildren}
                        </Select>
                    </Form.Item>
                </StyledFilter>

                <StyledFilter>
                    <FilterTitle>{t('JobPage.Skills')}</FilterTitle>
                    <Form.Item name="filteredSkills" noStyle>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: 300 }}
                            placeholder="Please select"
                        >
                            {skillsChildren}
                        </Select>
                    </Form.Item>
                </StyledFilter>

                <StyledFilter>
                    <FilterTitle>{t('JobPage.price')}</FilterTitle>
                    <PriceValue>
                        <span>min: 0$</span>
                        <span>max: {maxSalary && `${maxSalary}`}$</span>
                    </PriceValue>
                    <Form.Item name="maxSalary" noStyle>
                        <StyledSlider
                            // step={10}
                            onChange={onChangeSalary}
                        />
                    </Form.Item>
                </StyledFilter>

                <StyledFilter>
                    <FilterTitle>{t('JobPage.TimeAvailable')}</FilterTitle>
                    <PriceValue>
                        <span>
                            time: {timeAvailable && `${timeAvailable}`} h/day
                        </span>
                    </PriceValue>
                    <Form.Item name="timeAvailable" noStyle>
                        <StyledSlider onChange={onChangeTimeAvailable} />
                    </Form.Item>
                </StyledFilter>

                <ButtonsItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: 80,
                            background: `${colors.brandColor}`,
                            borderColor: `${colors.brandColor}`,
                            marginTop: '12px',
                        }}
                    >
                        {t('JobPage.submit')}
                    </Button>
                    <Button
                        type="primary"
                        htmlType="button"
                        onClick={onReset}
                        style={{
                            width: 80,
                            background: `${colors.brandColor}`,
                            borderColor: `${colors.brandColor}`,
                            marginTop: '12px',
                        }}
                    >
                        Reset
                    </Button>
                </ButtonsItem>
            </Form>
        </>
    );
};

export default Filters;
