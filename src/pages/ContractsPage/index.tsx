import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import Spinner from 'components/Spinner';
import { useGetOffersByFreelancerQuery } from 'store/apis/offers';
import { ListContainer, ListWrapper, List, Title, Page } from './styles';
import OfferCard from './OfferCard/index';

const ContactsPage: React.FC = () => {
    const { t } = useTranslation();

    const myId = useAppSelector((state) => state.auth.user?.id);

    const { data: offersData, isLoading } = useGetOffersByFreelancerQuery(myId);

    return (
        <Page>
            <Title>{t('OffersPage.myOffers')}</Title>
            <ListWrapper>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <ListContainer>
                        <List>
                            {offersData?.map((item) => {
                                const { id } = item;
                                return (
                                    <ul key={id}>
                                        <OfferCard offerObj={item} />
                                    </ul>
                                );
                            })}
                        </List>
                    </ListContainer>
                )}
            </ListWrapper>
        </Page>
    );
};

export default ContactsPage;
