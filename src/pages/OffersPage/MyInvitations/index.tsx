import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import Spinner from 'components/Spinner';
import EmptyListNotification from 'components/EmptyListNotification';
import { useGetInvitationsByFreelancerQuery } from 'store/apis/invitations';
import { ListContainer, ListWrapper, List, Title } from '../styles';
import InvitationCard from '../InvitationCard';

const MyInvitations: React.FC = () => {
    const { t } = useTranslation();
    const myId = useAppSelector((state) => state.auth.user?.id);

    const { data: invitationsData, isLoading } =
        useGetInvitationsByFreelancerQuery(myId);

    return (
        <>
            <Title>{t('OffersPage.myInvitations')}</Title>
            <ListWrapper>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <ListContainer>
                        <List>
                            {invitationsData?.map((item) => {
                                const { id } = item;
                                return (
                                    <ul key={id}>
                                        <InvitationCard invitationObj={item} />
                                    </ul>
                                );
                            })}
                        </List>
                    </ListContainer>
                )}
                <EmptyListNotification />
            </ListWrapper>
        </>
    );
};

export default MyInvitations;
