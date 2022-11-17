import classNames from "classnames/bind"
import emailjs from 'emailjs-com'
import { RiArrowRightUpLine, RiSendPlaneLine } from "react-icons/ri"

import styles from './ContactForm.module.scss'
import { useRef, useState } from "react"

const cx = classNames.bind(styles)

function ContactForm() {
    const [result, setResult] = useState('')
    const formRef = useRef()
    const messageRef = useRef()

    const sendMail = e => {
        e.preventDefault()

        emailjs.sendForm('service_sutofqv', 'template_vfoollb', formRef.current, 'UF-rlX3WcYZuvDcSo')
            .then(result => {
                setResult('success')
                messageRef.current.innerHTML = 'Gửi email thành công!'
            }, (error) => {
                setResult('error')
                messageRef.current.innerHTML = 'Đã có lỗi xảy ra!'
            })
    }

    return (
        <>
            <form ref={formRef} className={cx('form')} onSubmit={sendMail}>
                <h2 className={cx('title')}><RiSendPlaneLine /><span>Để lại lời nhắn</span></h2>
                <div className={cx('form-group')}>
                    <label className={cx('tag')}>Tên</label>
                    <input type="text" name="name" placeholder="Tên của bạn" className={cx('form-control')} required />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('tag')}>Số điện thoại</label>
                    <input type="text" name="phone" placeholder="Số điện thoại" className={cx('form-control')} required />
                </div>
                <div className={cx('form-group', 'form-area')}>
                    <label className={cx('tag')}>Lời nhắn</label>
                    <textarea name="message" placeholder="Lời nhắn" className={cx('form-control')}></textarea>
                </div>
                <p className={cx('message', { [result]: result })} ref={messageRef}></p>
                <button type="submit" className={cx('btn')}><span>GỬi</span><RiArrowRightUpLine className={cx('send-icon')} /></button>
            </form>
        </>
    )
}

export default ContactForm