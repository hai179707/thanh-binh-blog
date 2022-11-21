import classNames from "classnames/bind"
import { useRef, useState } from "react"
import { RiAddCircleLine, RiCloseCircleFill, RiMoreLine, RiSearch2Line } from "react-icons/ri"
import { Link } from "react-router-dom"
import AdminPageAndLimitControl from "~/components/AdminPageAndLimitControl"

import AdminPostListItem from "~/components/AdminPostListItem"
import LayoutCard from "~/components/LayoutCard"
import config from "~/config"
import styles from './AdminPost.module.scss'
import { posts } from "./postList"

const cx = classNames.bind(styles)

function AdminPost() {
    const [filterValue, setFilterValue] = useState('')

    const filterInp = useRef()

    const handleFilterInpChange = e => {
        setFilterValue(e.target.value)
        // Logic filter sử dung hook debounce
    }

    const handleClearFilterInp = () => {
        setFilterValue('')
        filterInp.current.focus()
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Danh sách bài viết</h1>
                <div className={cx('filter')}>
                    <button className={cx('filter-btn')}><RiSearch2Line /></button>
                    <input
                        ref={filterInp}
                        type='text'
                        placeholder="Tìm kiếm"
                        className={cx('filter-inp')}
                        value={filterValue}
                        onChange={handleFilterInpChange}
                    />
                    {filterValue && <RiCloseCircleFill className={cx('clear-btn')} onClick={handleClearFilterInp} />}
                </div>
                <Link to={config.routes.adminCreatePost} className={cx('create-btn')}>
                    <RiAddCircleLine />
                    <span>Tạo bài viết</span>
                </Link>
            </div>
            <div className={cx('posts')}>
                <LayoutCard>
                    <div className={cx('post-list-header')}>
                        <div className={cx('header-title')}>
                            <span>Tiêu đề</span>
                            <span className={cx('status')}>
                                <span className={cx('publ')}>Công khai</span>
                                <span className={cx('priv')}>Ẩn</span>
                            </span>
                        </div>
                        <div className={cx('header-category')}>Danh mục</div>
                        <div className={cx('header-tags')}>Tags</div>
                        <div className={cx('header-last-update-time')}>Ngày đăng</div>
                        <div className={cx('header-actions')}><RiMoreLine /></div>
                    </div>
                    <div className={cx('content')}>
                        {posts.data.map((post, index) => (
                            <AdminPostListItem data={post.post} key={index} />
                        ))}
                    </div>
                </LayoutCard>
                <AdminPageAndLimitControl />
            </div>
        </div>
    )
}

export default AdminPost