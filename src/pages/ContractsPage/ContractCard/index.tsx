/* eslint-disable no-unused-expressions */
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import { IContract } from 'store/apis/contracts/contracts.types';
import { dateFormat, statusOfContract } from 'constants/index';
import { useChangeContractStatusMutation } from 'store/apis/contracts';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import {
    StyledTitleCardButton,
    CardTitle,
    DateWrapper,
    Salary,
    ButtonContainer,
    Descriptions,
    ValueBox,
    Field,
    FieldValue,
    StyledCardBtn,
    OneCard,
    StatusValue,
    FieldStatusValue,
    ConfirmContainer,
    Confirm,
    StyledConfirmBtn,
} from '../styles';

interface IProps {
    contractObj: IContract;
}

const ContractCard: React.FC<IProps> = ({ contractObj }) => {
    const [contractStatus, setContractStatus] = useState<string>('');
    const [confirmStatus, setConfirmStatus] = useState<boolean>(false);

    const { t } = useTranslation();

    const navigate = useNavigate();

    const [changeContractStatus, { isLoading }] =
        useChangeContractStatusMutation();

    const { id, createdAt, offerId, closedAt, status } = contractObj;

    useEffect(() => {
        status === statusOfContract.OPENED
            ? setContractStatus('IS OPENED')
            : setContractStatus('IS CLOSED');
    }, [status]);

    const onClickJob = (): void => {
        navigate(Paths.JOB_PAGE, { state: { id: offerId.jobId.id } });
    };

    const onChangeStatus = async (): Promise<void> => {
        const endDate = Date();
        await changeContractStatus({
            id,
            status: 'closed',
            closedAt: endDate,
        });
        setConfirmStatus(!confirmStatus);
    };

    return (
        <OneCard>
            <SpinnerWrapper isLoading={isLoading}>
                <DateWrapper>
                    {moment(new Date(createdAt)).format(dateFormat)}
                </DateWrapper>

                <StyledTitleCardButton onClick={onClickJob} type="submit">
                    <CardTitle>{offerId.jobId.title}</CardTitle>
                    <Salary>{offerId.jobId.price}$</Salary>
                </StyledTitleCardButton>

                <ValueBox>
                    <Field>{t('ContractsPage.jobOwner')}</Field>
                    <FieldValue>
                        {offerId.ownerId.firstName} {offerId.ownerId.lastName}
                    </FieldValue>
                </ValueBox>

                <ValueBox>
                    <Field>{t('ContractsPage.freelancer')}</Field>
                    <FieldValue>
                        {offerId.freelancerId.firstName}{' '}
                        {offerId.freelancerId.lastName}
                    </FieldValue>
                </ValueBox>

                <ValueBox>
                    <Descriptions>{offerId.jobId.description}</Descriptions>
                </ValueBox>

                <ValueBox>
                    <Field>{t('OffersPage.ownerHourRate')}</Field>
                    <FieldValue>${offerId?.hourRate}/h</FieldValue>
                </ValueBox>

                <ValueBox>
                    <Field>{t('ContractsPage.status')}</Field>
                    <FieldStatusValue contrStatus={status}>
                        {contractStatus}
                    </FieldStatusValue>
                </ValueBox>

                <ValueBox>
                    <Field>{t('ContractsPage.startDate')}</Field>
                    <FieldValue>
                        {moment(new Date(createdAt)).format(dateFormat)}
                    </FieldValue>
                </ValueBox>

                {status === statusOfContract.CLOSED && (
                    <ValueBox>
                        <Field>{t('ContractsPage.endDate')}</Field>
                        <FieldValue>
                            {closedAt &&
                                moment(new Date(closedAt)).format(dateFormat)}
                        </FieldValue>
                    </ValueBox>
                )}

                {status === statusOfContract.CLOSED && (
                    <StatusValue>
                        {t('ContractsPage.contractIsEnded')}{' '}
                        {closedAt &&
                            moment(new Date(closedAt)).format(dateFormat)}
                    </StatusValue>
                )}

                <ButtonContainer>
                    <StyledCardBtn>{t('OffersPage.goToChat')}</StyledCardBtn>
                    {status === statusOfContract.OPENED && (
                        <StyledCardBtn
                            onClick={() => setConfirmStatus(!confirmStatus)}
                        >
                            {t('ContractsPage.endContract')}
                        </StyledCardBtn>
                    )}
                </ButtonContainer>
                <ConfirmContainer confStatus={confirmStatus}>
                    <Confirm>
                        <p>{t('ContractsPage.areYouSure')}</p>
                        <p>{t('ContractsPage.doYouWant')}</p>
                        <div>
                            <StyledConfirmBtn
                                type="primary"
                                onClick={() => setConfirmStatus(!confirmStatus)}
                            >
                                No
                            </StyledConfirmBtn>
                            <StyledConfirmBtn
                                type="primary"
                                onClick={() => onChangeStatus()}
                            >
                                Yes
                            </StyledConfirmBtn>
                        </div>
                    </Confirm>
                </ConfirmContainer>
            </SpinnerWrapper>
        </OneCard>
    );
};

export default ContractCard;
