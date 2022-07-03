import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { StyledPagination } from 'components/StyledPagination/pagination-styles';
import { HideWrapper } from 'components/HideWrapper/styles';
import EmptyListNotification from 'components/EmptyListNotification';
import { useGetFilteredOffersQuery } from 'store/apis/offers';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';

import {
    IMyOffer,
    MetaInterface,
    OfferOptionsInterface,
} from 'store/apis/offers/offers.types';
import { sortOffersByABC } from 'utilities/utilities';
import { ListContainer, List, Title, ListWrapper } from '../styles';
import OfferCard from '../OfferCard/index';

const MyOffers: React.FC = () => {
    const { t } = useTranslation();
    const [offersData, setOffersData] = useState<IMyOffer[]>([]);
    const [meta, setMeta] = useState<MetaInterface | null>(null);
    const [filter, setFilter] = useState<OfferOptionsInterface>({
        page: 1,
    });

    const myId = useAppSelector((state) => state.auth.user?.id);

    useEffect((): void => {
        setFilter({ page: 1, freelancerId: myId });
    }, [myId]);

    const { data: offers, isLoading } = useGetFilteredOffersQuery(filter);

    useEffect(() => {
        if (offers) {
            const sortedOffers = sortOffersByABC(
                offers.data,
                'Pending',
                'Accepted',
                'Declined'
            );
            setOffersData(sortedOffers);
            setMeta(offers.meta);
        }
    }, [offers]);

    return (
        <>
            <Title>{t('OffersPage.myOffers')}</Title>
            <ListWrapper>
                <SpinnerWrapper isLoading={isLoading}>
                    <ListContainer>
                        <List>
                            {offersData?.map((item: IMyOffer) => {
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
            <HideWrapper showWhen={!!meta?.itemCount && meta?.itemCount > 10}>
                <Row justify="center">
                    <Col>
                        <StyledPagination
                            defaultCurrent={1}
                            current={filter.page}
                            total={meta?.itemCount}
                            onChange={(targetPage) =>
                                setFilter((prev) => ({
                                    ...prev,
                                    page: targetPage,
                                }))
                            }
                        />
                    </Col>
                </Row>
            </HideWrapper>
        </>
    );
};

export default MyOffers;
