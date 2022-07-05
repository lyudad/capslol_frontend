import { useTranslation } from 'react-i18next';
import { IMyInvitation } from 'store/apis/invitations/invitations.types';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import moment from 'moment';
import { dateFormat } from 'constants/index';
import {
    DateContainer,
    StyledTitleCardButton,
    CardTitle,
    Salary,
    ButtonContainer,
    Descriptions,
    ValueBox,
    Field,
    FieldValue,
    StyledCardBtn,
    OneCard,
} from '../styles';

interface IProps {
    invitationObj: IMyInvitation;
}

const InvitationCard: React.FC<IProps> = ({ invitationObj }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const { createdAt, ownerId, jobId } = invitationObj;

    const onClickJob = (): void => {
        navigate(Paths.JOB_PAGE, { state: { id: jobId.id, tabs: 2 } });
    };
    return (
        <OneCard>
            <DateContainer>
                {moment(new Date(createdAt)).format(dateFormat)}
            </DateContainer>

            <StyledTitleCardButton onClick={onClickJob} type="submit">
                <CardTitle>{jobId.title}</CardTitle>
                <Salary>{jobId.price}$</Salary>
            </StyledTitleCardButton>

            <ValueBox>
                <Field>{t('JobPage.jobOwner')}</Field>
                <FieldValue>
                    {ownerId.firstName} {ownerId.lastName}
                </FieldValue>
            </ValueBox>

            <ValueBox>
                <Descriptions>{jobId.description}</Descriptions>
            </ValueBox>

            <ButtonContainer>
                <StyledCardBtn>{t('OffersPage.goToChat')}</StyledCardBtn>
            </ButtonContainer>
        </OneCard>
    );
};

export default InvitationCard;
