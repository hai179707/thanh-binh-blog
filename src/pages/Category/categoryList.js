import config from "~/config";

export const categories = [
    {
        title: 'Chuyện chơi',
        subtitle: 'Đi đâu cũng đc, chính mình là được!',
        path: config.routes.chuyenChoi
    },
    {
        title: 'Chuyện sống',
        subtitle: 'Hạnh phúc là thứ cuối cùng đáng để theo đuổi',
        path: config.routes.chuyenSong
    },
    {
        title: 'Chuyện học',
        subtitle: 'Chỉ nên học những thứ mang lại cho ta hạnh phúc và giá trị',
        path: config.routes.chuyenHoc
    },
    {
        title: 'Chuyện làm',
        subtitle: 'Làm được gì tốt hơn thì làm!',
        path: config.routes.chuyenLam
    }
]