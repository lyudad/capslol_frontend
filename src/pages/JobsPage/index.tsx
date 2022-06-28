/* eslint-disable no-unused-expressions */
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { useGetFilteredJobsQuery } from 'store/apis/jobs';
import { useMemo, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import { useLazyGetFreelancerProfileQuery } from 'store/apis/publicProfile';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import EmptyListNotification from 'components/EmptyListNotification';
import { JobInterface, JobsOptionsInterface } from 'store/apis/jobs/jobs.types';
import { HideWrapper } from 'components/HideWrapper/styles';
import { StyledPagination } from 'components/StyledPagination/pagination-styles';
import {
    Page,
    ListContainer,
    Title,
    JobsContainer,
    JobsList,
    JobCard,
    FiltersContainer,
} from './styles';
import JobsListCard from './JobListCard';
import { IQueryFilters } from './Filters/props';
import Filters from './Filters';

const JobsPage: React.FC = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState<JobsOptionsInterface>({
        page: 1,
    });

    const userId = useAppSelector((state) => state.auth.user?.id);

    const [getProfile] = useLazyGetFreelancerProfileQuery();

    useMemo(async (): Promise<IQueryFilters> => {
        const profile = await getProfile(userId).unwrap();
        const query: JobsOptionsInterface = {};
        if (profile) {
            const { categories, english, hourRate, availableHours, skills } =
                profile;

            if (categories) {
                query.category = categories.id;
            }
            if (skills.length > 0) {
                query.skills = skills.map((item) => item.id);
            }
            if (english) {
                query.languageLevel = english;
            }
            if (hourRate) {
                query.price = hourRate;
            }
            if (availableHours) {
                query.timeAvailable = availableHours;
            }

            setFilter(query);
        }
        return query;
    }, [getProfile, userId]);

    const { data: jobs, isLoading } = useGetFilteredJobsQuery(filter);

    const onFinish = (value: IQueryFilters): void => {
        const query: JobsOptionsInterface = {};

        if (value.query) {
            query.q = value.query;
        }

        if (value.categoryId) {
            query.category = value.categoryId;
        }
        if (value.skillIds && value.skillIds.length > 0) {
            query.skills = value.skillIds;
        }

        if (value.englishLevel) {
            query.languageLevel = value.englishLevel;
        }

        if (value.maxSalary) {
            query.price = value.maxSalary;
        }

        if (value.projectDuration) {
            query.projectDuration = value.projectDuration;
        }

        if (value.timeAvailable) {
            query.timeAvailable = value.timeAvailable;
        }
        setFilter(query);
    };

    const onRestartIfReset = (): void => {
        setFilter({ page: 1 });
    };

    return (
        <Page>
            <Title>{t('JobPage.jobPageTitle')}</Title>
            <JobsContainer>
                <SpinnerWrapper isLoading={isLoading}>
                    <FiltersContainer>
                        <Filters
                            submitHandler={onFinish}
                            userFilter={filter}
                            onRestart={onRestartIfReset}
                        />
                    </FiltersContainer>
                    <ListContainer>
                        <JobsList>
                            {jobs?.data.map((item: JobInterface) => {
                                const { id, isArchived } = item;
                                return (
                                    <JobCard archived={isArchived} key={id}>
                                        <JobsListCard jobObj={item} />
                                    </JobCard>
                                );
                            })}
                        </JobsList>
                        <HideWrapper showWhen={!jobs?.data.length}>
                            <EmptyListNotification
                                note={t('Notes.noProjectsWereFound')}
                            />
                        </HideWrapper>
                        <HideWrapper
                            showWhen={
                                !!jobs?.meta.itemCount &&
                                jobs?.meta.itemCount > 10
                            }
                        >
                            <Row justify="center">
                                <Col>
                                    <StyledPagination
                                        defaultCurrent={1}
                                        current={jobs?.meta.page}
                                        total={jobs?.meta.itemCount}
                                        onChange={(targetPage) =>
                                            setFilter((prev) => ({
                                                ...prev,
                                                page: targetPage,
                                            }))
                                        }
                                    />
                                </Col>
                            </Row>
                        </HideWrapper>
                    </ListContainer>
                </SpinnerWrapper>
            </JobsContainer>
        </Page>
    );
};

export default JobsPage;
