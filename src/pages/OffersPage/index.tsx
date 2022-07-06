import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CustomizedState } from 'pages/TalentsPage/TalentListCard/props';
import MyOffers from './MyOffers';
import MyInvitations from './MyInvitations';
import MyProposals from './MyProposals';
import { Page, TopButtonContainer, StyledNavBtn } from './styles';

const OffersPage: React.FC = () => {
    const location = useLocation();
    const state = location.state as CustomizedState;
    const { tabs } = state || {};

    const [isActive, setIsActive] = useState<number>(tabs || 1);

    const { t } = useTranslation();

    return (
        <Page>
            <TopButtonContainer>
                <StyledNavBtn
                    isActive={isActive === 1}
                    onClick={() => setIsActive(1)}
                >
                    {t('OffersPage.myOffers')}
                </StyledNavBtn>

                <StyledNavBtn
                    onClick={() => setIsActive(2)}
                    isActive={isActive === 2}
                >
                    {t('OffersPage.myInvitations')}
                </StyledNavBtn>

                <StyledNavBtn
                    isActive={isActive === 3}
                    onClick={() => setIsActive(3)}
                >
                    {t('OffersPage.myProposals')}
                </StyledNavBtn>
            </TopButtonContainer>

            {isActive === 1 && <MyOffers />}
            {isActive === 2 && <MyInvitations />}
            {isActive === 3 && <MyProposals />}
        </Page>
    );
};

export default OffersPage;
