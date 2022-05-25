import { useAppSelector } from 'hooks/redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { Paths } from './paths';

const Protected: React.FC = () => {
    const location = useLocation();
    const isAuthenticated = useAppSelector((state) => state.auth.accessToken);
    if (isAuthenticated) {
        return <Outlet />;
    }
    return <Navigate to={Paths.HOME} state={{ from: location.pathname }} />;
};

export default Protected;
