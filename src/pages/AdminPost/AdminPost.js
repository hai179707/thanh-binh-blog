import Tippy from "@tippyjs/react/headless"
import classNames from "classnames/bind"
import { useRef, useState } from "react"
import { RiAddCircleLine, RiArrowDropDownLine, RiArrowLeftLine, RiArrowRightLine, RiCloseCircleFill, RiMoreLine, RiSearch2Line } from "react-icons/ri"
import { Link } from "react-router-dom"

import AdminPostListItem from "~/components/AdminPostListItem"
import LayoutCard from "~/components/LayoutCard"
import config from "~/config"
import styles from './AdminPost.module.scss'
import { posts } from "./postList"

const cx = classNames.bind(styles)

function AdminPost() {
    const [currPage, setCurrPage] = useState(1)
    // eslint-disable-next-line
    const [totalPage, setTotalPage] = useState(9)
    const [hrv, setHrv] = useState(20)
    const [filterValue, setFilterValue] = useState('')

    const filterInp = useRef()

    const handlePrevPage = () => {
        console.log('prev')
        if (currPage > 1) {
            setCurrPage(currPage - 1)
        }
    }

    const handleNextPage = () => {
        console.log('next')
        if (currPage < totalPage) {
            setCurrPage(currPage + 1)
        }
    }

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
                        <div className={cx('header-title')}>Tiêu đề</div>
                        <div className={cx('header-category')}>Danh mục</div>
                        <div className={cx('header-tags')}>Tags</div>
                        <div className={cx('header-last-update-time')}>Ngày đăng</div>
                        <div className={cx('header-actions')}><RiMoreLine /></div>
                    </div>
                    <div className={cx('content')}>
                        {posts.map((post, index) => (
                            <AdminPostListItem data={post.post} key={index} />
                        ))}
                    </div>
                </LayoutCard>
                <div className={cx('footer')}>
                    <div className={cx('hrv')}>
                        <Tippy
                            interactive
                            trigger='click'
                            placement='top'
                            render={attrs => (
                                <div className={cx('hrv-popper')} tabIndex="-1" {...attrs}>
                                    <ul className={cx('actions')}>
                                        <li className={cx('action')} onClick={() => setHrv(10)}>Hiển thị 10</li>
                                        <li className={cx('action')} onClick={() => setHrv(20)}>Hiển thị 20</li>
                                        <li className={cx('action')} onClick={() => setHrv(50)}>Hiển thị 50</li>
                                    </ul>
                                </div>
                            )}
                        >
                            <button className={cx('hrv-btn')}><span>{`Hiển thị ${hrv}`}</span><RiArrowDropDownLine className={cx('icon')} /></button>
                        </Tippy>
                    </div>
                    <div className={cx('navigation')}>
                        <RiArrowLeftLine className={cx('prev')} title='Trang trước' onClick={handlePrevPage} />
                        <div className={cx('current')}>{`${currPage}/${totalPage}`}</div>
                        <RiArrowRightLine className={cx('next')} title='Trang sau' onClick={handleNextPage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPost