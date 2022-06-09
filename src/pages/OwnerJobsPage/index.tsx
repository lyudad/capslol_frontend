import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page, TopButtonContainer, StyledNavBtn } from './styles';
import MyOffers from './MyOffers';
import MyInvitations from './MyInvitations';

const OwnerJobsPage: React.FC = () => {
    const [isActive, setIsActive] = useState<number>(1);

    const { t } = useTranslation();

    return (
        <Page>
            <TopButtonContainer>
                <StyledNavBtn
                    isActive={isActive === 1}
                    onClick={() => setIsActive(1)}
                >
                    {t('OwnerJobsPage.relevant')}
                </StyledNavBtn>

                <StyledNavBtn
                    onClick={() => setIsActive(2)}
                    isActive={isActive === 2}
                >
                    {t('OwnerJobsPage.archival')}
                </StyledNavBtn>

                {/* <StyledNavBtn
                    isActive={isActive === 3}
                    onClick={() => setIsActive(3)}
                >
                    {t('OffersPage.myProposals')}
                </StyledNavBtn> */}
            </TopButtonContainer>

            {isActive === 1 && <MyOffers />}
            {isActive === 2 && <MyInvitations />}
        </Page>
    );
};

export default OwnerJobsPage;
