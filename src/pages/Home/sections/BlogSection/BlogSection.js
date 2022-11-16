import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import { Link } from 'react-router-dom'
import { RiArrowRightSLine } from 'react-icons/ri'

import styles from './BlogSection.module.scss'
import SectionWrapper from "~/components/SectionWrapper"
import Divide from '~/components/Divide'
import PostItem from '~/components/PostItem'
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

function BlogSection({ data }) {
    const [list, setList] = useState(window.innerWidth <= 1400 && window.innerWidth > 762 ? data.suggest.slice(0, 3) : data.suggest)

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth

            if (windowWidth <= 1400 && windowWidth > 762) {
                setList(data.suggest.slice(0, 3))
            }
            else {
                setList(data.suggest)
            }
        }

        window.addEventListener('resize', handleResize)

        return () => (
            window.removeEventListener('resize', handleResize)
        )
    })

    return (
        <SectionWrapper>
            <div className={cx('text')}>
                <Link to={data.path} className={cx('title')}>{data.title}</Link>
                <Divide primary rounded width='50px' height='1px' />
                <div className={cx('subtitle')}>{data.subtitle}</div>
                <Link to={data.path} className={cx('see-all')}>Xem tất cả <span><RiArrowRightSLine /></span></Link>
            </div>
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
    data: PropTypes.object.isRequired,
}

export default BlogSection