import config from "~/config"
import * as pages from '~/pages'
import * as layouts from '~/layouts'

const publicRoutes = [
    { path: config.routes.home, component: pages.HomePage, layout: layouts.Default },
    { path: config.routes.category, component: pages.Category, layout: layouts.Default },
    { path: config.routes.chuyenChoi, component: pages.ChuyenChoi, layout: layouts.Default },
    { path: config.routes.chuyenLam, component: pages.ChuyenLam, layout: layouts.Default },
    { path: config.routes.chuyenHoc, component: pages.ChuyenHoc, layout: layouts.Default },
    { path: config.routes.chuyenSong, component: pages.ChuyenSong, layout: layouts.Default },
    { path: config.routes.post, component: pages.Post, layout: layouts.Default },
    { path: config.routes.posts, component: pages.HomePage, layout: layouts.Default },
    { path: config.routes.tag, component: pages.Tag, layout: layouts.Default },
    { path: config.routes.tags, component: pages.HomePage, layout: layouts.Default },
    { path: config.routes.login, component: pages.Login, layout: layouts.Empty },
    { path: config.routes.test, component: pages.TextEditor, layout: layouts.Dashboard },
]

const privateRoutes = [
    { path: config.routes.admin, component: pages.Admin, layout: layouts.Dashboard },
    { path: config.routes.adminPost, component: pages.AdminPost, layout: layouts.Dashboard },
    { path: config.routes.adminCreatePost, component: pages.CreateNewPost, layout: layouts.Dashboard },
    { path: config.routes.adminUpdatePost, component: pages.Admin, layout: layouts.Dashboard },
    { path: config.routes.adminCategory, component: pages.Admin, layout: layouts.Dashboard },
    { path: config.routes.adminUpdateCategory, component: pages.Admin, layout: layouts.Dashboard },
    { path: config.routes.adminTag, component: pages.Admin, layout: layouts.Dashboard },
    { path: config.routes.adminContact, component: pages.Admin, layout: layouts.Dashboard },
    { path: config.routes.adminMessage, component: pages.Admin, layout: layouts.Dashboard },
]

export {
    publicRoutes,
    privateRoutes
}