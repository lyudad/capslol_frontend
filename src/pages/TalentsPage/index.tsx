import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import EmptyListNotification from 'components/EmptyListNotification';
import { userRole } from 'constants/index';
import { useGetInvitationsByJobOwnerQuery } from 'store/apis/invitations';
import { IMyInvitation } from 'store/apis/invitations/invitations.types';
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

    const data = allUsers.filter(
        (item) => item.user?.role === userRole.freelancer
    );
    const { data: myInvitations } = useGetInvitationsByJobOwnerQuery(
        userStore?.id
    );
    const idArray: Array<number> = [];

    myInvitations?.map((e: IMyInvitation) =>
        idArray.push(e.freelancerId.id as number)
    );

    return (
        <Page>
            <Title>{t('TalentPage.talents')}</Title>
            <TalentsContainer>
                <FiltersContainer>
                    <Filters />
                </FiltersContainer>
                <ListContainer>
                    {!data.length ? (
                        <EmptyListNotification
                            note={t('Notes.noProjectsWereFound')}
                        />
                    ) : (
                        <TalentsList>
                            {data.map((item: talentProfile) => {
                                const { id } = item;

                                return (
                                    <TalentCard key={id}>
                                        <TalentListCard
                                            jobObj={item}
                                            freelancerIdInInvitations={idArray}
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
