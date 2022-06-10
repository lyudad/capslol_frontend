import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import { IMyOffer } from 'store/apis/offers/offers.types';
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
    offerObj: IMyOffer;
}

const ContractCard: React.FC<IProps> = ({ offerObj }) => {
    const [contractStatus, setContractStatus] = useState<string>('IS STARTED');
    const [confirmStatus, setConfirmStatus] = useState<boolean>(false);

    const { t } = useTranslation();

    const navigate = useNavigate();

    const { createdAt, jobId, ownerId, hourRate, freelancerId } = offerObj;

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
                <FieldValue>${hourRate}/h</FieldValue>
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
                <StatusValue>CONTRACT IS ENDED</StatusValue>
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
                    <p>Are you sure?</p>
                    <p>Do you really want to end the contract?</p>
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
