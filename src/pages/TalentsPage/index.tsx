import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import { colors } from 'constants/index';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { StyledPagination } from 'components/StyledPagination/pagination-styles';
import {
    IMyInvitation,
    MetaInterface,
} from 'store/apis/invitations/invitations.types';
import { useLazyGetTalentsByQueriesQuery } from 'store/apis/talents';
import { useGetCategoriesQuery, useGetSkillsQuery } from 'store/apis/jobs';
import { HideWrapper } from 'components/HideWrapper/styles';
import { IQueryFilters, talentProfile } from './TalentListCard/props';
import TalentListCard from './TalentListCard';
import {
    Page,
    ListContainer,
    Title,
    TitleFilter,
    TalentsContainer,
    TalentsList,
    FiltersContainer,
    TalentCard,
    StyledFilter,
    FilterTitle,
    ButtonsItem,
} from './styles';

const { Option } = Select;

const TalentsPage: React.FC = () => {
    const [filter, setFilter] = useState<number>(1);
    const [meta, setMeta] = useState<MetaInterface | undefined>();

    const [data, setData] = useState<talentProfile[]>();
    const [myInvitations, setMyInvitations] = useState<IMyInvitation[]>();
    const [getTalentsByQueries] = useLazyGetTalentsByQueriesQuery();
    const [form] = Form.useForm();

    const [searchQuery, setSearchQuery] = useState<string | null>();
    const [categoryQuery, setCategoryQuery] = useState<string | undefined>();
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

    const { t } = useTranslation();
    const { data: categoryData } = useGetCategoriesQuery();
    const { data: skillsData } = useGetSkillsQuery();

    const { user: userStore } = useAppSelector((s) => s.auth);

    useEffect(() => {
        const handleGetJobs = async (): Promise<void> => {
            const query = `${sessionStorage.getItem('searchQuery') || ''}${
                sessionStorage.getItem('categoryQuery') || ''
            }${
                sessionStorage.getItem('skillQuery') || ''
            }&page=${filter}&user=${userStore?.id}`;

            const talents = await getTalentsByQueries(query).unwrap();
            setMeta(talents.meta);
            setData(talents.data);
            setMyInvitations(talents.invatation);
        };
        handleGetJobs();
    }, [
        getTalentsByQueries,
        userStore?.id,
        searchQuery,
        categoryQuery,
        skillsQuery,
        filter,
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
        setCategoryQuery(`&category=${values.category}`);
        setSkillsQuery(`&skills=${values.filteredSkills?.join('')}`);
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

    const idArray: Array<number> = [];

    myInvitations?.map((e: IMyInvitation) =>
        idArray.push(e.freelancerId.id as number)
    );

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
        <Page>
            <Title>{t('TalentPage.talents')}</Title>
            <TalentsContainer>
                <FiltersContainer>
                    <TitleFilter>{t('JobPage.filters')}</TitleFilter>
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
                </FiltersContainer>
                <ListContainer>
                    {data && (
                        <TalentsList style={{ paddingBottom: 24 }}>
                            {data.map((item: talentProfile) => {
                                const { id } = item;

                                return (
                                    <TalentCard key={id}>
                                        <TalentListCard
                                            jobObj={item}
                                            freelancerIdInInvitations={idArray}
                                        />
                                    </TalentCard>
                                );
                            })}
                        </TalentsList>
                    )}
                    <HideWrapper showWhen={meta && meta?.itemCount > 12}>
                        <Row justify="center">
                            <Col>
                                <StyledPagination
                                    defaultCurrent={meta?.page}
                                    current={filter}
                                    total={meta?.itemCount}
                                    onChange={(targetPage) =>
                                        setFilter(targetPage)
                                    }
                                />
                            </Col>
                        </Row>
                    </HideWrapper>
                </ListContainer>
            </TalentsContainer>
        </Page>
    );
};

export default TalentsPage;
