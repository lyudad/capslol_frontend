import React, { useRef, useState } from 'react';
import { message, notification } from 'antd';

import avatar from 'assets/avatar.png';
import { TitleGroup, Circle, Title } from 'pages/ContactInfo/styles';
import {
    useCreateProfileMutation,
    useSearchUserQuery,
    useUpdateOwnerProfileImageMutation,
    useUploadAvatarMutation,
} from 'store/apis/publicProfile';
import { newProfile } from 'store/apis/publicProfile/publicProfile.types';
import { NotificationType } from 'pages/SendProposal/interfaces';
import { Avatar, CustomFileUpload, StyledImg, Wrapper } from '../styles';
import { IChangePhotoProps } from '../props';

const ChangePhoto: React.FC<IChangePhotoProps> = ({ user }) => {
    const [createProfile] = useCreateProfileMutation();
    const [avatarUrl, setAvatarUrl] = useState();
    const [previewSource, setPreviewSource] = useState<string>('');
    const hiddenFileInput = useRef<HTMLInputElement | null>(null);

    const { data: userProfile } = useSearchUserQuery(user?.id);
    const [uploadAvatar] = useUploadAvatarMutation();

    const [updateProfileImage, { isError }] =
        useUpdateOwnerProfileImageMutation();

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

    const handleUpdate = async (): Promise<void> => {
        try {
            const UpdateProfile = {
                id: user?.id,
                profileImage: avatarUrl,
            };

            await updateProfileImage(UpdateProfile);
        } catch (error) {
            message.error(error.status);
        }
    };

    const handleChangePhoto = async (): Promise<void> => {
        try {
            const UpdateProfile: newProfile = {
                id: user?.id,
                userId: Number(user?.id),
                profileImage: avatarUrl,
                hourRate: 0,
                availableHours: 0,
                position: '',
                other: '',
            };

            await createProfile(UpdateProfile);
        } catch (error) {
            message.error(error.status);
        }
    };

    const handleClick = (): void => {
        hiddenFileInput?.current?.click();
    };

    const handleUploadImage = async (
        event: React.ChangeEvent
    ): Promise<void> => {
        try {
            const target = event.target as HTMLInputElement;
            const file = (target.files as FileList)[0];

            previewFile(file);

            const newFormData = new FormData();
            newFormData.append('file', file);
            newFormData.append('upload_preset', 'ycmt0cuu');
            const { url } = await uploadAvatar(newFormData).unwrap();

            setAvatarUrl(url);

            if (userProfile?.profileImage !== undefined || null) {
                await handleUpdate();
            } else {
                await handleChangePhoto();
            }
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

                <>
                    <CustomFileUpload onClick={handleClick} />
                    <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleUploadImage}
                        style={{ display: 'none' }}
                    />
                </>
            </Wrapper>
            <div>
                <Title fs="28">
                    {`${user?.firstName ? user?.firstName : ''}
                        ${user?.lastName ? user?.lastName : ''}`}
                </Title>
                <Circle>{user?.role ? user?.role : 'Not Found'}</Circle>
            </div>
            <>
                {' '}
                {isError &&
                    openNotificationWithIcon(
                        'error',
                        'Error',
                        'Something went wrong, please try again later!'
                    )}
            </>
        </TitleGroup>
    );
};

export default ChangePhoto;
