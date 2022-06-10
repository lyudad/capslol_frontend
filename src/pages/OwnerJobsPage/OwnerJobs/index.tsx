import { useTranslation } from 'react-i18next';
import { useGetJobsQuery } from 'store/apis/jobs';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import JobCard from 'pages/OwnerJobsPage/JobCard/index';
import { ListContainer, ListWrapper, List, Title } from '../styles';

interface IProps {
    archived: boolean;
}

const OwnerJobs: React.FC<IProps> = ({ archived }) => {
    const { t } = useTranslation();

    const { data: jobs, isLoading } = useGetJobsQuery('');

    return (
        <>
            {archived ? (
                <Title>{t('OwnerJobsPage.myArchivalJobs')}</Title>
            ) : (
                <Title>{t('OwnerJobsPage.myRelJobs')}</Title>
            )}

            <ListWrapper>
                <SpinnerWrapper isLoading={isLoading}>
                    <ListContainer>
                        <List>
                            {jobs?.map((item) => {
                                const { id } = item;
                                return (
                                    <ul key={id}>
                                        <JobCard jobObj={item} />
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
