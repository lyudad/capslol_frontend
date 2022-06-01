import { useTranslation } from 'react-i18next';
import { ListContainer, ListWrapper, List, Title } from '../styles';
import InvitationCard from '../InvitationCard';

const MyInvitations: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Title>{t('OffersPage.myInvitations')}</Title>
            <ListWrapper>
                <ListContainer>
                    <List>
                        <ul>
                            <InvitationCard />
                        </ul>
                        <ul>
                            <InvitationCard />
                        </ul>
                    </List>
                </ListContainer>
            </ListWrapper>
        </>
    );
};

export default MyInvitations;
