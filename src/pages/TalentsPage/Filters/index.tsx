/* eslint-disable no-unused-expressions */
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setJobs } from 'store/slices/jobs/jobs.slice';
import {
    useGetCategoriesQuery,
    useGetSkillsQuery,
    useLazyGetJobsQuery,
    useLazyGetUserProfileQuery,
} from 'store/apis/jobs';
import { Select, Form, Button, Input } from 'antd';
import { colors } from 'constants/index';
import Spinner from 'components/Spinner';
import { IQueryFilters } from './props';
import { Title, FilterTitle, StyledFilter, ButtonsItem } from './styles';
import 'antd/dist/antd.min.css';

const { Option } = Select;

const Filters: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [categoryQuery, setCategoryQuery] = useState<string>('');
    const [hoursQuery, setHoursQuery] = useState<string>('');
    const [languageLevelQuery, setLanguageLevelQuery] = useState<string>('');
    const [timeAvailableQuery, setTimeAvailableQuery] = useState<string>('');
    const [skillsQuery, setSkillsQuery] = useState<string>('');

    const [form] = Form.useForm();

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const [getJobs, { isLoading }] = useLazyGetJobsQuery();

    const [getUserProfile] = useLazyGetUserProfileQuery();

    const { data: categoryData } = useGetCategoriesQuery();

    const { data: skillsData } = useGetSkillsQuery();

    const userId = useAppSelector((state) => state.auth.user?.id);

    const onFill = (catId: number, skills: number[] | undefined): void => {
        form.setFieldsValue({
            category: catId,
            filteredSkills: skills,
        });
    };

    useEffect(() => {
        const handleGetProfile = async (): Promise<void> => {
            const profile = await getUserProfile(userId).unwrap();

            profile?.categories.id
                ? setCategoryQuery(`&category=${profile?.categories.id}`)
                : setCategoryQuery('');

            profile?.skills
                ? setSkillsQuery(
                      `&skills=${profile?.skills
                          .map((item) => item.id)
                          .join('')}`
                  )
                : setSkillsQuery('');

            onFill(
                profile?.categories.id,
                profile?.skills.map((item) => item.id)
            );
        };
        handleGetProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, getUserProfile]);

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

        values.category
            ? setCategoryQuery(`&category=${values.category}`)
            : setCategoryQuery('');

        values.filteredSkills
            ? setSkillsQuery(`&skills=${values.filteredSkills?.join('')}`)
            : setSkillsQuery('');
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

    return (
        <>
            {isLoading && <Spinner />}
            <Title>{t('JobPage.filters')}</Title>
            <Form
                form={form}
                name="basic"
                initialValues={{
                    category: undefined,
                    filteredSkills: undefined,
                    searchValue: '',
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
