import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import {
    useGetContractsByFreelancerQuery,
    useGetContractsByOwnerQuery,
} from 'store/apis/contracts';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import { sortContractsByAB } from 'utilities/utilities';
import { HideWrapper } from 'components/HideWrapper/styles';
import EmptyListNotification from 'components/EmptyListNotification';
import { IContract } from 'store/apis/contracts/contracts.types';
import { userRole } from 'constants/index';
import { ListContainer, ListWrapper, List, Title, Page } from './styles';
import ContractCard from './ContractCard/index';

const ContactsPage: React.FC = () => {
    const { t } = useTranslation();
    const myId = useAppSelector((state) => state.auth.user?.id);
    const currentRole = useAppSelector((state) => state.auth.user?.role);

    const { data: contractsDataForFreelancer, isLoading } =
        useGetContractsByFreelancerQuery(myId);

    const { data: contractsDataForOwner, isLoading: loading } =
        useGetContractsByOwnerQuery(myId);

    const sortedContracts = useMemo(() => {
        if (
            currentRole === userRole.freelancer &&
            contractsDataForFreelancer?.length
        ) {
            return sortContractsByAB(
                contractsDataForFreelancer,
                'closed',
                'opened'
            );
        }
        if (currentRole === userRole.owner && contractsDataForOwner?.length) {
            return sortContractsByAB(contractsDataForOwner, 'closed', 'opened');
        }
        return [];
    }, [currentRole, contractsDataForFreelancer, contractsDataForOwner]);

    return (
        <Page>
            <Title>{t('ContractsPage.myContracts')}</Title>
            <ListWrapper>
                <SpinnerWrapper isLoading={isLoading || loading}>
                    <ListContainer>
                        <List>
                            {sortedContracts?.map((item: IContract) => {
                                const { id } = item;
                                return (
                                    <ul key={id}>
                                        <ContractCard contractObj={item} />
                                    </ul>
                                );
                            })}
                        </List>
                    </ListContainer>
                    <HideWrapper showWhen={!sortedContracts?.length}>
                        <EmptyListNotification
                            note={t('Notes.youDon-tHaveContracts')}
                        />
                    </HideWrapper>
                </SpinnerWrapper>
            </ListWrapper>
        </Page>
    );
};

export default ContactsPage;
