import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useChangeStatusMutation } from 'store/apis/offers';
import { useCreateContractMutation } from 'store/apis/contracts';
import { Paths } from 'router/paths';
import { IMyOffer, Status } from 'store/apis/offers/offers.types';
import { dateFormat } from 'constants/index';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
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
    StatusValue,
    FieldStatusValue,
} from '../styles';

interface IProps {
    offerObj: IMyOffer;
}

const OfferCard: React.FC<IProps> = ({ offerObj }) => {
    const [offerStatus, setOfferStatus] = useState<string>(Status.PENDING);

    const { t } = useTranslation();

    const navigate = useNavigate();

    const [changeStatus, { isLoading }] = useChangeStatusMutation();

    const [createContract] = useCreateContractMutation();

    const { id, createdAt, jobId, ownerId, hourRate, status, freelancerId } =
        offerObj;

    useEffect(() => {
        setOfferStatus(status);
    }, [status]);

    const onClickBtn = async (value: Status): Promise<void> => {
        try {
            if (value === Status.ACCEPTED) {
                await createContract({
                    ownerId: ownerId.id,
                    freelancerId: freelancerId.id,
                    jobId: jobId.id,
                    offerId: id,
                }).unwrap();
            }
            const response = await changeStatus({
                id,
                status: value,
            }).unwrap();

            setOfferStatus(response.status);
        } catch (error) {
            if ('data' in error) {
                message.error(error.data.message);
            }
            if ('error' in error) {
                message.error(error.status);
            }
        }
    };

    const onClickJob = (): void => {
        navigate(Paths.JOB_PAGE, { state: { id: jobId.id } });
    };
    return (
        <OneCard>
            <SpinnerWrapper isLoading={isLoading}>
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

                <ValueBox>
                    <Field>{t('OffersPage.ownerHourRate')}</Field>
                    <FieldValue>{hourRate}$</FieldValue>
                </ValueBox>

                <ValueBox>
                    <Field>{t('OffersPage.status')}</Field>
                    <FieldStatusValue ofStatus={offerStatus}>
                        {offerStatus}
                    </FieldStatusValue>
                </ValueBox>

                <ButtonContainer>
                    <StyledCardBtn>{t('OffersPage.goToChat')}</StyledCardBtn>
                    {offerStatus === Status.PENDING && (
                        <>
                            <StyledCardBtn
                                onClick={() => onClickBtn(Status.ACCEPTED)}
                            >
                                {t('OffersPage.accept')}
                            </StyledCardBtn>
                            <StyledCardBtn
                                onClick={() => onClickBtn(Status.DECLINED)}
                            >
                                {t('OffersPage.decline')}
                            </StyledCardBtn>
                        </>
                    )}
                    {offerStatus === Status.ACCEPTED && (
                        <StatusValue>
                            {' '}
                            {t('OffersPage.youAccepted')}
                        </StatusValue>
                    )}
                    {offerStatus === Status.DECLINED && (
                        <StatusValue>
                            {' '}
                            {t('OffersPage.youRejected')}
                        </StatusValue>
                    )}
                </ButtonContainer>
            </SpinnerWrapper>
        </OneCard>
    );
};

export default OfferCard;
