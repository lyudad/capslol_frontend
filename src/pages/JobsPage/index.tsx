import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
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

const JobsPage: React.FC = () => {
    const { t } = useTranslation();

    const jobsData = useAppSelector((state) => state.jobsReducer.jobs);

    return (
        <Page>
            <Title>{t('JobPage.jobPageTitle')}</Title>
            <JobsContainer>
                <ListContainer>
                    {jobsData && (
                        <JobsList>
                            {jobsData.map((item) => {
                                const { id } = item;
                                return (
                                    <JobCard key={id}>
                                        <JobsListCard jobObj={item} />
                                    </JobCard>
                                );
                            })}
                        </JobsList>
                    )}
                </ListContainer>
                <FiltersContainer>
                    <Filters />
                </FiltersContainer>
            </JobsContainer>
        </Page>
    );
};

export default JobsPage;
