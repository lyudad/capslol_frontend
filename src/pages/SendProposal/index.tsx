/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, message, Row } from 'antd';
import { useLocation } from 'react-router-dom';

import { colors } from 'constants/index';
import axios from 'axios';
import {
    useGetJobByIdQuery,
    useSendProposalMutation,
} from 'store/apis/proposals';
import { useAppSelector } from 'hooks/redux';
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
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const location = useLocation();
    const [job, setJob] = useState<any>();
    const [rate, setRate] = useState<number>(job?.price);
    const f = +((rate / 100) * 12.5);

    const [getJob, setGetJob] = useState<number>(f);
    const [g, setFreelancerValue] = useState<number>();
    const { user } = useAppSelector((s) => s.authReducer);

    const state = location.state as IJob;

    // const { data } = useGetJobByIdQuery(state.id);
    const [postProposal, { isSuccess, isError }] = useSendProposalMutation();

    // console.log(data, state.id);

    const onReset = (): void => form.resetFields();

    const handleSubmit = async (values: IFormValue): Promise<void> => {
        try {
            // eslint-disable-next-line no-console
            const newProposal = {
                jobId: state.id,
                freelancerId: user?.id || 16,
                coverLetter: values.coverLetter,
                hourRate: rate,
            };
            await postProposal(newProposal);
            setRate(0);
            setGetJob(0);
            setFreelancerValue(0);
        } catch (error) {
            message.error(`${error.data.message}`);
        }
        onReset();
    };

    // const onChange = (e: any): void => {
    //     setRate(e);
    // };

    useEffect(() => {
        axios
            .get(`http://localhost:3000/jobs/getbyid?job=${state.id}`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImZpcnN0TmFtZSI6IlRob21hcyIsImxhc3ROYW1lIjoiQW5kZXJzb24iLCJyb2xlIjoiTm8gc2V0IiwiZW1haWwiOiJ0aG9tYXMuYW5kZXJzb25AbWF0cml4LmNvbSIsInBob25lTnVtYmVyIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIyLTA1LTI1VDA2OjEyOjI3LjAwMFoiLCJpc0dvb2dsZSI6ZmFsc2UsImlhdCI6MTY1MzQ1OTE0NywiZXhwIjoxNjUzNTQ1NTQ3fQ.xi3qB4UoF4p8mLfQLU3HKkQ-INoD3JefH4Rgq-UdvcU `,
                },
            })
            .then((res) => {
                setJob(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [state.id]);

    const onChange = (value: number) => {
        setRate(value);
        setGetJob(f);
        setFreelancerValue((rate - getJob) * 10);
        console.log(getJob.toFixed(2));
    };

    return (
        <Wrapper>
            <FontTitle color={colors.textWhite} fs="30" mb="30">
                {t('Proposal.title')}
            </FontTitle>

            <Form
                form={form}
                onFinish={handleSubmit}
                // initialValues={[
                //     {
                //         name: ['jobOwnerValue'],
                //         value: newLocal,
                //     },
                //     {
                //         name: ['freelancerValue'],
                //         value: freelancerValue,
                //     },
                // ]}
            >
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
                                {t('Proposal.youRate')} $ {rate}/hr
                            </FontTitle>
                            <FontTitle color={colors.textGrey} fs="16">
                                {t('Proposal.jobOwnerRate')} $ {job?.price} /hr
                            </FontTitle>
                        </Row>

                        <Row justify="space-between">
                            <FontTitle color={colors.textWhite} fs="16">
                                {t('Proposal.hourlyRate')}
                            </FontTitle>
                            <FormItem
                                label=""
                                name="jobOwnerValue"
                                // initialValue={{ jobOwnerValue: job?.price }}
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
                                    value={rate}
                                    prefix="$"
                                    maxLength={4}
                                    onChange={(value) =>
                                        onChange(value as number)
                                    }
                                    // placeholder={job?.price}
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
                                    placeholder={`${g || '0'}`}
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
                {isSuccess && message.success('Successfully send')}
                {isError &&
                    message.error('Something went wrong! Please try again')}
            </>
        </Wrapper>
    );
};

export default SendProposal;
