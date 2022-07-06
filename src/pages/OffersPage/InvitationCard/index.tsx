/* eslint-disable @typescript-eslint/no-explicit-any */
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

    const handleOnNavigate = (): void => {
        navigate(Paths.CHAT);
        setCurrentChat?.(chatContacts);
    };

    const sentAcceptMessage = (
        jobTitle: any,
        jobDes: any,
        chatContact: any
    ): void => {
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
                coverLetter: 'Job',
                hourRate: 0,
            };
            const proposal = await postProposal(newProposal).unwrap();
            console.log(proposal, 'sent proposal');
            const newChatContact = {
                proposalId: proposal.id,
                isActive: false,
            };

            const chatContact = await postChatContact(newChatContact).unwrap();

            console.log(chatContact, 'chatContact');

            sentAcceptMessage(
                proposal?.jobId?.title,
                proposal?.jobId?.description,
                chatContact
            );
        } catch (error) {
            message.error(error.message);
        }
    };

    const onClickJob = (): void => {
        handleSubmitProposalAndContacts();

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
                <StyledCardBtn onClick={handleOnNavigate}>
                    {t('OffersPage.goToChat')}
                </StyledCardBtn>
            </ButtonContainer>
        </OneCard>
    );
};

export default InvitationCard;
