import classNames from "classnames/bind"
import LayoutCard from "~/components/LayoutCard"
import MessageItem from "~/components/MessageItem"
import SeeAllBtn from "~/components/SeeAllBtn"
import config from "~/config"
import styles from './Admin.module.scss'
import * as messageService from '~/services/messageServices.js'
import * as totalService from '~/services/totalServices.js'
import { useEffect, useState } from "react"

const cx = classNames.bind(styles)

function Admin() {
    const [messages, setMessages] = useState([])
    const [total, setTotal] = useState({})

    useEffect(() => {
        const fetchApi = async () => {
            const messageRes = await messageService.getMessage()
            const totalRes = await totalService.getTotal()
            setMessages(messageRes)
            setTotal(totalRes)
        }
        fetchApi()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('header')}>Thống kê nhanh</h1>
            <div className={cx('statistical')}>
                <LayoutCard to={config.routes.adminPost} primary>
                    <span className={cx('title')}>
                        Bài viết
                    </span>
                    <span className={cx('count')}>{total.post}<span>bài</span></span>
                </LayoutCard>
                <LayoutCard to={config.routes.adminCategory} secondary>
                    <span className={cx('title')}>
                        Danh mục
                    </span>
                    <span className={cx('count')}>{total.category}<span>danh mục</span></span>
                </LayoutCard>
                <LayoutCard to={config.routes.adminTag} >
                    <span className={cx('title')}>
                        Tags
                    </span>
                    <span className={cx('count')}>{total.tag}<span>tag</span></span>
                </LayoutCard>
            </div>
            <h1 className={cx('header')}>Lời nhắn gần đây</h1>
            <div className={cx('newest-message')}>
                <LayoutCard>
                    <div className={cx('message-header')}>
                        <div className={cx('message-title')}>Lời nhắn</div>
                        <SeeAllBtn path={config.routes.adminMessage} />
                    </div>
                    <div className={cx('content')}>
                        {messages.map((message, index) => (
                            <MessageItem data={message} key={index} />
                        ))}
                    </div>
                </LayoutCard>
            </div>
        </div >
    )
}

export default Admin