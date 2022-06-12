import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import { useGetContractsByFreelancerQuery } from 'store/apis/contracts';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import { ListContainer, ListWrapper, List, Title, Page } from './styles';
import ContractCard from './ContractCard/index';

const ContactsPage: React.FC = () => {
    const { t } = useTranslation();

    const myId = useAppSelector((state) => state.auth.user?.id);

    const { data: contractsData, isLoading } =
        useGetContractsByFreelancerQuery(myId);

    return (
        <Page>
            <Title>{t('ContractsPage.myContracts')}</Title>
            <ListWrapper>
                <SpinnerWrapper isLoading={isLoading}>
                    <ListContainer>
                        <List>
                            {contractsData?.map((item) => {
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
