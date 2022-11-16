import classNames from "classnames/bind"

import { Slider as HomeSlider } from "~/components/Slider"
import styles from './Home.module.scss'
import { BlogSection, Introduce } from './sections'
import * as postList from './postList.js'

const cx = classNames.bind(styles)

function Home() {

    return (
        <div className={cx('wrapper')}>
            <HomeSlider />
            <Introduce />
            <BlogSection data={postList.chuyenHoc} />
            <BlogSection data={postList.chuyenChoi} />
            <BlogSection data={postList.chuyenLam} />
            <BlogSection data={postList.chuyenSong} />
        </div>
    )
}

export default Home