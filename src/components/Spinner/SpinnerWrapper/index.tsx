/* eslint-disable react/jsx-no-useless-fragment */
import Spinner from 'components/Spinner/index';

interface IProps {
    isLoading: boolean;
    children: React.ReactNode;
}

const SpinnerWrapper: React.FC<IProps> = ({ isLoading, children }) => {
    return <>{isLoading ? <Spinner /> : children}</>;
};

export default SpinnerWrapper;
