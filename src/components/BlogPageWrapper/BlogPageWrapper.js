import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './BlogPageWrapper.module.scss'
import Divide from '../Divide'

const cx = classNames.bind(styles)

function BlogPageWrapper({ title, subtitle, children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>{title}</h1>
                <span className={cx('subtitle')}>{subtitle}</span>
            </div>
            <Divide primary />
            <div className={cx('container')}>
                {children}
            </div>
        </div>
    )
}

BlogPageWrapper.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default BlogPageWrapper