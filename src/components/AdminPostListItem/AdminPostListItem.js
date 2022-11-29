import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './AdminPostListItem.module.scss'
import { Link } from 'react-router-dom'
import { RiMoreLine } from 'react-icons/ri'
import Tippy from '@tippyjs/react/headless'
import { useDateFormat } from '~/hooks'
import TagGroup from '../TagGroup'
import * as postServices from '~/services/postServices.js'
import AdminNotification from '../AdminNotification'

const cx = classNames.bind(styles)

function AdminPostListItem({ data }) {
    const [message, setMessage] = useState('')
    const [notificationType, setNotificationType] = useState('')
    const [isPublic, setPublic] = useState(data.public)

    const date = useDateFormat(data.createdAt)

    useEffect(() => {
        const removeNotification = setTimeout(() => {
            setMessage('')
            setNotificationType('')
        }, 5000)

        return () => clearTimeout(removeNotification)
    }, [message])

    const handleExportPost = () => {
        const fetchApi = async () => {
            const result = await postServices.updatePost(data._id, {
                public: true
            })
            if (result) {
                setMessage('Xuất bản bài viết thành công')
                setNotificationType('success')
            } else {
                setMessage('Xuất bản bài viết thất bại. Vui lòng thử lại')
                setNotificationType('error')
            }
            setPublic(true)
        }
        fetchApi()
    }

    const handlePauseExportPost = () => {
        const fetchApi = async () => {
            const result = await postServices.updatePost(data._id, {
                public: false
            })
            if (result) {
                setMessage('Tạm dừng bài viết thành công')
                setNotificationType('success')
            } else {
                setMessage('Tạm dừng bài viết thất bại. Vui lòng thử lại')
                setNotificationType('error')
            }
            setPublic(false)
        }
        fetchApi()
    }

    const handleDeletePost = () => {
        const confirm = window.confirm(`Bạn có chắc chắn muốn xóa bài viết này không?`)
        if (confirm) {
            const fetchApi = async () => {
                const result = await postServices.deletePost(data._id)
                if (result) {
                    setMessage('Xóa bài viết thành công')
                    setNotificationType('success')
                } else {
                    setMessage('Xóa bài viết thất bại. Vui lòng thử lại')
                    setNotificationType('error')
                }
                window.location.reload()
            }
            fetchApi()
        }
    }

    return (
        <div className={cx('wrapper')}>
            <Link to={'/admin/web/posts/' + data._id} className={cx('post-title', { priv: !isPublic })}>
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
                            {isPublic || <li className={cx('action')} onClick={handleExportPost}>Công khai</li>}
                            {isPublic && <li className={cx('action')} onClick={handlePauseExportPost}>Ẩn bài viết</li>}
                            <li className={cx('action')} onClick={handleDeletePost}>Xóa bài viết</li>
                        </ul>
                    </div>
                )}
            >
                <div className={cx('post-actions')}><RiMoreLine /></div>
            </Tippy>
            {message && <AdminNotification type={notificationType} title={message} />}
        </div>
    )
}

AdminPostListItem.propTypes = {
    data: PropTypes.object
}

export default AdminPostListItem