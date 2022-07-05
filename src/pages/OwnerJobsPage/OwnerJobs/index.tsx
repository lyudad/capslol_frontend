/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';
import { StyledPagination } from 'components/StyledPagination/pagination-styles';
import { Paths } from 'router/paths';
import {
    IJob,
    JobsOptionsInterface,
    MetaInterface,
} from 'store/apis/jobs/jobs.types';
import { HideWrapper } from 'components/HideWrapper/styles';
import EmptyListNotification from 'components/EmptyListNotification';
import {
    useArchiveToggleMutation,
    useLazyGetFilteredJobsQuery,
} from 'store/apis/jobs';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import JobCard from 'pages/OwnerJobsPage/JobCard/index';
import { ListContainer, ListWrapper, List, Title, TitleBox } from '../styles';
import { StyledNav } from '../JobCard/styles';

interface IProps {
    archived: boolean;
}

const OwnerJobs: React.FC<IProps> = ({ archived }) => {
    const [ownJobs, setOwnJobs] = useState<IJob[]>([]);
    const [filter, setFilter] = useState<JobsOptionsInterface | null>(null);
    const [meta, setMeta] = useState<MetaInterface | null>(null);

    const { t } = useTranslation();

    const navigate = useNavigate();

    const userId = useAppSelector((state) => state.auth.user?.id);

    const [searchOwnJobs, { isLoading }] = useLazyGetFilteredJobsQuery();

    const [archiveToggle] = useArchiveToggleMutation();

    const onToggleClick = async (id: number): Promise<void> => {
        const archivedJob = await archiveToggle(id).unwrap();
        const filteredJobs = ownJobs?.filter(
            (item) => item.id !== archivedJob.id
        );
        setOwnJobs([...filteredJobs]);
    };

    useEffect((): void => {
        const query: JobsOptionsInterface = {};
        if (archived) {
            query.ownerId = userId;
            query.isArchived = 1;
            query.page = 1;
        }
        if (!archived) {
            query.ownerId = userId;
            query.isArchived = 0;
            query.page = 1;
        }
        setFilter(query);
    }, [archived]);

    useEffect((): void => {
        const reloadJobs = async (): Promise<void> => {
            if (filter) {
                const results = await searchOwnJobs(filter).unwrap();
                setMeta(results.meta);
                setOwnJobs([...results.data]);
            }
        };
        reloadJobs();
    }, [userId, filter]);

    return (
        <>
            {archived ? (
                <TitleBox>
                    <Title>{t('OwnerJobsPage.myArchivalJobs')}</Title>
                </TitleBox>
            ) : (
                <TitleBox>
                    <Title>{t('OwnerJobsPage.myRelJobs')}</Title>
                    <StyledNav onClick={() => navigate(Paths.CREATE_JOB_PAGE)}>
                        {t('OwnerJobsPage.createNewJob')}
                    </StyledNav>
                </TitleBox>
            )}
            <ListWrapper>
                <SpinnerWrapper isLoading={isLoading}>
                    <ListContainer>
                        <List>
                            {ownJobs?.map((item) => {
                                const { id } = item;
                                return (
                                    <ul key={id}>
                                        <JobCard
                                            onToggleClick={onToggleClick}
                                            isArchive={archived}
                                            jobObj={item}
                                        />
                                    </ul>
                                );
                            })}
                        </List>
                    </ListContainer>
                    <HideWrapper showWhen={!archived && !ownJobs.length}>
                        <EmptyListNotification
                            note={t('Notes.youDon-tHaveRelevantProjects')}
                        />
                    </HideWrapper>
                    <HideWrapper showWhen={!!archived && !ownJobs.length}>
                        <EmptyListNotification
                            note={t('Notes.youDon-tHaveArchivalProjects')}
                        />
                    </HideWrapper>
                </SpinnerWrapper>
            </ListWrapper>
            <HideWrapper showWhen={!!meta?.itemCount && meta?.itemCount > 10}>
                <Row justify="center">
                    <Col>
                        <StyledPagination
                            defaultCurrent={1}
                            current={filter?.page}
                            total={meta?.itemCount}
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
        </>
    );
};

export default OwnerJobs;
