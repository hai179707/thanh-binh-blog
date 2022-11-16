import classNames from "classnames/bind"

import { Slider as HomeSlider } from "~/components/Slider"
import { BlogSection, Introduce } from './sections'
import * as postList from '../postList.js'
import Contact from "./sections/Contact"
import styles from './Home.module.scss'

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
            <Contact />
        </div>
    )
}

export default Home