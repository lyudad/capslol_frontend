import { Notification, NoteBox } from './styles';

const EmptyListNotification: React.FC = () => {
    return (
        <NoteBox>
            <Notification>ВАЖЛИВЕ ПОВІДОМЛЕННЯ</Notification>
        </NoteBox>
    );
};

export default EmptyListNotification;
