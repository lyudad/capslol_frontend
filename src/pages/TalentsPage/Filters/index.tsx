/* eslint-disable no-unused-expressions */
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/redux';
import { useLazyGetTalentsByQueriesQuery } from 'store/apis/talents';
import { useGetCategoriesQuery, useGetSkillsQuery } from 'store/apis/jobs';
import { Select, Form, Button, Input } from 'antd';
import { setTalents } from 'store/slices/talents/talents.slice';
import { colors } from 'constants/index';
import Spinner from 'components/Spinner';
import { IQueryFilters } from './props';
import { FilterTitle, StyledFilter, ButtonsItem, Title } from './styles';
import 'antd/dist/antd.min.css';

const { Option } = Select;

const Filters: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string | null>();
    const [categoryQuery, setCategoryQuery] = useState<string>();
    const [skillsQuery, setSkillsQuery] = useState<string>();

    const [initialSearchQuery, setInitialSearchQuery] = useState<
        string | undefined
    >(sessionStorage.getItem('searchQuery')?.substring(3));

    const [initialCategoryQuery, setInitialCategoryQuery] = useState<
        string | null | undefined
    >(sessionStorage.getItem('categoryQuery')?.substring(10));

    const [initialSkillsQuery, setInitialSkillsQuery] = useState<string>(
        sessionStorage.getItem('skillsArray') as string
    );

    const [form] = Form.useForm();

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const [getTalentsByQueries, { isLoading }] =
        useLazyGetTalentsByQueriesQuery();

    const { data: categoryData } = useGetCategoriesQuery();

    const { data: skillsData } = useGetSkillsQuery();

    useEffect(() => {
        const handleGetJobs = async (): Promise<void> => {
            const query = `/search?${
                sessionStorage.getItem('searchQuery') || ''
            }${sessionStorage.getItem('categoryQuery') || ''}${
                sessionStorage.getItem('skillQuery') || ''
            }`;
            const talents = await getTalentsByQueries(query).unwrap();
            dispatch(setTalents(talents));
        };
        handleGetJobs();
    }, [
        dispatch,
        getTalentsByQueries,
        searchQuery,
        categoryQuery,
        skillsQuery,
    ]);

    const onFinish = (values: IQueryFilters): void => {
        if (values.searchValue) {
            sessionStorage.setItem('searchQuery', `&q=${values.searchValue}`);
            setInitialSearchQuery(values.searchValue);
        }
        if (values.category) {
            sessionStorage.setItem(
                'categoryQuery',
                `&category=${values.category}`
            );
            setInitialCategoryQuery(String(values.category));
        }
        if (values.filteredSkills) {
            sessionStorage.setItem(
                'skillsArray',
                JSON.stringify(values?.filteredSkills)
            );
            sessionStorage.setItem(
                'skillQuery',
                `&skills=${values.filteredSkills?.join('')}`
            );
        }

        setSearchQuery(`&q=${values.searchValue}`);

        values.category
            ? setCategoryQuery(`&category=${values.category}`)
            : setCategoryQuery('');

        values.filteredSkills
            ? setSkillsQuery(`&skills=${values.filteredSkills?.join('')}`)
            : setSkillsQuery('');
    };
    const onReset = async (): Promise<void> => {
        setSearchQuery('');
        setCategoryQuery('');
        setSkillsQuery('');
        await sessionStorage.clear();
        await setInitialCategoryQuery('');
        await setInitialSearchQuery('');
        await setInitialSkillsQuery('');
        await form.resetFields();
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
                    searchValue: initialSearchQuery,
                    category: Number(initialCategoryQuery) || undefined,
                    filteredSkills: initialSkillsQuery
                        ? JSON.parse(initialSkillsQuery)
                        : undefined,
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
                            dropdownStyle={{ position: 'fixed' }}
                            placeholder="Please select"
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
                            dropdownStyle={{ position: 'fixed' }}
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
