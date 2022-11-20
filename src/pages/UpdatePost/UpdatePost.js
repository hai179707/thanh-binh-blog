import images from "~/assets/images"
import { EditPost } from "~/layouts"

function UpdatePost() {
    const post = {
        _id: '637651812d92875fcd1cb3d4',
        title: 'Thanh Bình và những người bạn trên đường!',
        description: 'Thanh Bình và những người bạn trên đường!',
        imageUrl: images.sidebarBg,
        path: 'thanh-binh-va-nhung-nguoi-ban-tren-duong',
        createAt: '2022-11-16T18:15:37.809+00:00',
        content: '<p>Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!</p>',
        public: false,
        category: {
            path: 'chuyenhoc',
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

    return (
        <EditPost data={post} />
    )
}

export default UpdatePost