/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-useless-fragment */
import { useAppSelector } from 'hooks/redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { Paths } from './paths';

interface IProps {
    userRole: string;
    redirectPath: string;
    children: React.ReactNode;
}

export const Protected: React.FC = () => {
    const location = useLocation();
    const isAuthenticated = useAppSelector((state) => state.auth.accessToken);
    if (isAuthenticated) {
        return <Outlet />;
    }
    return <Navigate to={Paths.HOME} state={{ from: location.pathname }} />;
};

export const ProtectedRoute: React.FC<IProps> = ({
    userRole,
    redirectPath,
    children,
}: IProps): JSX.Element => {
    const role = useAppSelector((state) => state.auth.user?.role);
    if (role !== userRole) {
        return <Navigate to={redirectPath} replace />;
    }
    return <>{children}</>;
};
