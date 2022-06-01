/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, message, notification, Row } from 'antd';
import { useLocation } from 'react-router-dom';

import { colors } from 'constants/index';
import {
    useGetSingleJobQuery,
    useSendProposalMutation,
    useGetAllQuery,
} from 'store/apis/proposals';
import { useAppSelector } from 'hooks/redux';
import { useDispatch } from 'react-redux';
import { setIsSent } from 'store/slices/proposals/proposals.slice';
import axios from 'axios';
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
import { IFormValue, IJob } from './interfaces';

const SendProposal: React.FC = () => {
    const location = useLocation();

    const state = location.state as IJob;

    const { data: job } = useGetSingleJobQuery(state.id);
    const [postProposal, { isSuccess, isError }] = useSendProposalMutation();
    const { data: proposals } = useGetAllQuery([]);

    const { user } = useAppSelector((s) => s.auth);
    const dispatch = useDispatch();

    const { t } = useTranslation();
    const [form] = Form.useForm();

    const [freelancerValue, setFreelancerValue] = useState<number>();
    const [hourRate, setHourRate] = useState<number | undefined>(job?.price);
    const getJobHourRate = +(((hourRate || 0) / 100) * 12.5);

    const [getJob, setGetJob] = useState<number>(getJobHourRate);

    const onReset = (): void => form.resetFields();

    const handleSubmit = async (values: IFormValue): Promise<void> => {
        try {
            const newProposal = {
                jobId: state.id,
                freelancerId: user?.id,
                coverLetter: values.coverLetter,
                hourRate: freelancerValue,
            };
            await postProposal(newProposal);
            await dispatch(setIsSent(newProposal));
            setHourRate(0);
            setGetJob(0);
            setFreelancerValue(0);
            onReset();
            const data = axios.post('http://localhost:3000/chat-contacts', {
                proposalId: 1,
                isActive: false,
            });

            console.log(data);
        } catch (error) {
            message.error(`${error.data.message}`);
        }
        onReset();
    };

    const onChange = (value: number): void => {
        setHourRate(value);
        setGetJob(getJobHourRate);
        setFreelancerValue(((hourRate || 0) - getJob) * 10);
    };

    const handleFiltered = (data: any) => {
        const filtered = data?.filter((i: any) => i.jobId.id === state.id)[0]
            ?.jobId?.id;

        return filtered;
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
                                        pattern: /^(?:\d*)$/,
                                        message: `${t(
                                            'Proposal.error.number'
                                        )}`,
                                    },
                                    {
                                        pattern: /^[\d]{0,50}$/,
                                        message: `${t(
                                            'Proposal.error.length'
                                        )}`,
                                    },
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
                    {handleFiltered(proposals) === state.id ? (
                        <FontTitle fs="16" color={colors.textGreen}>
                            You have already responded to this project. Try
                            another one!
                        </FontTitle>
                    ) : (
                        <StyledButton
                            htmlType="submit"
                            className="login-form-button"
                        >
                            {t('Proposal.submitBtnText')}
                        </StyledButton>
                    )}
                </Form.Item>
            </Form>

            <>
                {' '}
                {isSuccess &&
                    notification.success({
                        message: 'Success',
                        description: 'You proposals successfully send!',
                    })}
                {isError &&
                    notification.error({
                        message: 'Error',
                        description:
                            'You have already responded to this project. Try another one!',
                    })}
            </>
        </Wrapper>
    );
};

export default SendProposal;
