import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useChangeStatusMutation } from 'store/apis/offers';
import { Paths } from 'router/paths';
import { IMyOffer, Status } from 'store/apis/offers/offers.types';
import { dateFormat } from 'constants/index';
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
} from '../styles';

interface IProps {
    offerObj: IMyOffer;
}

const OfferCard: React.FC<IProps> = ({ offerObj }) => {
    const [offerStatus, setOfferStatus] = useState<string>();

    const { t } = useTranslation();

    const navigate = useNavigate();

    const [changeStatus] = useChangeStatusMutation();

    const { id, createdAt, jobId, ownerId, hourRate, status } = offerObj;

    useEffect(() => {
        setOfferStatus(status);
    }, [status]);

    const onClickBtn = async (value: Status): Promise<void> => {
        try {
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
                <FieldValue>{offerStatus}</FieldValue>
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
                    <StatusValue>You accepted this offer</StatusValue>
                )}
                {offerStatus === Status.DECLINED && (
                    <StatusValue>You rejected this offer</StatusValue>
                )}
            </ButtonContainer>
        </OneCard>
    );
};

export default OfferCard;
