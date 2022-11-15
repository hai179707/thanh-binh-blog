import { Navigate, Outlet } from 'react-router-dom'
import routes from '~/config/routes'

function PrivateRoutes() {
    const isAuth = false

    return isAuth ? <Outlet /> : <Navigate to={routes.login} />
}

export default PrivateRoutes