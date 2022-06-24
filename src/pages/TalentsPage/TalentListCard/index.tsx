import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { notification } from 'antd';
import avatar from 'assets/avatar.png';
import { useState } from 'react';
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
    const [targetId, setTargetId] = useState();
    const { t } = useTranslation();

    const navigate = useNavigate();

    const { id, user, other, profileImage, categories, skills } = jobObj;

    const onClickJob = (): void => {
        navigate(`/talents/profile/${id}`, { state: id });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSendInterview = (e: any): void => {
        setTargetId(e.currentTarget.id);

        notification.success({
            message: t('TalentPage.sent_to') + e.currentTarget.name,
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
            {id === Number(targetId) ? (
                <StyledNav disabled>{t('TalentPage.already_sent')}</StyledNav>
            ) : (
                <StyledNav
                    name={`${user?.firstName} ${user?.lastName}`}
                    id={String(id)}
                    onClick={handleSendInterview}
                >
                    {t('TalentPage.send_interview')}
                </StyledNav>
            )}
        </>
    );
};

export default TalentListCard;
