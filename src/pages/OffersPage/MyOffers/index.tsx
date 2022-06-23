import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import { useMemo } from 'react';
import { sortOffersByAB } from 'utilities/utilities';
import { HideWrapper } from 'components/HideWrapper/styles';
import EmptyListNotification from 'components/EmptyListNotification';
import { useGetOffersByFreelancerQuery } from 'store/apis/offers';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import { ListContainer, List, Title, ListWrapper } from '../styles';
import OfferCard from '../OfferCard/index';

const MyOffers: React.FC = () => {
    const { t } = useTranslation();

    const myId = useAppSelector((state) => state.auth.user?.id);

    const { data: offersData, isLoading } = useGetOffersByFreelancerQuery(myId);

    const sortedOffers = useMemo(() => {
        if (offersData?.length) {
            return sortOffersByAB(offersData, 'Accepted', 'Pending');
        }
        return [];
    }, [offersData]);

    return (
        <>
            <Title>{t('OffersPage.myOffers')}</Title>
            <ListWrapper>
                <SpinnerWrapper isLoading={isLoading}>
                    <ListContainer>
                        <List>
                            {sortedOffers?.map((item) => {
                                const { id } = item;
                                return (
                                    <ul key={id}>
                                        <OfferCard offerObj={item} />
                                    </ul>
                                );
                            })}
                        </List>
                    </ListContainer>
                    <HideWrapper showWhen={!offersData?.length}>
                        <EmptyListNotification
                            note={t('Notes.youDon-tHaveOffers')}
                        />
                    </HideWrapper>
                </SpinnerWrapper>
            </ListWrapper>
        </>
    );
};

export default MyOffers;
