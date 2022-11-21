import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import { RiFacebookFill, RiInstagramLine, RiPhoneLine } from "react-icons/ri"
import { TbBrandTiktok } from "react-icons/tb"
import Button from "~/components/Button"
import LayoutCard from "~/components/LayoutCard"
import styles from './AdminContact.module.scss'

const cx = classNames.bind(styles)

const contact = {
    phone: '0868902048',
    facebook: 'hai.nga.18',
    instagram: 'hai.nga.18',
    tiktok: 'hai.nga.18',
}

function AdminContact() {
    const [phoneInpValue, setPhoneInpValue] = useState('')
    const [facebookInpValue, setFacebookInpValue] = useState('')
    const [instaInpValue, setInstaInpValue] = useState('')
    const [tiktokInpValue, setTiktokInpValue] = useState('')
    const [somethingChange, setSomethingChange] = useState(false)
    const [updateData] = useState({})

    useEffect(() => {
        const { phone, facebook, instagram, tiktok } = contact

        setPhoneInpValue(phone)
        setFacebookInpValue(facebook)
        setInstaInpValue(instagram)
        setTiktokInpValue(tiktok)
    }, [])

    const handleChangePhoneValue = e => {
        setPhoneInpValue(e.target.value)
        updateData.phone = e.target.value
        setSomethingChange(true)
    }

    const handleChangeFacebookValue = e => {
        setFacebookInpValue(e.target.value)
        updateData.facebook = e.target.value
        setSomethingChange(true)
    }

    const handleChangeInstaValue = e => {
        setInstaInpValue(e.target.value)
        updateData.instagram = e.target.value
        setSomethingChange(true)
    }

    const handleChangeTiktokValue = e => {
        setTiktokInpValue(e.target.value)
        updateData.tiktok = e.target.value
        setSomethingChange(true)
    }

    const handleSaveData = () => {
        console.log(updateData)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Thông tin liên hệ của tôi</h1>
            </div>
            <LayoutCard>
                <div className={cx('content')}>
                    <form onSubmit={e => e.preventDefault()} className={cx('form')}>
                        <div className={cx('form-group')}>
                            <label>Số điện thoại:</label>
                            <div className={cx('inp')}>
                                <RiPhoneLine className={cx('icon')} />
                                <input
                                    type='text'
                                    placeholder="Nhập số điện thoại"
                                    value={phoneInpValue}
                                    onChange={handleChangePhoneValue}
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Facebook:</label>
                            <div className={cx('inp')}>
                                <RiFacebookFill className={cx('icon')} />
                                <input
                                    type='text'
                                    placeholder="Nhập id Facebook"
                                    value={facebookInpValue}
                                    onChange={handleChangeFacebookValue}
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Instagram:</label>
                            <div className={cx('inp')}>
                                <RiInstagramLine className={cx('icon')} />
                                <input
                                    type='text'
                                    placeholder="Nhập id Instagram"
                                    value={instaInpValue}
                                    onChange={handleChangeInstaValue}
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Tiktok:</label>
                            <div className={cx('inp')}>
                                <TbBrandTiktok className={cx('icon')} />
                                <input
                                    type='text'
                                    placeholder="Nhập id Tiktok"
                                    value={tiktokInpValue}
                                    onChange={handleChangeTiktokValue}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </LayoutCard>
            <div className={cx('save-btn')} onClick={handleSaveData}>
                {somethingChange
                    ?
                    <Button primary>Lưu tất cả</Button>
                    :
                    <Button disable>Lưu tất cả</Button>
                }
            </div>
        </div>
    )
}

export default AdminContact