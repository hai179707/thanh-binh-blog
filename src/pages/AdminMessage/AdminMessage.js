import classNames from "classnames/bind"
import { useRef, useState } from "react"
import { RiCloseCircleFill, RiSearch2Line } from "react-icons/ri"

import MessageItem from "~/components/MessageItem"
import LayoutCard from "~/components/LayoutCard"
import styles from './AdminMessage.module.scss'
import { messages } from "./messageData.js"
import AdminPageAndLimitControl from "~/components/AdminPageAndLimitControl"

const cx = classNames.bind(styles)

function AdminMessage() {
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
                <h1 className={cx('title')}>Danh sách lời nhắn</h1>
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
            </div>
            <div className={cx('messages')}>
                <LayoutCard>
                    <div className={cx('message-header')}>
                        <div className={cx('message-title')}>Lời nhắn</div>
                    </div>
                    <div className={cx('content')}>
                        {messages.map((message, index) => (
                            <MessageItem data={message} key={index} />
                        ))}
                    </div>
                </LayoutCard>
                <AdminPageAndLimitControl />
            </div>
        </div>
    )
}

export default AdminMessage