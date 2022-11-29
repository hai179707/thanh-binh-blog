import classNames from "classnames/bind"
import emailjs from 'emailjs-com'
import { RiArrowRightUpLine, RiSendPlaneLine } from "react-icons/ri"
import { useRef, useState } from "react"

import styles from './ContactForm.module.scss'
import * as messageService from '~/services/messageServices.js'

const cx = classNames.bind(styles)

function ContactForm() {
    const [result, setResult] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [phoneValue, setPhoneValue] = useState('')
    const [messageValue, setMessageValue] = useState('')

    const formRef = useRef()
    const messageRef = useRef()

    const handleSubmit = e => {
        e.preventDefault()

        const fetchApi = async () => {
            await messageService.postMessage({
                name: nameValue,
                phone: phoneValue,
                message: messageValue
            })
        }
        fetchApi()

        emailjs.sendForm('service_sutofqv', 'template_vfoollb', formRef.current, 'UF-rlX3WcYZuvDcSo')
            .then(result => {
                setResult('success')
                messageRef.current.innerHTML = 'Gửi message thành công!'
            }, (error) => {
                setResult('error')
                messageRef.current.innerHTML = 'Đã có lỗi xảy ra!'
            })
    }

    return (
        <>
            <form ref={formRef} className={cx('form')} onSubmit={handleSubmit}>
                <h2 className={cx('title')}><RiSendPlaneLine /><span>Để lại lời nhắn</span></h2>
                <div className={cx('form-group')}>
                    <label className={cx('tag')}>Tên</label>
                    <input
                        type="text"
                        value={nameValue}
                        onChange={e => setNameValue(e.target.value)}
                        name="name"
                        placeholder="Tên của bạn"
                        className={cx('form-control')}
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('tag')}>Số điện thoại</label>
                    <input
                        type="text"
                        value={phoneValue}
                        onChange={e => setPhoneValue(e.target.value)}
                        name="phone"
                        placeholder="Số điện thoại"
                        className={cx('form-control')}
                        required
                    />
                </div>
                <div className={cx('form-group', 'form-area')}>
                    <label className={cx('tag')}>Lời nhắn</label>
                    <textarea
                        value={messageValue}
                        onChange={e => setMessageValue(e.target.value)}
                        name="message"
                        placeholder="Lời nhắn"
                        className={cx('form-control')}
                        required
                    ></textarea>
                </div>
                <p className={cx('message', { [result]: result })} ref={messageRef}></p>
                <button type="submit" className={cx('btn')}><span>GỬi</span><RiArrowRightUpLine className={cx('send-icon')} /></button>
            </form>
        </>
    )
}

export default ContactForm