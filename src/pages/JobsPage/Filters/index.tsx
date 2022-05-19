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
    StyledRangeSlider,
    FilterTitle,
    StyledFilter,
    PriceValue,
    ButtonsItem,
} from './styles';
import 'antd/dist/antd.min.css';

const { Option } = Select;

const Filters: React.FC = () => {
    const initialState = {
        category: '',
        englishLevel: '',
        filteredSkills: [],
        maxSalary: undefined,
        searchValue: '',
        timeAvailable: undefined,
    };
    const [queryFilters, setQueryFilters] =
        useState<IQueryFilters>(initialState);
    const [timeAvailable, setTimeAvailable] = useState<number>();
    const [maxSalary, setMaxSalary] = useState<number>();
    // const [minPrice, setMinPrice] = useState(0);
    // const [maxPrice, setMaxPrice] = useState(10000); //Math.round(30 * 0.24)

    const [form] = Form.useForm();

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const [getJobs] = useLazyGetJobsQuery();

    const { data: categoryData } = useGetCategoriesQuery('');

    const { data: skillsData } = useGetSkillsQuery('');

    const handleGetJobs = async (filters: IQueryFilters): Promise<void> => {
        const query = `?q=${filters?.searchValue}`;
        const jobs = await getJobs(query).unwrap();
        dispatch(setJobs(jobs));
        // console.log('JOBS=', jobs);
    };

    useEffect(() => {
        handleGetJobs(queryFilters);
    }, [queryFilters]);

    const onFinish = (values: IQueryFilters): void => {
        console.log('Success:', values);
        setQueryFilters(values);
    };

    const onReset = (): void => {
        form.resetFields();
    };

    const onFill = (): void => {
        form.setFieldsValue({
            category: 'Hello world!',
            englishLevel: 'None',
            filteredSkills: ['hello', 'world'],
            maxSalary: 50,
            timeAvailable: 30,
        });
    };

    // const priceRange = (value: number[]): void => {
    //     setMinPrice(value[0] * 100);
    //     setMaxPrice(value[1] * 100);
    // };

    const onChangeSalary = (value: number): void => {
        setMaxSalary(Math.round(value * 50));
    };

    const onChangeTimeAvailable = (value: number): void => {
        setTimeAvailable(Math.round(value * 0.24));
    };

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
            <Form
                form={form}
                name="basic"
                initialValues={initialState}
                onFinish={onFinish}
                // onReset={onReset}
                // onFinishFailed={onFinishFailed}
                // autoComplete="on"
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
                        <StyledSlider onChange={onChangeSalary} />
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
                        <StyledSlider
                            // defaultValue={30}
                            onChange={onChangeTimeAvailable}
                        />
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

            {/* <PriceValue>
                    <span>min: {`${minPrice}`}</span>
                    <span>max: {`${maxPrice}`}</span>
                </PriceValue>
                <StyledRangeSlider
                    range
                    step={5}
                    defaultValue={[0, 100]}
                    onAfterChange={priceRange}
                    trackStyle={[{ backgroundColor: `${colors.brandColor} ` }]}
                /> */}
        </>
    );
};

export default Filters;
