import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import { CustomizedState } from 'pages/TalentsPage/TalentListCard/props';
import { NavWrapper } from 'components/LiveNotification/styles';
import LiveNotification from 'components/LiveNotification';
import {
    setInvitationsCount,
    setOffersCount,
    setProposalCount,
} from 'store/slices/auth/auth.slice';
import MyOffers from './MyOffers';
import MyInvitations from './MyInvitations';
import MyProposals from './MyProposals';
import { Page, TopButtonContainer, StyledNavBtn } from './styles';

const OffersPage: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const tabState = location.state as CustomizedState;
    const { tabs } = tabState || {};
    const [isActive, setIsActive] = useState<number>(tabs || 1);
    const dispatch = useAppDispatch();
    const newProposalsCount = useAppSelector(
        (state) => state.auth.proposalsCount
    );
    const newOffersCount = useAppSelector((state) => state.auth.offersCount);
    const newInvitationsCount = useAppSelector(
        (state) => state.auth.invitationsCount
    );

    return (
        <Page>
            <TopButtonContainer>
                <NavWrapper>
                    <StyledNavBtn
                        isActive={isActive === 1}
                        onClick={() => {
                            setIsActive(1);
                            dispatch(setOffersCount(0));
                        }}
                    >
                        {t('OffersPage.myOffers')}
                    </StyledNavBtn>
                    <LiveNotification count={newOffersCount} />
                </NavWrapper>

                <NavWrapper>
                    <StyledNavBtn
                        isActive={isActive === 2}
                        onClick={() => {
                            setIsActive(2);
                            dispatch(setInvitationsCount(0));
                        }}
                    >
                        {t('OffersPage.myInvitations')}
                    </StyledNavBtn>
                    <LiveNotification count={newInvitationsCount} />
                </NavWrapper>

                <NavWrapper>
                    <StyledNavBtn
                        isActive={isActive === 3}
                        onClick={() => {
                            setIsActive(3);
                            dispatch(setProposalCount(0));
                        }}
                    >
                        {t('OffersPage.myProposals')}
                    </StyledNavBtn>
                    <LiveNotification count={newProposalsCount} />
                </NavWrapper>
            </TopButtonContainer>

            {isActive === 1 && <MyOffers />}
            {isActive === 2 && <MyInvitations />}
            {isActive === 3 && <MyProposals />}
        </Page>
    );
};

export default OffersPage;
