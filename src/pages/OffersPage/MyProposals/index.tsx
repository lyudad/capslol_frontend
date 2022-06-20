import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/redux';
import { useGetProposalsByFreelancerQuery } from 'store/apis/proposals';
import EmptyListNotification from 'components/EmptyListNotification';
import { HideWrapper } from 'components/HideWrapper/styles';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
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
                <SpinnerWrapper isLoading={isLoading}>
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
                    <HideWrapper showWhen={!proposalsData?.length}>
                        <EmptyListNotification
                            note={t('Notes.youDon-tHaveProposals')}
                        />
                    </HideWrapper>
                </SpinnerWrapper>
            </ListWrapper>
        </>
    );
};

export default MyProposals;
