import React, { useState } from 'react';
import { message, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import avatar from 'assets/avatar.png';
import { TitleGroup, Circle, Title } from 'pages/ContactInfo/styles';
import {
    useCreateProfileMutation,
    useSearchUserQuery,
    useUploadAvatarMutation,
} from 'store/apis/publicProfile';
import { newProfile } from 'store/apis/publicProfile/publicProfile.types';
import { NotificationType } from 'pages/SendProposal/interfaces';
import { validateImage } from 'constants/validate';
import { Avatar, CustomFileUpload, StyledImg, Wrapper } from '../styles';
import { IChangePhotoProps } from '../props';

const ChangePhoto: React.FC<IChangePhotoProps> = ({ user }) => {
    const [previewSource, setPreviewSource] = useState<string>('');

    const [createProfile, { isError }] = useCreateProfileMutation();
    const { data: userProfile } = useSearchUserQuery(user?.id);
    const [uploadAvatar] = useUploadAvatarMutation();
    const { t } = useTranslation();

    const previewFile = (file: Blob): void => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result as string);
        };
    };

    const openNotificationWithIcon = (
        type: NotificationType,
        msg: string,
        desc: string
    ): void => {
        notification[type]({
            message: msg,
            description: desc,
        });
    };

    const handleUploadImage = async (
        event: React.ChangeEvent
    ): Promise<void> => {
        try {
            const target = event.target as HTMLInputElement;
            const file = (target.files as FileList)[0];

            if (!file.type.match(validateImage)) {
                openNotificationWithIcon(
                    'error',
                    'Error',
                    `${t('ContactInfo.imageError')}`
                );
                return;
            }

            previewFile(file);

            const newFormData = new FormData();
            newFormData.append('file', file);
            newFormData.append('upload_preset', 'ycmt0cuu');
            const { url } = await uploadAvatar(newFormData).unwrap();
            const UpdateProfile: newProfile = {
                id: user?.id,
                userId: user?.id,
                profileImage: url,
                hourRate: 0,
                availableHours: 0,
                categories: undefined,
                skills: undefined,
                english: 'No English',
            };

            await createProfile(UpdateProfile);
            openNotificationWithIcon(
                'success',
                'Success',
                `${t('ContactInfo.congratsNotifice')}`
            );
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <TitleGroup mb="35">
            <Wrapper>
                {previewSource ? (
                    <Avatar>
                        <StyledImg src={previewSource} alt={user?.firstName} />
                    </Avatar>
                ) : (
                    <Avatar>
                        <StyledImg
                            src={userProfile?.profileImage || avatar}
                            alt={user?.firstName}
                        />
                    </Avatar>
                )}

                <CustomFileUpload htmlFor="contained-button-file">
                    <input
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleUploadImage}
                        accept="image/*"
                    />
                    <PlusOutlined />
                </CustomFileUpload>
            </Wrapper>
            <div>
                <Title fs="28">
                    {`${user?.firstName ? user?.firstName : ''}
                        ${user?.lastName ? user?.lastName : ''}`}
                </Title>
                <Circle>
                    {user?.role ? user?.role : `${t('ContactInfo.emptyRole')}`}
                </Circle>
            </div>
            <>
                {' '}
                {isError &&
                    openNotificationWithIcon(
                        'error',
                        'Error',
                        `${t('ContactInfo.errorNotifice')}`
                    )}
            </>
        </TitleGroup>
    );
};

export default ChangePhoto;
