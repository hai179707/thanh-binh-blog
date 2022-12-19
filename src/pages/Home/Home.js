import classNames from "classnames/bind"

import { Slider as HomeSlider } from "~/components/Slider"
import { BlogSection, Introduce } from './sections'
import Contact from "./sections/Contact"
import styles from './Home.module.scss'
import { useEffect, useState } from "react"
import { getCategory } from "~/services/categoryServices"

const cx = classNames.bind(styles)

function Home() {
    const [cate, setCate] = useState([])
    useEffect(() => {
        console.log('Github: https://github.com/hai179707/thanh-binh-blog')
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchApi = async () => {
            const cateRes = await getCategory()
            setCate(cateRes)
        }
        fetchApi()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <HomeSlider />
            <Introduce />
            {
                cate.map(category => (
                    <BlogSection key={category._id} path={category.path} />
                ))
            }
            <Contact />
        </div>
    )
}

export default Home