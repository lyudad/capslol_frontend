import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import {
    Page,
    ListContainer,
    Title,
    JobsContainer,
    JobsList,
    JobCard,
} from './styles';
import JobsListCard from '../JobsPage/JobListCard/index';

const OffersPage: React.FC = () => {
    const { t } = useTranslation();

    const jobsData = useAppSelector((state) => state.jobsReducer.jobs);

    return (
        <Page>
            <Title>{t('JobPage.jobPageTitle')}</Title>
            <JobsContainer>
                <ListContainer>
                    <JobsList>
                        <li>qwertyuiop</li>
                    </JobsList>

                    {/* {jobsData && (
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
                    )} */}
                </ListContainer>
            </JobsContainer>
        </Page>
    );
};

export default OffersPage;
