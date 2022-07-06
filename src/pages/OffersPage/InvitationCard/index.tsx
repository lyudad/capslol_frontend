import { useTranslation } from 'react-i18next';
import { IMyInvitation } from 'store/apis/invitations/invitations.types';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import moment from 'moment';
import { dateFormat } from 'constants/index';
import { AppContext } from 'context';
import { useContext } from 'react';
import {
    useGetChatContactsByJobIdQuery,
    usePostChatContactMutation,
} from 'store/apis/chat';
import { message } from 'antd';
import { useSendProposalMutation } from 'store/apis/proposals';
import { IChatMember } from 'store/apis/chat/chat.types';
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
    const { setCurrentChat, socket } = useContext(AppContext);

    const { createdAt, ownerId, jobId, freelancerId } = invitationObj;

    const { data: chatContacts } = useGetChatContactsByJobIdQuery({
        jobId: jobId?.id,
        freelancerId: freelancerId.id,
    });

    const [postProposal] = useSendProposalMutation();
    const [postChatContact] = usePostChatContactMutation();

    const sentAcceptMessage = (chatContact: IChatMember): void => {
        try {
            const newMessage = {
                content: `<div>
              <h3 className='contract'>${t('Chat.interviewTitle')}</h3>
              <p>${t('Chat.interviewSigned')}<span className="Date">
              ${moment(new Date(Date.now())).format(dateFormat)}<span></p>
              </div>`,
                senderId: ownerId?.id,
                roomId: chatContact?.id,
                isOffer: true,
            };

            socket.emit('msgToServer', newMessage);
        } catch (error) {
            message.error(error?.message);
        }
    };

    const handleSubmitProposalAndContacts = async (): Promise<void> => {
        try {
            const newProposal = {
                jobId: jobId?.id,
                freelancerId: freelancerId.id,
                coverLetter: jobId?.description as string,
                hourRate: jobId?.price as number,
            };
            const proposal = await postProposal(newProposal).unwrap();

            const newChatContact = {
                proposalId: proposal.id,
                isActive: false,
            };

            const chatContact = await postChatContact(newChatContact).unwrap();

            sentAcceptMessage(chatContact);
        } catch (error) {
            message.error(error.message);
        }
    };

    const onClickJob = (): void => {
        navigate(Paths.JOB_PAGE, { state: { id: jobId.id, tabs: 2 } });
    };

    const handleOnNavigate = (): void => {
        navigate(Paths.CHAT);
        handleSubmitProposalAndContacts();
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
