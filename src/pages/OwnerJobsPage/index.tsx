/* eslint-disable @typescript-eslint/no-shadow */
import { CustomState } from 'pages/OneJobPage/props';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import OwnerJobs from './OwnerJobs';

import { Page, TopButtonContainer, StyledNavBtn } from './styles';

const OwnerJobsPage: React.FC = () => {
    const location = useLocation();
    const state = location.state as CustomState;
    const { myProjects } = state || {};
    const [isActive, setIsActive] = useState<number>(myProjects || 1);

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
            </TopButtonContainer>

            {isActive === 1 && <OwnerJobs archived={false} />}
            {isActive === 2 && <OwnerJobs archived />}
        </Page>
    );
};

export default OwnerJobsPage;
