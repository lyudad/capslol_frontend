import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import { useGetProposalsByFreelancerQuery } from 'store/apis/proposals';
import Spinner from 'components/Spinner';
import EmptyListNotification from 'components/EmptyListNotification';
import { ListContainer, ListWrapper, List, Title } from '../styles';
import ProposalCard from '../ProposalCard';

const MyProposals: React.FC = () => {
    const { t } = useTranslation();

    const myId = useAppSelector((state) => state.auth.user?.id);

    const { data: proposalsData, isLoading } =
        useGetProposalsByFreelancerQuery(myId);

    return (
        <>
            <Title>{t('OffersPage.myProposals')}</Title>
            <ListWrapper>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <ListContainer>
                        <List>
                            {proposalsData?.map((item) => {
                                const { id } = item;
                                return (
                                    <ul key={id}>
                                        <ProposalCard proposalObj={item} />
                                    </ul>
                                );
                            })}
                        </List>
                    </ListContainer>
                )}
                <EmptyListNotification />
            </ListWrapper>
        </>
    );
};

export default MyProposals;
