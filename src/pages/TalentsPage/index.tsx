import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import { useGetInvitationsByJobOwnerQuery } from 'store/apis/invitations';
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
    const { user: userStore } = useAppSelector((s) => s.auth);
    const allUsers = useAppSelector((state) => state.talentsReducer.talents);

    const data = allUsers.filter((item) => item.user?.role === 'Freelancer');
    const { data: myInvitations } = useGetInvitationsByJobOwnerQuery(
        userStore?.id
    );
    const idArray: Array<number> = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    myInvitations?.map((e: any) => idArray.push(e.freelancerId.id));

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
                                        <TalentListCard
                                            jobObj={item}
                                            idArray={idArray}
                                        />
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
