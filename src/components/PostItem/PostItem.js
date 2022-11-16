import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import styles from './PostItem.module.scss'
import { RiArrowRightUpLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function PostItem({ data }) {
    return (
        <div className={cx('post')}>
            <div className={cx('image')} style={{ backgroundImage: `url(${data.imageUrl})` }} >
                <Link to={'/'}>
                    <div className={cx('overlay')} >
                        <button className={cx('overlay-btn')}>Xem bài viết</button>
                    </div>
                </Link>
            </div>
            <div className={cx('post-text')}>
                <Link to={'/'} className={cx('post-title')}>{data.title}</Link>
                <p className={cx('post-date')}>{data.date}</p>
                <p className={cx('post-description')}>{data.description}</p>
                <Link to={'/'} className={cx('see-more-btn')}>Đọc thêm <span><RiArrowRightUpLine /></span></Link>
            </div>
        </div>
    )
}

PostItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default PostItem