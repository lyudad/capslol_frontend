import { useTranslation } from 'react-i18next';
import { IMyInvitation } from 'store/apis/invitations/invitations.types';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import moment from 'moment';
import { colors, dateFormat } from 'constants/index';
import { AppContext } from 'context';
import { useContext, useState } from 'react';
import {
    useGetChatContactsByFreelancerIdQuery,
    usePostChatContactMutation,
} from 'store/apis/chat';
import { message, Row } from 'antd';
import { useSendProposalMutation } from 'store/apis/proposals';
import { IChatMember } from 'store/apis/chat/chat.types';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import { FontTitle } from 'pages/SendProposal/styles';
import { TChatContactArg, TReturnChatContact } from 'pages/Chat/interfaces';
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
    ButtonWithoutBorder,
} from '../styles';

interface IProps {
    invitationObj: IMyInvitation;
}

const InvitationCard: React.FC<IProps> = ({ invitationObj }) => {
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [isHasChat, setIsHasChat] = useState<boolean>(false);

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setCurrentChat, socket } = useContext(AppContext);

    const { createdAt, ownerId, jobId, freelancerId } = invitationObj;

    const [postProposal] = useSendProposalMutation();
    const [postChatContact] = usePostChatContactMutation();
    const { data: contacts } = useGetChatContactsByFreelancerIdQuery(
        freelancerId?.id
    );

    const rightContacts = (data: TChatContactArg): TReturnChatContact => {
        const contact = data?.filter(
            (i: IChatMember) => i?.proposalId?.jobId?.id === jobId?.id
        )[0];

        return contact;
    };

    const sentContractMessage = (chatContact: IChatMember): void => {
        try {
            const newMessage = {
                content: `<div>
              <h3 className='contract'>${t('Chat.interviewTitle')}</h3>
              <p>${t('Chat.interviewSigned')}<span className="Date">
              ${moment(new Date(Date.now())).format(dateFormat)}<span></p>
              </div>`,
                senderId: freelancerId?.id,
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

            sentContractMessage(chatContact);
            setIsHasChat(true);
        } catch (error) {
            message.error(error.message);
        }
    };

    const onClickJob = (): void => {
        navigate(Paths.JOB_PAGE, { state: { id: jobId.id, tabs: 2 } });
    };

    const handleOnNavigate = (): void => {
        navigate(Paths.CHAT);
        setCurrentChat?.(rightContacts(contacts));
        setIsHasChat(false);
    };

    const openModal = (): void => setIsOpen(true);

    const closeModal = (): void => {
        if (isHasChat) {
            handleOnNavigate();
        }
        setIsOpen(false);
    };

    return (
        <>
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
                    {rightContacts(contacts)?.proposalId.jobId.id !==
                        jobId?.id && (
                        <StyledCardBtn onClick={openModal}>
                            {t('OffersPage.acceptInvite')}
                        </StyledCardBtn>
                    )}
                    {rightContacts(contacts)?.proposalId.jobId.id ===
                        jobId?.id && (
                        <StyledCardBtn onClick={handleOnNavigate}>
                            {t('OffersPage.goToChat')}
                        </StyledCardBtn>
                    )}
                </ButtonContainer>
            </OneCard>

            <ModalWindow
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                bg={colors.bgBlack}
                modalBg={colors.bgBlack}
                borderCol={colors.textWhite}
            >
                <Row justify="center">
                    {!isHasChat ? (
                        <>
                            <FontTitle color={colors.modalBg} fs="16" mb="25">
                                {t('OffersPage.acceptInviteTitle')}
                            </FontTitle>
                            <Row justify="space-between">
                                <StyledCardBtn
                                    onClick={handleSubmitProposalAndContacts}
                                >
                                    {t('OffersPage.acceptYes')}
                                </StyledCardBtn>
                                <StyledCardBtn onClick={closeModal}>
                                    {t('OffersPage.acceptNo')}
                                </StyledCardBtn>
                            </Row>
                        </>
                    ) : (
                        <FontTitle color={colors.modalBg} fs="16" mb="25">
                            {t('OffersPage.inviteAccept')}
                            <ButtonWithoutBorder onClick={handleOnNavigate}>
                                {t('OffersPage.acceptInviteLink')}
                            </ButtonWithoutBorder>
                        </FontTitle>
                    )}
                </Row>
            </ModalWindow>
        </>
    );
};

export default InvitationCard;
