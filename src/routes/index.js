import config from "~/config"
import * as pages from '~/pages'
import * as layouts from '~/layouts'

const publicRoutes = [
    { path: config.routes.home, component: pages.HomePage, layout: layouts.Default },
    { path: config.routes.chuyenChoi, component: pages.ChuyenChoi, layout: layouts.Default },
    { path: config.routes.chuyenLam, component: pages.ChuyenLam, layout: layouts.Default },
    { path: config.routes.chuyenHoc, component: pages.ChuyenHoc, layout: layouts.Default },
    { path: config.routes.chuyenSong, component: pages.ChuyenSong, layout: layouts.Default },
    { path: config.routes.login, component: pages.Login, layout: layouts.Default },
]

const privateRoutes = [
    { path: config.routes.admin, component: pages.Admin, layout: layouts.Default },
]

export {
    publicRoutes,
    privateRoutes
}