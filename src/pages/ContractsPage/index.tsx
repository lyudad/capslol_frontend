import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { StyledPagination } from 'components/StyledPagination/pagination-styles';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import { useGetFilteredContractsQuery } from 'store/apis/contracts';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import { HideWrapper } from 'components/HideWrapper/styles';
import EmptyListNotification from 'components/EmptyListNotification';
import {
    ContractsOptionsInterface,
    IContract,
} from 'store/apis/contracts/contracts.types';
import { userRole } from 'constants/index';
import { ListContainer, ListWrapper, List, Title, Page } from './styles';
import ContractCard from './ContractCard/index';

const ContactsPage: React.FC = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState<ContractsOptionsInterface>({
        page: 1,
    });
    const myId = useAppSelector((state) => state.auth.user?.id);
    const currentRole = useAppSelector((state) => state.auth.user?.role);

    useEffect((): void => {
        const query: ContractsOptionsInterface = {};

        if (currentRole === userRole.freelancer) {
            query.freelancerId = myId;
        }
        if (currentRole === userRole.owner) {
            query.ownerId = myId;
        }

        setFilter(query);
    }, [currentRole, myId]);

    const { data: contractsData, isLoading } =
        useGetFilteredContractsQuery(filter);

    return (
        <Page>
            <Title>{t('ContractsPage.myContracts')}</Title>
            <ListWrapper>
                <SpinnerWrapper isLoading={isLoading}>
                    <ListContainer>
                        <List>
                            {contractsData?.data.map((item: IContract) => {
                                const { id } = item;
                                return (
                                    <ul key={id}>
                                        <ContractCard contractObj={item} />
                                    </ul>
                                );
                            })}
                        </List>
                    </ListContainer>
                    <HideWrapper showWhen={!contractsData?.data.length}>
                        <EmptyListNotification
                            note={t('Notes.youDon-tHaveContracts')}
                        />
                    </HideWrapper>
                </SpinnerWrapper>
            </ListWrapper>
            <HideWrapper
                showWhen={
                    !!contractsData?.meta.itemCount &&
                    contractsData?.meta.itemCount > 10
                }
            >
                <Row justify="center">
                    <Col>
                        <StyledPagination
                            defaultCurrent={1}
                            current={contractsData?.meta.page}
                            total={contractsData?.meta.itemCount}
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
        </Page>
    );
};

export default ContactsPage;
