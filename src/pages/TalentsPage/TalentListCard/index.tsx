import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import { IJob } from 'store/apis/jobs/jobs.types';
import { notification } from 'antd';
import avatar from 'assets/avatar.png';
import {
    StyledButton,
    JobTitle,
    OwnerContainer,
    Descriptions,
    ValueBox,
    Field,
    FieldValue,
    StyledNav,
} from './styles';
import 'antd/dist/antd.min.css';

interface IProps {
    jobObj: IJob;
}

const TalentListCard: React.FC<IProps> = ({ jobObj }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const { id, title, description, categoryId, skills } = jobObj;

    const onClickJob = (): void => {
        navigate(Paths.JOB_PAGE, { state: { id } });
    };

    const handleSendProposal = (): void => {
        notification.success({
            message: 'Тут будет отправка ивайтов :)',
        });
    };
    let sliced: string = description.slice(0, 300);
    if (sliced.length < description.length) {
        sliced += '...';
    }

    return (
        <>
            <StyledButton onClick={onClickJob} type="submit">
                <JobTitle>
                    <img src={avatar} alt="" width={60} />
                    {title}
                </JobTitle>
            </StyledButton>
            <Descriptions>{sliced}</Descriptions>
            <OwnerContainer>
                <ValueBox>
                    <Field>{t('JobPage.category')}</Field>
                    <FieldValue>{categoryId.categoryName}</FieldValue>
                </ValueBox>
                <ValueBox>
                    <Field>{t('JobPage.skills')}</Field>
                    <FieldValue>
                        {skills.map((item) => item.name).join(', ')}
                    </FieldValue>
                </ValueBox>
            </OwnerContainer>
            <StyledNav onClick={handleSendProposal}>
                {t('TalentPage.send_interview')}
            </StyledNav>
        </>
    );
};

export default TalentListCard;
