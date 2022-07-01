/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { notification, Modal, Select, message } from 'antd';
import avatar from 'assets/avatar.png';
import { useContext, useEffect, useState } from 'react';
import { Slicer } from 'utilities/utilities';
import { useAppSelector } from 'hooks/redux';
import { useLazyGetJobsByOwnerQuery } from 'store/apis/jobs';
import { IJob } from 'store/apis/jobs/jobs.types';
import { useCreateInvitationMutation } from 'store/apis/talents';
import 'antd/dist/antd.min.css';
import { newInvitation } from 'store/apis/invitations/invitations.types';
import { useSendProposalMutation } from 'store/apis/proposals';
import { AppContext } from 'context';
import { usePostChatContactMutation } from 'store/apis/chat';
import moment from 'moment';
import { dateFormat } from 'constants/index';
import { IProps } from './props';
import {
    StyledButton,
    JobTitle,
    OwnerContainer,
    Descriptions,
    ValueBox,
    Field,
    FieldValue,
    StyledNav,
    Avatar,
    FieldSkills,
} from './styles';

const TalentListCard: React.FC<IProps> = ({
    jobObj,
    freelancerIdInInvitations,
}) => {
    const { user: userStore } = useAppSelector((s) => s.auth);
    const [searchOwnJobs] = useLazyGetJobsByOwnerQuery();
    const [createInvitation] = useCreateInvitationMutation();
    const { Option } = Select;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id, user, other, profileImage, categories, skills } = jobObj;
    const [targetId, setTargetId] = useState<number>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [currentName, setCurrentName] = useState<string>();
    const [ownJobs, setOwnJobs] = useState<IJob[]>([]);
    const [jobIdSelected, setJobIdSelected] = useState<number>();
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const [postProposal] = useSendProposalMutation();
    const [postChatContact] = usePostChatContactMutation();
    const { socket } = useContext(AppContext);

    useEffect((): void => {
        const reloadJobs = async (): Promise<void> => {
            const firsResults = await searchOwnJobs(userStore?.id).unwrap();
            const results = firsResults.filter(
                (item) => item.isArchived === false
            );
            setOwnJobs([...results]);
        };
        reloadJobs();
    }, [searchOwnJobs, userStore?.id]);

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
                senderId: userStore?.id,
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
                jobId: Number(jobIdSelected || ownJobs[0]?.id),
                freelancerId: Number(targetId),
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

    const handleOk = async (): Promise<void> => {
        try {
            setConfirmLoading(true);
            const createNewInvitation: newInvitation = {
                ownerId: userStore?.id,
                freelancerId: Number(targetId),
                jobId: Number(jobIdSelected || ownJobs[0]?.id),
            };
            const r = await createInvitation(createNewInvitation).unwrap();
            console.log(r, 'sent interview');
            handleSubmitProposalAndContacts();
        } catch (error) {
            if ('data' in error) {
                message.error(error.data.message);
            }
            if ('error' in error) {
                message.error(error.status);
            }
            throw error;
        }
        setConfirmLoading(false);
        setIsModalVisible(false);
        return notification.success({
            message: t('TalentPage.sent_to') + currentName,
        });
    };

    const handleCancel = (): void => {
        setIsModalVisible(false);
    };

    const handleChangeCategory = (value: string): void => {
        setJobIdSelected(Number(value));
    };

    const onClickJob = (): void => {
        navigate(`/talents/profile/${id}`, {
            state: {
                id,
                isActive: !!freelancerIdInInvitations?.includes(
                    user?.id as number
                ),
            },
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSendInterview = async (event: any): Promise<void> => {
        const target = event.currentTarget;
        if (!ownJobs.length) {
            notification.warning({
                message: t('TalentPage.no_jobs'),
            });
            return;
        }
        if (ownJobs.length === 1) {
            const createNewInvitation: newInvitation = {
                ownerId: userStore?.id,
                freelancerId: Number(target?.id),
                jobId: Number(jobIdSelected || ownJobs[0]?.id),
            };
            await createInvitation(createNewInvitation).unwrap();
            notification.success({
                message: `${t('TalentPage.sent_to')}${target?.name}!`,
            });
            return;
        }

        setIsModalVisible(true);
        setTargetId(target?.id);
        setCurrentName(target?.name);
    };

    return (
        <>
            <StyledButton onClick={onClickJob} type="submit">
                <JobTitle>
                    <Avatar>
                        <img src={profileImage || avatar} alt="" width={60} />
                    </Avatar>
                    {user?.firstName} {user?.lastName}
                </JobTitle>
            </StyledButton>
            <Descriptions>{Slicer(other)}</Descriptions>
            <OwnerContainer>
                <ValueBox>
                    <Field>{t('JobPage.category')}</Field>
                    <FieldValue>{categories?.categoryName}</FieldValue>
                </ValueBox>
                <ValueBox>
                    <Field>{t('JobPage.skills')}</Field>
                    <FieldSkills>
                        {skills
                            ?.map((item: { name: string }) => item.name)
                            .join(', ')}
                    </FieldSkills>
                </ValueBox>
            </OwnerContainer>

            {freelancerIdInInvitations?.includes(user?.id as number) ? (
                <StyledNav disabled>{t('TalentPage.already_sent')}</StyledNav>
            ) : (
                <StyledNav
                    name={`${user?.firstName} ${user?.lastName}`}
                    id={String(user?.id)}
                    onClick={handleSendInterview}
                >
                    {t('TalentPage.send_interview')}
                </StyledNav>
            )}
            <Modal
                title={t('TalentPage.title_modal')}
                visible={isModalVisible}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
            >
                <Select
                    defaultValue={ownJobs[0]?.title}
                    style={{ width: '100%' }}
                    onChange={handleChangeCategory}
                    placeholder="Please select"
                >
                    {ownJobs?.map((e) => (
                        <Option key={e.id}>{e.title}</Option>
                    ))}
                </Select>
            </Modal>
        </>
    );
};

export default TalentListCard;
