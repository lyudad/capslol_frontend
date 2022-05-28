import Spinner from 'components/Spinner';
import { useTranslation } from 'react-i18next';
import { useGetJobByIdQuery } from 'store/apis/jobs';
import { IMyProposal } from 'store/apis/proposals/proposal.types';
import {
    DateContainer,
    StyledTitleCardButton,
    CardTitle,
    Salary,
    Descriptions,
    ValueBox,
    Field,
    FieldValue,
    OneCard,
} from '../styles';

interface IProps {
    proposalObj: IMyProposal;
}

const ProposalCard: React.FC<IProps> = ({ proposalObj }) => {
    const { t } = useTranslation();

    const { createdAt, jobId, hourRate, coverLetter } = proposalObj;

    const { data: job, isLoading } = useGetJobByIdQuery(jobId.id);

    const onClickJob = (): void => {
        // navigate(Paths.JOB_PAGE, { state: { id } });
    };
    return (
        <OneCard>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <DateContainer>{createdAt.substring(0, 10)}</DateContainer>

                    <StyledTitleCardButton onClick={onClickJob} type="submit">
                        <CardTitle>{jobId.title}</CardTitle>
                        <Salary>{jobId.price}$</Salary>
                    </StyledTitleCardButton>

                    <ValueBox>
                        <Field>{t('JobPage.jobOwner')}</Field>
                        <FieldValue>
                            {job?.ownerId.firstName} {job?.ownerId.lastName}
                        </FieldValue>
                    </ValueBox>

                    <ValueBox>
                        <Descriptions>{coverLetter}</Descriptions>
                    </ValueBox>

                    <ValueBox>
                        <Field>{t('OffersPage.myHourRate')}</Field>
                        <FieldValue>{hourRate}</FieldValue>
                    </ValueBox>
                </>
            )}
        </OneCard>
    );
};

export default ProposalCard;
