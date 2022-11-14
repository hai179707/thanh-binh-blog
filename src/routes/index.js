import config from "~/config"
import * as pages from '~/pages'
import * as layouts from '~/layouts'

const publicRoutes = [
    { path: config.routes.home, component: pages.HomePage, layout: layouts.Default },
    { path: config.routes.chuyenChoi, component: pages.ChuyenChoi, layout: layouts.Default }
]

const privateRoutes = []

export {
    publicRoutes,
    privateRoutes
}