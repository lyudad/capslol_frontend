import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from 'constants/index';
import { Page, TopButtonContainer, StyledNavBtn } from './styles';
import MyOffers from './MyOffers';

const OffersPage: React.FC = () => {
    const [isActive, setIsActive] = useState<number>(1);

    const { t } = useTranslation();

    return (
        <Page>
            <TopButtonContainer>
                <StyledNavBtn
                    onClick={() => setIsActive(1)}
                    style={{
                        color:
                            isActive === 1
                                ? `${colors.brandColor}`
                                : `${colors.textWhite}`,
                    }}
                >
                    {t('OffersPage.myOffers')}
                </StyledNavBtn>

                <StyledNavBtn
                    onClick={() => setIsActive(2)}
                    style={{
                        color:
                            isActive === 2
                                ? `${colors.brandColor}`
                                : `${colors.textWhite}`,
                    }}
                >
                    {t('OffersPage.myInvitations')}
                </StyledNavBtn>

                <StyledNavBtn
                    onClick={() => setIsActive(3)}
                    style={{
                        color:
                            isActive === 3
                                ? `${colors.brandColor}`
                                : `${colors.textWhite}`,
                    }}
                >
                    {t('OffersPage.myProposals')}
                </StyledNavBtn>
            </TopButtonContainer>

            {isActive === 1 && <MyOffers />}
        </Page>
    );
};

export default OffersPage;
