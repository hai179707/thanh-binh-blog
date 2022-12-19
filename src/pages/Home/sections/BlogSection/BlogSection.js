import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import { Link } from 'react-router-dom'

import styles from './BlogSection.module.scss'
import SectionWrapper from "~/components/SectionWrapper"
import Divide from '~/components/Divide'
import PostItem from '~/components/PostItem'
import { useEffect, useState } from 'react'
import SeeAllBtn from '~/components/SeeAllBtn'
import { getSuggestedPostOfCategory } from '~/services/postServices'
import { getACategory } from '~/services/categoryServices'

const cx = classNames.bind(styles)

function BlogSection({ path }) {
    const [list, setList] = useState([])
    const [cate, setCate] = useState()

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth

            if (windowWidth <= 1400 && windowWidth > 762) {
                setList(list.slice(0, 3))
            }
            else {
                setList(list)
            }
        }

        window.addEventListener('resize', handleResize)

        return () => (
            window.removeEventListener('resize', handleResize)
        )
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchApi = async () => {
            const cateRes = await getACategory(path)
            setCate(cateRes)
            const res = await getSuggestedPostOfCategory(path)
            window.innerWidth <= 1400 && window.innerWidth > 762
                ?
                setList(res.slice(0, 3))
                :
                setList(res)
        }
        fetchApi()
    }, [path])

    return (
        <SectionWrapper>
            {cate &&
                <div className={cx('text')}>
                    <Link to={cate.path} className={cx('title')}>{cate.name}</Link>
                    <Divide primary rounded width='50px' height='1px' />
                    {/* <div className={cx('subtitle')}>{data.subtitle}</div> */}
                    <SeeAllBtn path={'/category/' + cate.path} className={cx('see-all')} />
                </div>
            }
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {list.map((post, index) => (
                        <PostItem data={post} key={index} />
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}

BlogSection.propTypes = {
    data: PropTypes.string,
}

export default BlogSection