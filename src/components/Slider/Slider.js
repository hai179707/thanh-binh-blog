import classNames from "classnames/bind"
import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Controller } from "swiper"
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/bundle"


import styles from './Slider.module.scss'
import './Slider.scss'
import SlideItem from "./SlideItem"
import images from "~/assets/images"

const cx = classNames.bind(styles)

function Slider() {
    const swiperRef = useRef()

    const data = [
        {
            title: 'Chuyện chơi',
            description: 'Đi đâu cũng được, chính mình là được!',
            imageUrl: images.sidebarBg,
            blogUrl: '/'
        },
        {
            title: 'Chuyện làm',
            description: 'Làm được gì tốt hơn thì làm!',
            imageUrl: images.sidebarBg,
            blogUrl: '/'
        },
        {
            title: 'Chuyện học',
            description: 'Chỉ nên học những thứ mang lại cho ta hạnh phúc và giá trị',
            imageUrl: images.sidebarBg,
            blogUrl: '/'
        },
        {
            title: 'Chuyện sống',
            description: 'Hạnh phúc là thứ cuối cùng đáng để theo đuổi',
            imageUrl: images.sidebarBg,
            blogUrl: '/'
        }
    ]

    return (
        <div className={cx('wrapper')}>
            <Swiper
                pagination={{
                    clickable: true
                }}
                modules={[Pagination, Navigation, Controller]}
                loop={true}
                navigation={true}
                updateOnWindowResize
                onBeforeInit={swiper => swiperRef.current = swiper}
                className={cx('mySwiper')}
            >
                {data.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <SlideItem data={slide} index={index} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={cx('next')} onClick={() => { swiperRef.current?.slideNext() }}><RiArrowRightSLine /></div>
            <div className={cx('prev')} onClick={() => { swiperRef.current?.slidePrev() }}><RiArrowLeftSLine /></div>
        </div>
    )
}

export default Slider