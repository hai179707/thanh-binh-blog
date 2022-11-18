import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './AdminPostListItem.module.scss'
import { Link } from 'react-router-dom'
import { RiMoreLine } from 'react-icons/ri'
import Tippy from '@tippyjs/react/headless'
import useDateFormat from '~/hooks/useDateFormat'

const cx = classNames.bind(styles)

function AdminPostListItem({ data }) {

    const date = useDateFormat(data.createAt)

    const handleExportPost = () => {
        console.log('Export')
    }

    const handlePauseExportPost = () => {
        console.log('Pause')
    }

    const handleDeletePost = () => {
        console.log('Delete')
    }

    return (
        <div className={cx('wrapper')}>
            <Link to={'/admin/web/posts/' + data._id} className={cx('post-title')}>
                <div className={cx('post-img')} style={{ backgroundImage: `url(${data.imageUrl})` }}></div>
                <span>{data.title}</span>
            </Link>
            <Link to={'/admin/web/categories' + data.category.path} className={cx('post-category')}>{data.category.name}</Link>
            <div className={cx('post-tags')}>
                {data.tags.map((tag, index) => (
                    <span key={index}>{tag.name}</span>
                ))}
            </div>
            <div className={cx('post-last-update-time')}>{date}</div>
            <Tippy
                interactive
                trigger='click'
                placement='bottom'
                render={attrs => (
                    <div className={cx('post-action-popper')} tabIndex="-1" {...attrs}>
                        <ul className={cx('actions')}>
                            <li className={cx('action')}><Link to={'/admin/web/posts/' + data._id} >Chỉnh sửa</Link></li>
                            <li className={cx('action')} onClick={handleExportPost}>Xuất bản</li>
                            <li className={cx('action')} onClick={handlePauseExportPost}>Hủy xuất bản</li>
                            <li className={cx('action')} onClick={handleDeletePost}>Xóa bài viết</li>
                        </ul>
                    </div>
                )}
            >
                <div className={cx('post-actions')}><RiMoreLine /></div>
            </Tippy>
        </div>
    )
}

AdminPostListItem.propTypes = {
    data: PropTypes.object
}

export default AdminPostListItem