import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import styles from './PostItem.module.scss'
import { RiArrowRightUpLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import useDateFormat from '~/hooks/useDateFormat'

const cx = classNames.bind(styles)

function PostItem({ data, divide = false, onClick }) {
    const date = useDateFormat(data.date)

    return (
        <div className={cx('post', { divide })}>
            <div className={cx('image')} style={{ backgroundImage: `url(${data.imageUrl})` }} >
                <Link to={`/post/${data.path}`} onClick={onClick}>
                    <div className={cx('overlay')} >
                        <button className={cx('overlay-btn')}>Xem bài viết</button>
                    </div>
                </Link>
            </div>
            <div className={cx('post-text')}>
                <Link to={`/post/${data.path}`} className={cx('post-title')} onClick={onClick}>{data.title}</Link>
                <div className={cx('post-detail')}>
                    <Link to={data.category.path} className={cx('post-category')}>{data.category.name}</Link>
                    <span>•</span>
                    <p className={cx('post-date')}>{date}</p>
                </div>
                <p className={cx('post-description')}>{data.description}</p>
                <Link to={`/post/${data.path}`} className={cx('see-more-btn')} onClick={onClick}>Đọc thêm <span><RiArrowRightUpLine /></span></Link>
            </div>
        </div>
    )
}

PostItem.propTypes = {
    data: PropTypes.object.isRequired,
    divide: PropTypes.bool,
    onClick: PropTypes.func
}

export default PostItem