import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import { Col, Row } from 'antd';
import { StyledPagination } from 'components/StyledPagination/pagination-styles';
import { useGetFilteredProposalsQuery } from 'store/apis/proposals';
import EmptyListNotification from 'components/EmptyListNotification';
import { HideWrapper } from 'components/HideWrapper/styles';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import {
    IMyProposal,
    ProposalOptionsInterface,
} from 'store/apis/proposals/proposal.types';
import { useEffect, useState } from 'react';
import { ListContainer, ListWrapper, List, Title } from '../styles';
import ProposalCard from '../ProposalCard';

const MyProposals: React.FC = () => {
    const [filter, setFilter] = useState<ProposalOptionsInterface>({ page: 1 });

    const { t } = useTranslation();

    const myId = useAppSelector((state) => state.auth.user?.id);

    useEffect((): void => {
        setFilter({ freelancerId: myId, page: 1 });
    }, [myId]);

    const { data: proposalsData, isLoading } =
        useGetFilteredProposalsQuery(filter);

    return (
        <>
            <Title>{t('OffersPage.myProposals')}</Title>
            <ListWrapper>
                <SpinnerWrapper isLoading={isLoading}>
                    <ListContainer>
                        <List>
                            {proposalsData?.data.map((item: IMyProposal) => {
                                const { id } = item;
                                return (
                                    <ul key={id}>
                                        <ProposalCard proposalObj={item} />
                                    </ul>
                                );
                            })}
                        </List>
                    </ListContainer>
                    <HideWrapper showWhen={!proposalsData?.data.length}>
                        <EmptyListNotification
                            note={t('Notes.youDon-tHaveProposals')}
                        />
                    </HideWrapper>
                </SpinnerWrapper>
            </ListWrapper>
            <HideWrapper
                showWhen={
                    !!proposalsData?.meta.itemCount &&
                    proposalsData?.meta.itemCount > 10
                }
            >
                <Row justify="center">
                    <Col>
                        <StyledPagination
                            defaultCurrent={1}
                            current={filter?.page}
                            total={proposalsData?.meta.itemCount}
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

export default MyProposals;
