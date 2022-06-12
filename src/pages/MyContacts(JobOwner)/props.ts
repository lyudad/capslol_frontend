import { Profile } from 'store/apis/publicProfile/publicProfile.types';
import { UserType } from 'store/slices/auth/auth.type';

export interface IAboutProps {
    label: string;
    member: string | undefined | null;
}

export interface IChangePhotoProps {
    previewSource: string;
    data: Profile;
    handleUploadImage: (event: React.ChangeEvent) => Promise<void>;
    user: UserType;
}
