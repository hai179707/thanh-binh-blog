import { Navigate, Outlet } from 'react-router-dom'
import routes from '~/config/routes'

function PrivateRoutes() {
    const isAuth = true

    return isAuth ? <Outlet /> : <Navigate to={routes.login} />
}

export default PrivateRoutes