import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import { Link } from 'react-router-dom'
import { RiArrowRightSLine } from 'react-icons/ri'

import styles from './BlogSection.module.scss'
import SectionWrapper from "~/components/SectionWrapper"
import Divide from '~/components/Divide'
import PostItem from '~/components/PostItem'

const cx = classNames.bind(styles)

function BlogSection({ data }) {
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
                    {data.postList.map((post, index) => (
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