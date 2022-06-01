import { LoadingOutlined } from '@ant-design/icons';
import { StyledSpinner } from './styles';

const antIcon = <LoadingOutlined spin />;

const Spinner: React.FC = () => {
    return <StyledSpinner indicator={antIcon} />;
};

export default Spinner;
