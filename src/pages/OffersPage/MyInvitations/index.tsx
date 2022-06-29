import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import { Col, Row } from 'antd';
import { StyledPagination } from 'components/StyledPagination/pagination-styles';
import EmptyListNotification from 'components/EmptyListNotification';
import { useGetFilteredInvitationsQuery } from 'store/apis/invitations';
import {
    IMyInvitation,
    InvitationOptionsInterface,
} from 'store/apis/invitations/invitations.types';
import { HideWrapper } from 'components/HideWrapper/styles';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import { ListContainer, ListWrapper, List, Title } from '../styles';
import InvitationCard from '../InvitationCard';

const MyInvitations: React.FC = () => {
    const [filter, setFilter] = useState<InvitationOptionsInterface>({
        page: 1,
    });
    const { t } = useTranslation();
    const myId = useAppSelector((state) => state.auth.user?.id);

    useEffect((): void => {
        setFilter({ freelancerId: myId });
    }, [myId]);

    const { data: invitationsData, isLoading } =
        useGetFilteredInvitationsQuery(filter);

    return (
        <>
            <Title>{t('OffersPage.myInvitations')}</Title>
            <ListWrapper>
                <SpinnerWrapper isLoading={isLoading}>
                    <ListContainer>
                        <List>
                            {invitationsData?.data.map(
                                (item: IMyInvitation) => {
                                    const { id } = item;
                                    return (
                                        <ul key={id}>
                                            <InvitationCard
                                                invitationObj={item}
                                            />
                                        </ul>
                                    );
                                }
                            )}
                        </List>
                    </ListContainer>
                    <HideWrapper showWhen={!invitationsData?.data.length}>
                        <EmptyListNotification
                            note={t('Notes.youDon-tHaveInvitations')}
                        />
                    </HideWrapper>
                </SpinnerWrapper>
            </ListWrapper>
            <HideWrapper
                showWhen={
                    !!invitationsData?.meta.itemCount &&
                    invitationsData?.meta.itemCount > 10
                }
            >
                <Row justify="center">
                    <Col>
                        <StyledPagination
                            defaultCurrent={1}
                            current={invitationsData?.meta.page}
                            total={invitationsData?.meta.itemCount}
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

export default MyInvitations;
