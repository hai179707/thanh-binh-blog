import classNames from "classnames/bind"
import { useEffect, useRef, useState } from "react"
import { RiCloseCircleFill, RiSearch2Line } from "react-icons/ri"

import MessageItem from "~/components/MessageItem"
import LayoutCard from "~/components/LayoutCard"
import styles from './AdminMessage.module.scss'
import AdminPageAndLimitControl from "~/components/AdminPageAndLimitControl"
import * as messageService from '~/services/messageServices.js'
import { useDebounce } from "~/hooks"

const cx = classNames.bind(styles)

function AdminMessage() {
    const [filterValue, setFilterValue] = useState('')
    const [messages, setMessages] = useState([])
    const [limit, setLimit] = useState(20)
    const [page, setPage] = useState(1)

    const filterInp = useRef()

    const debouncedValue = useDebounce(filterValue, 600)

    useEffect(() => {
        const fetchApi = async () => {
            const result = await messageService.getMessage(page, limit)
            setMessages(result)
        }
        fetchApi()
    }, [page, limit])

    useEffect(() => {
        const fetchApi = async () => {
            const result = await messageService.getMessage(page, limit, debouncedValue)
            setMessages(result)
        }
        fetchApi()
    }, [page, limit, debouncedValue])

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
                <AdminPageAndLimitControl
                    nextPage={() => setPage(page + 1)}
                    prevPage={() => setPage(page - 1)}
                    setLimit={l => setLimit(l)}
                />
            </div>
        </div>
    )
}

export default AdminMessage