import React, { useRef } from 'react';
import { message } from 'antd';

import { useUploadAvatarMutation } from 'store/apis/publicProfile';
import { CustomFileUpload } from '../styles';
import { IFileUploadProps } from '../props';

const FileUploader: React.FC<IFileUploadProps> = ({
    previewFile,
    setAvatarUrl,
    handleChangePhoto,
}) => {
    const hiddenFileInput = useRef<HTMLInputElement | null>(null);

    const [uploadAvatar] = useUploadAvatarMutation();

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
            const response = await uploadAvatar(newFormData).unwrap();

            setAvatarUrl(response.url);

            await handleChangePhoto();
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <>
            <CustomFileUpload onClick={handleClick} />
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleUploadImage}
                style={{ display: 'none' }}
            />
        </>
    );
};

export default FileUploader;
