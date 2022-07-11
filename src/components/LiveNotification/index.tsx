import { HideWrapper } from 'components/HideWrapper/styles';
import { LiveNote, Value } from './styles';

interface IProps {
    count: number;
}

const LiveNotification: React.FC<IProps> = ({ count }) => {
    return (
        <HideWrapper showWhen={count > 0}>
            <LiveNote>
                <Value>{count}</Value>
            </LiveNote>
        </HideWrapper>
    );
};

export default LiveNotification;
