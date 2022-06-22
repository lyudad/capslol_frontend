import { useTranslation } from 'react-i18next';
import { Col, Pagination, Row } from 'antd';
import { useGetFilteredJobsQuery } from 'store/apis/jobs';
import { useState } from 'react';
import { JobInterface, JobsOptionsInterface } from 'store/apis/jobs/jobs.types';
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
import Filters from './Filters';
import { IQueryFilters } from './Filters/props';

const JobsPage: React.FC = () => {
    const { t } = useTranslation();

    const [filter, setFilter] = useState<JobsOptionsInterface>({
        page: 1,
    });
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

    return (
        <Page>
            <Title>{t('JobPage.jobPageTitle')}</Title>
            <JobsContainer>
                <FiltersContainer>
                    <Filters submitHandler={onFinish} />
                </FiltersContainer>
                <ListContainer>
                    {isLoading ? (
                        <h1>Loading...</h1>
                    ) : (
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
                    )}

                    <Row justify="center">
                        <Col>
                            <Pagination
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
                </ListContainer>
            </JobsContainer>
        </Page>
    );
};

export default JobsPage;
