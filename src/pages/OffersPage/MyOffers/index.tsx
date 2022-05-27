import { useTranslation } from 'react-i18next';
import { ListContainer, ListWrapper, List, Title } from '../styles';
import OfferCard from '../OfferCard/index';

const MyOffers: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Title>{t('OffersPage.myOffers')}</Title>
            <ListWrapper>
                <ListContainer>
                    <List>
                        <ul>
                            <OfferCard />
                        </ul>
                        <ul>
                            <OfferCard />
                        </ul>
                        <ul>
                            <OfferCard />
                        </ul>
                        <ul>
                            <OfferCard />
                        </ul>
                    </List>
                </ListContainer>
            </ListWrapper>
        </>
    );
};

export default MyOffers;
