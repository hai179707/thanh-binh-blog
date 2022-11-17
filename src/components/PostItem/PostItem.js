import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import styles from './PostItem.module.scss'
import { RiArrowRightUpLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function PostItem({ data, divide = false }) {
    return (
        <div className={cx('post', { divide })}>
            <div className={cx('image')} style={{ backgroundImage: `url(${data.imageUrl})` }} >
                <Link to={`/post/${data.path}`}>
                    <div className={cx('overlay')} >
                        <button className={cx('overlay-btn')}>Xem bài viết</button>
                    </div>
                </Link>
            </div>
            <div className={cx('post-text')}>
                <Link to={`/post/${data.path}`} className={cx('post-title')}>{data.title}</Link>
                <div className={cx('post-detail')}>
                    <Link to={data.category.path} className={cx('post-category')}>{data.category.name}</Link>
                    <span>•</span>
                    <p className={cx('post-date')}>{data.date}</p>
                </div>
                <p className={cx('post-description')}>{data.description}</p>
                <Link to={`/post/${data.path}`} className={cx('see-more-btn')}>Đọc thêm <span><RiArrowRightUpLine /></span></Link>
            </div>
        </div>
    )
}

PostItem.propTypes = {
    data: PropTypes.object.isRequired,
    divide: PropTypes.bool
}

export default PostItem