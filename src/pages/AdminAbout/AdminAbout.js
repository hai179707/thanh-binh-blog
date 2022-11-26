import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import Button from "~/components/Button"
import LayoutCard from "~/components/LayoutCard"
import styles from './AdminAbout.module.scss'
import * as aboutServices from '~/services/aboutServices.js'
import AdminNotification from "~/components/AdminNotification"

const cx = classNames.bind(styles)

function AdminAbout() {
    const [somethingChange, setSomethingChange] = useState(false)
    const [imageUrlInpValue, setImageUrlInpValue] = useState('')
    const [nameInpValue, setNameInpValue] = useState('')
    const [selfIntroduceValue, setSelfIntroduceValue] = useState('')
    const [maximValue, setMaximValue] = useState('')
    const [message, setMessage] = useState('')
    const [notificationType, setNotificationType] = useState('')

    useEffect(() => {
        const fetchApi = async () => {
            const result = await aboutServices.getAbout()
            setImageUrlInpValue(result.imageUrl)
            setNameInpValue(result.name)
            setSelfIntroduceValue(result.selfIntroduce)
            setMaximValue(result.maxim)
        }
        fetchApi()
    }, [])

    useEffect(() => {
        const removeNotification = setTimeout(() => {
            setMessage('')
            setNotificationType('')
        }, 5000)

        return () => clearTimeout(removeNotification)
    }, [message])

    const handleChangeImageUrlInpValue = e => {
        setImageUrlInpValue(e.target.value)
        setSomethingChange(true)
    }

    const handleChangeNameValue = e => {
        setNameInpValue(e.target.value)
        setSomethingChange(true)
    }

    const handleChangeSelfIntroduceValue = e => {
        setSelfIntroduceValue(e.target.value)
        setSomethingChange(true)
    }

    const handleChangeMaximValue = e => {
        setMaximValue(e.target.value)
        setSomethingChange(true)
    }


    const handleSaveData = () => {
        const fetchApi = async () => {
            const result = await aboutServices.putAbout({
                imageUrlInp: imageUrlInpValue,
                name: nameInpValue,
                selfIntroduce: selfIntroduceValue,
                maxim: maximValue
            })
            if (result) {
                setMessage('Cập nhật thành công')
                setNotificationType('success')
            } else {
                setMessage('Cập nhật thất bại. Vui lòng thử lại')
                setNotificationType('error')
            }
            setSomethingChange(false)
        }
        fetchApi()
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Thông tin </h1>
            </div>
            <LayoutCard>
                <div className={cx('content')}>
                    <form onSubmit={e => e.preventDefault()}>
                        <div className={cx('form-group')}>
                            <label>Ảnh hiển thị: </label>
                            <input
                                type='text'
                                value={imageUrlInpValue}
                                onChange={handleChangeImageUrlInpValue}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Tên hiển thị: </label>
                            <input
                                type='text'
                                value={nameInpValue}
                                onChange={handleChangeNameValue}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Giới thiệu bản thân: </label>
                            <textarea
                                type='text'
                                value={selfIntroduceValue}
                                onChange={handleChangeSelfIntroduceValue}
                            ></textarea>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Câu nói yêu thích: </label>
                            <textarea
                                type='text'
                                value={maximValue}
                                onChange={handleChangeMaximValue}
                            ></textarea>
                        </div>
                    </form>
                </div>
            </LayoutCard>
            <div className={cx('save-btn')}>
                {somethingChange
                    ?
                    <Button primary onClick={handleSaveData}>Lưu tất cả</Button>
                    :
                    <Button disable>Lưu tất cả</Button>
                }
            </div>
            {message && <AdminNotification type={notificationType} title={message} />}
        </div>
    )
}

export default AdminAbout