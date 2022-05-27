import { useTranslation } from 'react-i18next';
import {
    DateContainer,
    StyledTitleCardButton,
    CardTitle,
    Salary,
    Descriptions,
    ValueBox,
    Field,
    FieldValue,
    OneCard,
} from '../styles';

const ProposalCard: React.FC = () => {
    const { t } = useTranslation();

    const onClickJob = (): void => {
        // navigate(Paths.JOB_PAGE, { state: { id } });
    };
    return (
        <OneCard>
            <DateContainer>2022-05-12</DateContainer>

            <StyledTitleCardButton onClick={onClickJob} type="submit">
                <CardTitle>Middle React Native Developer</CardTitle>
                <Salary>10$</Salary>
            </StyledTitleCardButton>

            <ValueBox>
                <Field>{t('JobPage.jobOwner')}</Field>
                <FieldValue>Qwert Ertyui</FieldValue>
            </ValueBox>

            <ValueBox>
                <Descriptions>
                    Our customer is a startup, founded in 2019 to reinvent how
                    career data is owned and shared across the global labor
                    market.
                </Descriptions>
            </ValueBox>

            <ValueBox>
                <Field>status</Field>
                <FieldValue>Pending</FieldValue>
            </ValueBox>
        </OneCard>
    );
};

export default ProposalCard;
