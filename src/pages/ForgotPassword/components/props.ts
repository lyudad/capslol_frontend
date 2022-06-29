export interface Email {
    email: string;
}
export interface IProps {
    data: Email | undefined;
    isError: boolean;
    email: string | undefined;
}
