import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import { IJob } from 'store/apis/jobs/jobs.types';
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
    StyledNav,
    OneOfferCard,
} from './styles';
import 'antd/dist/antd.min.css';
import { JobCard } from '../styles';

// interface IProps {
//     jobObj: IJob;
// }

const OfferCard: React.FC = () => {
    const { t } = useTranslation();

    // const navigate = useNavigate();

    // const {
    //     id,
    //     createdAt,
    //     title,
    //     description,
    //     price,
    //     timeAvailable,
    //     categoryId,
    //     skills,
    //     languageLevel,
    //     ownerId,
    // } = jobObj;

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
                <FieldValue>
                    {/* {`${ownerId.firstName} ${ownerId.lastName}`} */}
                    Qwert Ertyui
                </FieldValue>
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

            <ButtonContainer>
                <StyledNav to="">Accept </StyledNav>
                <StyledNav to="">Decline</StyledNav>
                <StyledNav to="">Go to chat</StyledNav>
            </ButtonContainer>
        </OneOfferCard>
    );
};

export default OfferCard;
