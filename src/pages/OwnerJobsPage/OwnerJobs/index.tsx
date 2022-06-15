/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import { IJob } from 'store/apis/jobs/jobs.types';
import {
    useLazyGetJobsByOwnerQuery,
    useArchiveToggleMutation,
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
    const { t } = useTranslation();

    const navigate = useNavigate();

    const userId = useAppSelector((state) => state.auth.user?.id);

    const [searchOwnJobs, { isLoading }] = useLazyGetJobsByOwnerQuery();

    const [archiveToggle] = useArchiveToggleMutation();

    const onToggleClick = async (id: number): Promise<void> => {
        const archivedJob = await archiveToggle(id).unwrap();
        const filteredJobs = ownJobs?.filter(
            (item) => item.id !== archivedJob.id
        );
        setOwnJobs([...filteredJobs, archivedJob]);
    };

    useEffect((): void => {
        const reloadJobs = async (): Promise<void> => {
            const results = await searchOwnJobs(userId).unwrap();
            setOwnJobs([...results]);
        };
        reloadJobs();
    }, []);

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
                </SpinnerWrapper>
            </ListWrapper>
        </>
    );
};

export default OwnerJobs;
