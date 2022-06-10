import { useTranslation } from 'react-i18next';
import { useSearchTalentsQuery } from 'store/apis/talents';
import TalentListCard from './TalentListCard';
import Filters from './Filters';
import {
    Page,
    ListContainer,
    Title,
    TalentsContainer,
    TalentsList,
    FiltersContainer,
    TalentCard,
} from './styles';
import { talentProfile } from './TalentListCard/props';

const TalentsPage: React.FC = () => {
    const { t } = useTranslation();
    const { data } = useSearchTalentsQuery('/');

    return (
        <Page>
            <Title>{t('TalentPage.talents')}</Title>
            <TalentsContainer>
                <FiltersContainer>
                    <Filters />
                </FiltersContainer>
                <ListContainer>
                    {data && (
                        <TalentsList>
                            {data.map((item: talentProfile) => {
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
