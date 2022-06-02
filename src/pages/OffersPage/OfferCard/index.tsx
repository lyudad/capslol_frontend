import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import { IMyOffer } from 'store/apis/offers/offers.types';
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
} from '../styles';

interface IProps {
    offerObj: IMyOffer;
}

const OfferCard: React.FC<IProps> = ({ offerObj }) => {
    const [offerStatus, setOfferStatus] = useState<string>();

    const { t } = useTranslation();

    const navigate = useNavigate();

    const { createdAt, jobId, ownerId, hourRate, status } = offerObj;

    useEffect(() => {
        setOfferStatus(status);
    }, [status]);

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
                {offerStatus === 'Pending' && (
                    <>
                        <StyledCardBtn>{t('OffersPage.accept')}</StyledCardBtn>
                        <StyledCardBtn>{t('OffersPage.decline')}</StyledCardBtn>
                    </>
                )}
            </ButtonContainer>
        </OneCard>
    );
};

export default OfferCard;
