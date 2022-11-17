import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './BlogPageWrapper.module.scss'
import Divide from '../Divide'
import { Link } from 'react-router-dom'
import { RiArrowRightSLine } from 'react-icons/ri'
import PostGroupWrapper from '../PostGroupWrapper'

const cx = classNames.bind(styles)

function BlogPageWrapper({ title, subtitle, children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>{title}</h1>
                {subtitle && <span className={cx('subtitle')}>{subtitle}</span>}
                <Link to={'/category'} className={cx('all-category')}>
                    Tất cả chuyên mục
                    <span><RiArrowRightSLine /></span>
                </Link>
            </div>
            <Divide primary />
            <PostGroupWrapper className={cx('container')}>
                {children}
            </PostGroupWrapper>
        </div>
    )
}

BlogPageWrapper.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default BlogPageWrapper