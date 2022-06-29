/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
    OfferOptionsInterface,
} from 'store/apis/offers/offers.types';
import { ListContainer, List, Title, ListWrapper } from '../styles';
import OfferCard from '../OfferCard/index';

const MyOffers: React.FC = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState<OfferOptionsInterface>({
        page: 1,
    });

    const myId = useAppSelector((state) => state.auth.user?.id);

    useEffect((): void => {
        const filterSet = (prev: OfferOptionsInterface) =>
            setFilter({ ...prev, freelancerId: myId });
        filterSet(filter);
    }, [myId, filter]);

    const { data: offersData, isLoading } = useGetFilteredOffersQuery(filter);

    return (
        <>
            <Title>{t('OffersPage.myOffers')}</Title>
            <ListWrapper>
                <SpinnerWrapper isLoading={isLoading}>
                    <ListContainer>
                        <List>
                            {offersData?.data.map((item: IMyOffer) => {
                                const { id } = item;
                                return (
                                    <ul key={id}>
                                        <OfferCard offerObj={item} />
                                    </ul>
                                );
                            })}
                        </List>
                    </ListContainer>
                    <HideWrapper showWhen={!offersData?.data.length}>
                        <EmptyListNotification
                            note={t('Notes.youDon-tHaveOffers')}
                        />
                    </HideWrapper>
                </SpinnerWrapper>
            </ListWrapper>
            <HideWrapper
                showWhen={
                    !!offersData?.meta.itemCount &&
                    offersData?.meta.itemCount > 10
                }
            >
                <Row justify="center">
                    <Col>
                        <StyledPagination
                            defaultCurrent={1}
                            current={filter.page}
                            total={offersData?.meta.itemCount}
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
