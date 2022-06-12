import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import { IContract } from 'store/apis/contracts/contracts.types';
import { dateFormat } from 'constants/index';
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
    const [contractStatus, setContractStatus] = useState<string>('IS STARTED');
    const [confirmStatus, setConfirmStatus] = useState<boolean>(false);

    const { t } = useTranslation();

    const navigate = useNavigate();

    const { createdAt, jobId, ownerId, offerId, freelancerId, closedAt } =
        contractObj;

    const onClickJob = (): void => {
        navigate(Paths.JOB_PAGE, { state: { id: jobId.id } });
    };
    return (
        <OneCard>
            <DateWrapper>
                {moment(new Date(createdAt)).format(dateFormat)}
            </DateWrapper>

            <StyledTitleCardButton onClick={onClickJob} type="submit">
                <CardTitle>{jobId.title}</CardTitle>
                <Salary>{jobId.price}$</Salary>
            </StyledTitleCardButton>

            <ValueBox>
                <Field>{t('ContractsPage.jobOwner')}</Field>
                <FieldValue>
                    {ownerId.firstName} {ownerId.lastName}
                </FieldValue>
            </ValueBox>

            <ValueBox>
                <Field>{t('ContractsPage.freelancer')}</Field>
                <FieldValue>
                    {freelancerId.firstName} {freelancerId.lastName}
                </FieldValue>
            </ValueBox>

            <ValueBox>
                <Descriptions>{jobId.description}</Descriptions>
            </ValueBox>

            <ValueBox>
                <Field>{t('OffersPage.ownerHourRate')}</Field>
                <FieldValue>${offerId?.hourRate}/h</FieldValue>
            </ValueBox>

            <ValueBox>
                <Field>{t('ContractsPage.status')}</Field>
                <FieldStatusValue contrStatus={contractStatus}>
                    {contractStatus}
                </FieldStatusValue>
            </ValueBox>

            <ValueBox>
                <Field>{t('ContractsPage.startDate')}</Field>
                <FieldValue>
                    {moment(new Date(createdAt)).format(dateFormat)}
                </FieldValue>
            </ValueBox>

            {contractStatus === 'IS ENDED' && (
                <ValueBox>
                    <Field>{t('ContractsPage.endDate')}</Field>
                    <FieldValue>
                        {moment(new Date()).format(dateFormat)}
                    </FieldValue>
                </ValueBox>
            )}

            {contractStatus === 'IS ENDED' && (
                <StatusValue>{t('ContractsPage.contractIsEnded')}</StatusValue>
            )}

            <ButtonContainer>
                <StyledCardBtn>{t('OffersPage.goToChat')}</StyledCardBtn>
                {contractStatus === 'IS STARTED' && (
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
                            onClick={() => {
                                setConfirmStatus(!confirmStatus);
                                setContractStatus('IS ENDED');
                            }}
                        >
                            Yes
                        </StyledConfirmBtn>
                    </div>
                </Confirm>
            </ConfirmContainer>
        </OneCard>
    );
};

export default ContractCard;
