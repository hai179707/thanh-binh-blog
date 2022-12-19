const routes = {
    home: '/',
    category: '/category',
    categoryPost: '/category/:categoryId',
    post: '/posts/:postPath',
    posts: '/posts',
    tag: '/tag/:tagPath',
    tags: '/tag',
    login: '/login',
    admin: '/admin',
    adminPost: '/admin/web/posts',
    adminUploadImage: '/admin/upload/image',
    adminCreatePost: '/admin/web/posts/new',
    adminUpdatePost: '/admin/web/posts/:postId',
    adminCategory: '/admin/web/categories',
    adminUpdateCategory: '/admin/web/categories/:categoryId',
    adminTag: '/admin/web/tags',
    adminContact: '/admin/contact',
    adminAbout: '/admin/about',
    adminMessage: '/admin/message',
    test: '/test',
}

export const rootPath = 'http://localhost:3000'

export default routes