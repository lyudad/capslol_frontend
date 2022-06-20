import { Notification, NoteBox } from './styles';

interface IPrps {
    note: string;
}

const EmptyListNotification: React.FC<IPrps> = ({ note }) => {
    return (
        <NoteBox>
            <Notification>{note}</Notification>
        </NoteBox>
    );
};

export default EmptyListNotification;
