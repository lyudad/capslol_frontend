import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import { useGetJobsByOwnerQuery } from 'store/apis/jobs';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import JobCard from 'pages/OwnerJobsPage/JobCard/index';
import { ListContainer, ListWrapper, List, Title, TitleBox } from '../styles';
import { StyledNav } from '../JobCard/styles';

interface IProps {
    archived: boolean;
}

const OwnerJobs: React.FC<IProps> = ({ archived }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const userId = useAppSelector((state) => state.auth.user?.id);

    const { data: jobs, isLoading } = useGetJobsByOwnerQuery(userId);

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
                        Create New Job
                    </StyledNav>
                </TitleBox>
            )}

            <ListWrapper>
                <SpinnerWrapper isLoading={isLoading}>
                    <ListContainer>
                        <List>
                            {jobs?.map((item) => {
                                const { id } = item;
                                return (
                                    <ul key={id}>
                                        <JobCard
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
