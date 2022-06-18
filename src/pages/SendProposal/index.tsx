import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, message, notification, Row } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { colors } from 'constants/index';
import {
    useSendProposalMutation,
    useGetProposalsByFreelancerQuery,
} from 'store/apis/proposals';
import { useAppSelector } from 'hooks/redux';
import { useGetJobByIdQuery } from 'store/apis/jobs';
import { Paths } from 'router/paths';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import { usePostChatContactMutation } from 'store/apis/chat';
import { AppContext } from 'context';
import {
    Block,
    Font,
    FontTitle,
    Hr,
    ProposalCard,
    Section,
    StyledButton,
    StyledInput,
    StyledTextArea,
    Wrapper,
    FormItem,
    StyledFormItem,
} from './styles';
import {
    IFormValue,
    IJobId,
    TFilterArg,
    NotificationType,
    TProposalFilter,
} from './interfaces';

const SendProposal: React.FC = () => {
    const location = useLocation();
    const { user } = useAppSelector((s) => s.auth);
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const state = location.state as IJobId;

    const { data: job } = useGetJobByIdQuery(state.id);
    const [postProposal, { isSuccess, isError }] = useSendProposalMutation();
    const { data: freelancerProposals } = useGetProposalsByFreelancerQuery(
        user?.id
    );
    const [postChatContact] = usePostChatContactMutation();
    const { socket } = useContext(AppContext);

    const [freelancerValue, setFreelancerValue] = useState<number>();
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [hourRate, setHourRate] = useState<number | undefined>(job?.price);
    const getJobHourRate = +(((hourRate || 0) / 100) * 12.5);

    const [getJob, setGetJob] = useState<number>(getJobHourRate);

    const onReset = (): void => form.resetFields();

    const openModal = (): void => setIsOpen(true);

    const handleFiltered = (data: TFilterArg): TProposalFilter => {
        const filtered = data?.filter((i) => i?.jobId?.id === state?.id)[0];

        return filtered;
    };

    const navigateToProjectDetails = (): void => {
        navigate(Paths.JOB_PAGE, { state: { id: state.id } });
    };

    const proposalId = handleFiltered(freelancerProposals);

    const closeModal = async (): Promise<void> => {
        try {
            setIsOpen(false);

            const newChatContact = {
                proposalId: proposalId?.id,
                isActive: false,
            };

            const chatContact = await postChatContact(newChatContact).unwrap();

            const newMessage = {
                content: `<div><p className="title">${t(
                    'Chat.rate'
                )}<span>${hourRate}</span></p>
                <div>${proposalId?.coverLetter}</div>
                </div>`,
                senderId: user?.id,
                roomId: chatContact?.id,
            };

            socket.emit('msgToServer', newMessage, () => {
                // eslint-disable-next-line no-console
                console.log(newMessage);
            });
            navigateToProjectDetails();
        } catch (error) {
            message.error(`${error?.message}`);
        }
    };

    const handleSubmit = async (values: IFormValue): Promise<void> => {
        try {
            const newProposal = {
                jobId: state.id,
                freelancerId: user?.id,
                coverLetter: values.coverLetter,
                hourRate: freelancerValue,
            };
            await postProposal(newProposal);
            setHourRate(0);
            setGetJob(0);
            setFreelancerValue(0);
            onReset();
            openModal();
        } catch (error) {
            message.error(`${error?.message}`);
        }
        onReset();
    };

    const onChange = (value: number): void => {
        setHourRate(value);
        setGetJob(getJobHourRate);
        setFreelancerValue(((hourRate || 0) - getJob) * 10);
    };

    const openNotificationWithIcon = (
        type: NotificationType,
        msg: string,
        desc: string
    ): void => {
        notification[type]({
            message: msg,
            description: desc,
        });
    };

    return (
        <Wrapper>
            <FontTitle color={colors.textWhite} fs="30" mb="30">
                {t('Proposal.title')}
            </FontTitle>

            <Form form={form} onFinish={handleSubmit}>
                <ProposalCard>
                    <Font color={colors.textWhite} fs="22">
                        {t('Proposal.subTitle')}
                    </Font>
                    <Section>
                        <FontTitle color={colors.textWhite} fs="18">
                            {t('Proposal.jobQuestion')}
                        </FontTitle>

                        <Row justify="space-between">
                            <FontTitle color={colors.textGrey} fs="16">
                                {t('Proposal.youRate')} $ {hourRate || '0'}/hr
                            </FontTitle>
                            <FontTitle color={colors.textGrey} fs="16">
                                {t('Proposal.jobOwnerRate')} ${' '}
                                {job?.price || '0'} /hr
                            </FontTitle>
                        </Row>

                        <Row justify="space-between">
                            <FontTitle color={colors.textWhite} fs="16">
                                {t('Proposal.hourlyRate')}
                            </FontTitle>
                            <FormItem
                                label=""
                                name="jobOwnerValue"
                                rules={[
                                    {
                                        required: true,
                                        message: `${t('Proposal.errorRate')}`,
                                    },
                                ]}
                            >
                                <StyledInput
                                    value={hourRate}
                                    prefix="$"
                                    maxLength={4}
                                    onChange={(value) =>
                                        onChange(value as number)
                                    }
                                />
                            </FormItem>
                        </Row>

                        <Hr />

                        <Row justify="space-between">
                            <FontTitle color={colors.textWhite} fs="16">
                                {t('Proposal.getJobRate')}
                            </FontTitle>
                            <FontTitle color={colors.textWhite} fs="16">
                                $ {(getJob || 0).toFixed(2) || '0'}
                                /hr
                            </FontTitle>
                        </Row>

                        <Hr />

                        <Row justify="space-between">
                            <FontTitle color={colors.textWhite} fs="16">
                                {t('Proposal.gotRate')}
                            </FontTitle>
                            <FormItem label="" name="freelancerValue">
                                <StyledInput
                                    readOnly
                                    prefix="$"
                                    placeholder={`${freelancerValue || '0'}`}
                                    maxLength={4}
                                />
                            </FormItem>
                        </Row>
                    </Section>
                </ProposalCard>
                <ProposalCard>
                    <Font fs="22" color={colors.textWhite}>
                        {t('Proposal.letterTitle')}
                    </Font>
                    <Section>
                        <Block>
                            <FontTitle color={colors.textWhite} fs="16" mb="15">
                                {t('Proposal.coverLetterTitle')}
                            </FontTitle>

                            <StyledFormItem
                                name="coverLetter"
                                rules={[
                                    {
                                        required: true,
                                        message: `${t('Proposal.errorLetter')}`,
                                    },
                                ]}
                            >
                                <StyledTextArea
                                    showCount
                                    maxLength={500}
                                    style={{ height: 150 }}
                                />
                            </StyledFormItem>
                        </Block>
                    </Section>
                </ProposalCard>

                <Form.Item>
                    <StyledButton
                        htmlType="submit"
                        className="login-form-button"
                    >
                        {t('Proposal.submitBtnText')}
                    </StyledButton>
                </Form.Item>
            </Form>

            <>
                {' '}
                {isSuccess && (
                    <ModalWindow
                        modalIsOpen={modalIsOpen}
                        closeModal={() => closeModal()}
                        bg={colors.btnWhite}
                        modalBg={colors.bgBlack}
                    >
                        <FontTitle color={colors.black} fs="18">
                            {t('Proposal.sentSuccess')}
                        </FontTitle>
                    </ModalWindow>
                )}
                {isError &&
                    openNotificationWithIcon(
                        'error',
                        'Error',
                        'You have already responded to this project. Try another one!'
                    )}
            </>
        </Wrapper>
    );
};

export default SendProposal;
