/* eslint-disable no-unused-expressions */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import { useGetContractsByFreelancerQuery } from 'store/apis/contracts';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import { sortArrByAB } from 'utilities/utilities';
import { ListContainer, ListWrapper, List, Title, Page } from './styles';
import ContractCard from './ContractCard/index';

const ContactsPage: React.FC = () => {
    const { t } = useTranslation();
    const myId = useAppSelector((state) => state.auth.user?.id);
    const { data: contractsData, isLoading } =
        useGetContractsByFreelancerQuery(myId);

    const sortedContracts = useMemo(() => {
        if (contractsData?.length) {
            return sortArrByAB(contractsData, 'closed', 'opened');
        }
        return [];
    }, [contractsData]);

    return (
        <Page>
            <Title>{t('ContractsPage.myContracts')}</Title>
            <ListWrapper>
                <SpinnerWrapper isLoading={isLoading}>
                    <ListContainer>
                        <List>
                            {sortedContracts?.map((item) => {
                                const { id } = item;
                                return (
                                    <ul key={id}>
                                        <ContractCard contractObj={item} />
                                    </ul>
                                );
                            })}
                        </List>
                    </ListContainer>
                </SpinnerWrapper>
            </ListWrapper>
        </Page>
    );
};

export default ContactsPage;
