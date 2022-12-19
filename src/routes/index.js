import config from "~/config"
import * as pages from '~/pages'
import * as layouts from '~/layouts'

const publicRoutes = [
    { path: config.routes.home, component: pages.HomePage, layout: layouts.Default },
    { path: config.routes.category, component: pages.Category, layout: layouts.Default },
    { path: config.routes.categoryPost, component: pages.CategoryPost, layout: layouts.Default },
    { path: config.routes.post, component: pages.Post, layout: layouts.Default },
    { path: config.routes.posts, component: pages.HomePage, layout: layouts.Default },
    { path: config.routes.tag, component: pages.Tag, layout: layouts.Default },
    { path: config.routes.tags, component: pages.HomePage, layout: layouts.Default },
    { path: config.routes.login, component: pages.Login, layout: layouts.Empty },
    { path: config.routes.test, component: pages.HomePage, layout: layouts.Dashboard },
]

const privateRoutes = [
    { path: config.routes.admin, component: pages.Admin, layout: layouts.Dashboard },
    { path: config.routes.adminPost, component: pages.AdminPost, layout: layouts.Dashboard },
    { path: config.routes.adminCreatePost, component: pages.CreateNewPost, layout: layouts.Dashboard },
    { path: config.routes.adminUpdatePost, component: pages.UpdatePost, layout: layouts.Dashboard },
    { path: config.routes.adminCategory, component: pages.AdminCategory, layout: layouts.Dashboard },
    { path: config.routes.adminUpdateCategory, component: pages.Admin, layout: layouts.Dashboard },
    { path: config.routes.adminTag, component: pages.AdminTag, layout: layouts.Dashboard },
    { path: config.routes.adminContact, component: pages.AdminContact, layout: layouts.Dashboard },
    { path: config.routes.adminMessage, component: pages.AdminMessage, layout: layouts.Dashboard },
    { path: config.routes.adminAbout, component: pages.AdminAbout, layout: layouts.Dashboard },
    { path: config.routes.adminUploadImage, component: pages.AdminUploadImage, layout: layouts.Dashboard },
]

export {
    publicRoutes,
    privateRoutes
}