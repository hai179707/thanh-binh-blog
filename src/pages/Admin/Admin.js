import classNames from "classnames/bind"
import LayoutCard from "~/components/LayoutCard"
import MessageItem from "~/components/MessageItem"
import SeeAllBtn from "~/components/SeeAllBtn"
import config from "~/config"
import styles from './Admin.module.scss'
import { messages } from "./messageData"

const cx = classNames.bind(styles)

function Admin() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('header')}>Thống kê nhanh</h1>
            <div className={cx('statistical')}>
                <LayoutCard to={config.routes.adminPost} primary>
                    <span className={cx('title')}>
                        Bài viết
                    </span>
                    <span className={cx('count')}>20<span>bài</span></span>
                </LayoutCard>
                <LayoutCard to={config.routes.adminCategory} secondary>
                    <span className={cx('title')}>
                        Danh mục
                    </span>
                    <span className={cx('count')}>20<span>danh mục</span></span>
                </LayoutCard>
                <LayoutCard to={config.routes.adminTag} >
                    <span className={cx('title')}>
                        Tags
                    </span>
                    <span className={cx('count')}>20<span>tag</span></span>
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