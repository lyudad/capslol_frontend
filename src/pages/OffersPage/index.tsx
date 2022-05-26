import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Page,
    Title,
    TopButtonContainer,
    StyledNavBtn,
    NavBtnIsActive,
} from './styles';
import MyOffers from './MyOffers';

const OffersPage: React.FC = () => {
    const [myOffers, setMyOffers] = useState<boolean>(true);
    const [myInvitations, setMyInvitations] = useState<boolean>(false);
    const [myProposals, setMyProposals] = useState<boolean>(false);

    const { t } = useTranslation();

    const onOffersClick = (): void => {
        setMyOffers(true);
        setMyInvitations(false);
        setMyProposals(false);
    };

    const onInvitationsClick = (): void => {
        setMyOffers(false);
        setMyInvitations(true);
        setMyProposals(false);
    };

    const onProposalsClick = (): void => {
        setMyOffers(false);
        setMyInvitations(false);
        setMyProposals(true);
    };

    return (
        <Page>
            <TopButtonContainer>
                {myOffers ? (
                    <NavBtnIsActive onClick={onOffersClick} type="submit">
                        {t('OffersPage.myOffers')}
                    </NavBtnIsActive>
                ) : (
                    <StyledNavBtn onClick={onOffersClick} type="submit">
                        {t('OffersPage.myOffers')}
                    </StyledNavBtn>
                )}
                {myInvitations ? (
                    <NavBtnIsActive onClick={onInvitationsClick} type="submit">
                        {t('OffersPage.myInvitations')}
                    </NavBtnIsActive>
                ) : (
                    <StyledNavBtn onClick={onInvitationsClick} type="submit">
                        {t('OffersPage.myInvitations')}
                    </StyledNavBtn>
                )}
                {myProposals ? (
                    <NavBtnIsActive onClick={onProposalsClick} type="submit">
                        {t('OffersPage.myProposals')}
                    </NavBtnIsActive>
                ) : (
                    <StyledNavBtn onClick={onProposalsClick} type="submit">
                        {t('OffersPage.myProposals')}
                    </StyledNavBtn>
                )}
            </TopButtonContainer>
            {myOffers && <Title>{t('OffersPage.myOffers')}</Title>}
            {myInvitations && <Title>{t('OffersPage.myInvitations')}</Title>}
            {myProposals && <Title>{t('OffersPage.myProposals')}</Title>}
            {myOffers && <MyOffers />}
        </Page>
    );
};

export default OffersPage;
