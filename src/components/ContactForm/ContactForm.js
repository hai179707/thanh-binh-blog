import classNames from "classnames/bind"

import styles from './ContactForm.module.scss'
import { RiArrowRightUpLine, RiSendPlaneLine } from "react-icons/ri"

const cx = classNames.bind(styles)

function ContactForm() {
    return (
        <form className={cx('form')}>
            <h2 className={cx('title')}><RiSendPlaneLine /><span>Để lại lời nhắn</span></h2>
            <div className={cx('form-group')}>
                <label className={cx('tag')}>Tên</label>
                <input type="text" name="name" placeholder="Tên của bạn" className={cx('form-control')} required />
            </div>
            <div className={cx('form-group')}>
                <label className={cx('tag')}>Mail</label>
                <input type="email" name="email" placeholder="Email" className={cx('form-control')} required />
            </div>
            <div className={cx('form-group', 'form-area')}>
                <label className={cx('tag')}>Lời nhắn</label>
                <textarea name="message" placeholder="Lời nhắn" className={cx('form-control')}></textarea>
            </div>
            <button type="submit" className={cx('btn')}><span>GỬi</span><RiArrowRightUpLine className={cx('send-icon')} /></button>
        </form>
    )
}

export default ContactForm