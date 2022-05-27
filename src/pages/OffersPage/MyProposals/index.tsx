import { useTranslation } from 'react-i18next';
import { ListContainer, ListWrapper, List, Title } from '../styles';
import ProposalCard from '../ProposalCard';

const MyProposals: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Title>{t('OffersPage.myProposals')}</Title>
            <ListWrapper>
                <ListContainer>
                    <List>
                        <ul>
                            <ProposalCard />
                        </ul>
                        <ul>
                            <ProposalCard />
                        </ul>
                    </List>
                </ListContainer>
            </ListWrapper>
        </>
    );
};

export default MyProposals;
