import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import {
    Page,
    ListContainer,
    Title,
    TalentsContainer,
    TalentsList,
    FiltersContainer,
    TalentCard,
} from './styles';
import TalentListCard from './TalentListCard';
import Filters from './Filters';

const TalentsPage: React.FC = () => {
    const { t } = useTranslation();

    const jobsData = useAppSelector((state) => state.jobsReducer.jobs);

    return (
        <Page>
            <Title>{t('TalentPage.talents')}</Title>
            <TalentsContainer>
                <FiltersContainer>
                    <Filters />
                </FiltersContainer>
                <ListContainer>
                    {jobsData && (
                        <TalentsList>
                            {jobsData.map((item) => {
                                const { id } = item;
                                return (
                                    <TalentCard key={id}>
                                        <TalentListCard jobObj={item} />
                                    </TalentCard>
                                );
                            })}
                        </TalentsList>
                    )}
                </ListContainer>
            </TalentsContainer>
        </Page>
    );
};

export default TalentsPage;
