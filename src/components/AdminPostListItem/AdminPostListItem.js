import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './AdminPostListItem.module.scss'
import { Link } from 'react-router-dom'
import { RiMoreLine } from 'react-icons/ri'
import Tippy from '@tippyjs/react/headless'
import { useDateFormat } from '~/hooks'
import TagGroup from '../TagGroup'

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
            <Link to={'/admin/web/posts/' + data._id} className={cx('post-title', { priv: !data.public })}>
                <div className={cx('post-img')} style={{ backgroundImage: `url(${data.imageUrl})` }}></div>
                <span>{data.title}</span>
            </Link>
            <Link to={'/admin/web/categories/' + data.category.path} className={cx('post-category')}>{data.category.name}</Link>
            <TagGroup className={cx('post-tags')} data={data.tags} />
            <div className={cx('post-last-update-time')}>{date}</div>
            <Tippy
                interactive
                trigger='click'
                placement='bottom'
                offset={[0, 0]}
                render={attrs => (
                    <div className={cx('post-action-popper')} tabIndex="-1" {...attrs}>
                        <ul className={cx('actions')}>
                            <li className={cx('action')}><Link to={'/admin/web/posts/' + data._id} >Chỉnh sửa</Link></li>
                            {data.public || <li className={cx('action')} onClick={handleExportPost}>Công khai</li>}
                            {data.public && <li className={cx('action')} onClick={handlePauseExportPost}>Ẩn bài viết</li>}
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