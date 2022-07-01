import { useTranslation } from 'react-i18next';
import { IMyInvitation } from 'store/apis/invitations/invitations.types';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import moment from 'moment';
import { dateFormat } from 'constants/index';
import { AppContext } from 'context';
import { useContext } from 'react';
import { useGetChatContactsByJobIdQuery } from 'store/apis/chat';
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
    const { setCurrentChat } = useContext(AppContext);

    const { createdAt, ownerId, jobId, freelancerId } = invitationObj;

    const onClickJob = (): void => {
        navigate(Paths.JOB_PAGE, { state: { id: jobId.id } });
    };

    const { data: chatContacts } = useGetChatContactsByJobIdQuery({
        jobId: jobId?.id,
        freelancerId: freelancerId.id,
    });

    const handleOnNavigate = (): void => {
        navigate(Paths.CHAT);
        setCurrentChat?.(chatContacts);
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
                <StyledCardBtn onClick={handleOnNavigate}>
                    {t('OffersPage.goToChat')}
                </StyledCardBtn>
            </ButtonContainer>
        </OneCard>
    );
};

export default InvitationCard;
