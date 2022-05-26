import { useTranslation } from 'react-i18next';
import {
    DateContainer,
    StyledButton,
    JobTitle,
    Salary,
    ButtonContainer,
    Descriptions,
    ValueBox,
    Field,
    FieldValue,
    StyledNavBtn,
    OneOfferCard,
} from './styles';
import 'antd/dist/antd.min.css';

const OfferCard: React.FC = () => {
    const { t } = useTranslation();

    const onClickJob = (): void => {
        // navigate(Paths.JOB_PAGE, { state: { id } });
    };
    return (
        <OneOfferCard>
            <DateContainer>2022-05-12</DateContainer>

            <StyledButton onClick={onClickJob} type="submit">
                <JobTitle>Middle React Native Developer</JobTitle>
                <Salary>10$</Salary>
            </StyledButton>

            <ValueBox>
                <Field>{t('JobPage.jobOwner')}</Field>
                <FieldValue>Qwert Ertyui</FieldValue>
            </ValueBox>

            <ValueBox>
                <Descriptions>
                    Our customer is a startup, founded in 2019 to reinvent how
                    career data is owned and shared across the global labor
                    market. Their vision is to build a future where individuals
                    can take total control over their career identity. They are
                    truly embracing Web 3.0 without the dirty side.
                </Descriptions>
            </ValueBox>

            <ValueBox>
                <Field>status</Field>
                <FieldValue>Pending</FieldValue>
            </ValueBox>

            <ButtonContainer>
                <StyledNavBtn>{t('OffersPage.accept')}</StyledNavBtn>
                <StyledNavBtn>{t('OffersPage.decline')}</StyledNavBtn>
                <StyledNavBtn>{t('OffersPage.goToChat')}</StyledNavBtn>
            </ButtonContainer>
        </OneOfferCard>
    );
};

export default OfferCard;
