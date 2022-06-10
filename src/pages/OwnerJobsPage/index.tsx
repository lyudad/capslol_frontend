import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page, TopButtonContainer, StyledNavBtn } from './styles';
import OwnerJobs from './OwnerJobs';

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
            </TopButtonContainer>

            {isActive === 1 && <OwnerJobs archived={false} />}
            {isActive === 2 && <OwnerJobs archived />}
        </Page>
    );
};

export default OwnerJobsPage;
