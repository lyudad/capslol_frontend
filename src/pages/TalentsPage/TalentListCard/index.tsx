import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { notification } from 'antd';
import avatar from 'assets/avatar.png';
import { Slicer } from 'utilities/utilities';
import {
    StyledButton,
    JobTitle,
    OwnerContainer,
    Descriptions,
    ValueBox,
    Field,
    FieldValue,
    StyledNav,
    Avatar,
    FieldSkills,
} from './styles';
import 'antd/dist/antd.min.css';
import { talentProfile } from './props';

interface IProps {
    jobObj: talentProfile;
}

const TalentListCard: React.FC<IProps> = ({ jobObj }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const { id, user, other, profileImage, categories, skills } = jobObj;

    const onClickJob = (): void => {
        navigate(`/profile/${id}`, { state: id });
    };

    const handleSendProposal = (): void => {
        notification.success({
            message: 'Тут будет отправка ивайтов :)',
        });
    };

    return (
        <>
            <StyledButton onClick={onClickJob} type="submit">
                <JobTitle>
                    <Avatar>
                        <img src={profileImage || avatar} alt="" width={60} />
                    </Avatar>
                    {user?.firstName} {user?.lastName}
                </JobTitle>
            </StyledButton>
            <Descriptions>{Slicer(other)}</Descriptions>
            <OwnerContainer>
                <ValueBox>
                    <Field>{t('JobPage.category')}</Field>
                    <FieldValue>{categories?.categoryName}</FieldValue>
                </ValueBox>
                <ValueBox>
                    <Field>{t('JobPage.skills')}</Field>
                    <FieldSkills>
                        {skills
                            ?.map((item: { name: string }) => item.name)
                            .join(', ')}
                    </FieldSkills>
                </ValueBox>
            </OwnerContainer>
            <StyledNav onClick={handleSendProposal}>
                {t('TalentPage.send_interview')}
            </StyledNav>
        </>
    );
};

export default TalentListCard;
