import images from "~/assets/images";

export const posts = [
    {
        id: 1,
        post: {
            title: 'Thanh Bình và những người bạn trên đường!',
            description: 'Thanh Bình và những người bạn trên đường!',
            imageUrl: images.sidebarBg,
            path: 'thanh-binh-va-nhung-nguoi-ban-tren-duong',
            createAt: '2022-11-16T18:15:37.809+00:00',
            content: '<p>Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!</p>',
            category: {
                path: '/category/chuyenhoc',
                name: 'Chuyện học'
            },
            tags: [
                {
                    path: 'nhung-nguoi-ban',
                    name: 'những người bạn'
                },
                {
                    path: 'thanh-binh',
                    name: 'Thanh Bình'
                }
            ]

        }
    },
    {
        id: 2,
        post: {
            title: 'Những cái “thú” khi về quê này bạn đã biết!',
            description: 'Thanh Bình và những người bạn trên đường!',
            imageUrl: images.sidebarBg,
            path: 've-que-lam-viec-cung-rat-thu-vi',
            createAt: '2022-11-16T18:15:37.809+00:00',
            content: '<p>Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!</p>',
            category: {
                path: '/category/chuyenhoc',
                name: 'Chuyện làm'
            },
            tags: [
                {
                    path: 've-que',
                    name: 'về quê'
                },
                {
                    path: 'ban-da-biet',
                    name: 'bạn đã biết'
                },
                {
                    path: 'thu-choi',
                    name: 'thú chơi'
                },
                {
                    path: 'thanh-binh',
                    name: 'Thanh Bình'
                }
            ]

        }
    },
    {
        id: 3,
        post: {
            title: 'Suýt khỏi về nước từ Luang Prabang, Lào (phần 2)',
            description: 'Thanh Bình và những người bạn trên đường!',
            imageUrl: images.sidebarBg,
            path: 'du-lich-toi-lao-3',
            createAt: '2022-11-16T18:15:37.809+00:00',
            content: '<p>Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!</p>',
            category: {
                path: '/category/chuyenhoc',
                name: 'Chuyện chơi'
            },
            tags: [
                {
                    path: 'lao',
                    name: 'Lào'
                },
                {
                    path: 'luang-prabang',
                    name: 'Luang Prabang'
                },
                {
                    path: 'du-lich',
                    name: 'du lịch'
                },
                {
                    path: 'thanh-binh',
                    name: 'Thanh Bình'
                }
            ]

        }
    }
]