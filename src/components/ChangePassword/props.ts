export interface IChangePassword {
    newPassword: string;
    confirmPassword: string;
}

export interface IProps {
    onFinish: (values: IChangePassword) => Promise<void>;
    loading: boolean;
}
