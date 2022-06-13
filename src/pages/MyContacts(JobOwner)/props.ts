import { Dispatch, SetStateAction } from 'react';
import { UserType } from 'store/slices/auth/auth.type';

export interface IAboutProps {
    label: string;
    member: string | undefined | null;
}

export interface IChangePhotoProps {
    user: UserType | undefined;
}

export interface IFileUploadProps {
    previewFile: (file: Blob) => void;
    setAvatarUrl: Dispatch<SetStateAction<undefined>>;
    handleChangePhoto: () => Promise<void>;
}
