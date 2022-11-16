import classNames from "classnames/bind"
import { RiArrowRightLine } from "react-icons/ri"

import styles from './ContactInfo.module.scss'

const cx = classNames.bind(styles)

function ContactInfo() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('contact')}>
                <span className={cx('contact-title')}>Email</span>
                <span className={cx('contact-info')}>nguyenthanhhai.main@gmail.com</span>
            </div>
            <div className={cx('contact')}>
                <span className={cx('contact-title')}>Phone (Zalo, Skype)</span>
                <span className={cx('contact-info')}>0868.902.048</span>
                <a href="tel:0868902048" className={cx('contact-btn')}>
                    <span>Gọi</span><RiArrowRightLine className={cx('icon')} />
                </a>
            </div>
            <div className={cx('contact')}>
                <span className={cx('contact-title')}>Messenger</span>
                <span className={cx('contact-info')}>@hai.nga.18</span>
                <a href="https://m.me/hai.nga.18" className={cx('contact-btn')}>
                    <span>Nhắn tin</span><RiArrowRightLine className={cx('icon')} />
                </a>
            </div>
        </div>
    )
}

export default ContactInfo