import classNames from "classnames/bind"
import { useEffect, useRef, useState } from "react"
import { RiAddCircleLine, RiCloseCircleFill, RiMoreLine, RiSearch2Line } from "react-icons/ri"
import { Link } from "react-router-dom"
import AdminPageAndLimitControl from "~/components/AdminPageAndLimitControl"

import AdminPostListItem from "~/components/AdminPostListItem"
import LayoutCard from "~/components/LayoutCard"
import config from "~/config"
import styles from './AdminPost.module.scss'
import * as postServices from '~/services/postServices.js'
import { useDebounce } from "~/hooks"

const cx = classNames.bind(styles)

function AdminPost() {
    const [filterValue, setFilterValue] = useState('')
    const [posts, setPosts] = useState([])
    const [limit, setLimit] = useState(20)
    const [page, setPage] = useState(1)

    const filterInp = useRef()

    const debouncedValue = useDebounce(filterValue, 500)

    const fetchApi = async () => {
        const result = await postServices.getAllPost(page, limit)
        setPosts(result)
    }

    useEffect(() => {
        fetchApi()
        // eslint-disable-next-line
    }, [page, limit])

    useEffect(() => {
        const fetchApi = async () => {
            const result = await postServices.getAllPost(page, limit, debouncedValue)
            setPosts(result)
        }
        fetchApi()
    }, [debouncedValue, limit, page])

    const handleFilterInpChange = e => {
        setFilterValue(e.target.value)

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
                        {posts.map(post => (
                            <AdminPostListItem data={post} key={post._id} action={fetchApi} />
                        ))}
                    </div>
                </LayoutCard>
                <AdminPageAndLimitControl
                    nextPage={() => setPage(page + 1)}
                    prevPage={() => setPage(page - 1)}
                    setLimit={l => setLimit(l)}
                />
            </div>
        </div>
    )
}

export default AdminPost