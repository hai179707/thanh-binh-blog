import PropTypes from 'prop-types'
import classNames from "classnames/bind"

import styles from './Dashboard.module.scss'
import Logo from '~/components/Logo'
import Divide from '~/components/Divide'
import { NavLink } from 'react-router-dom'
import config from '~/config'
import { RiFileCloudLine, RiInformationLine, RiPagesLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import * as totalService from '~/services/totalServices.js'

const cx = classNames.bind(styles)

function Dashboard({ children }) {
    const [smallDevice, setSmallDevice] = useState(window.innerWidth <= 768)
    const [total, setTotal] = useState({})

    useEffect(() => {
        const fetchApi = async () => {
            const totalRes = await totalService.getTotal()
            setTotal(totalRes)
        }
        fetchApi()

        const handleResize = () => {
            const windowWidth = window.innerWidth
            setSmallDevice(windowWidth <= 768)
        }

        window.addEventListener('resize', handleResize)

        return () => (
            window.removeEventListener('resize', handleResize)
        )
    }, [])

    return (
        <div className={cx('wrapper')}>
            {smallDevice
                ?
                <div className={cx('small-device-message')}>
                    <span>Trang web này không hoạt động trên thiết bị nhỏ <br />Hãy truy cập trên lớn hơn để tiếp tục</span>
                    <a href='/' className={cx('small-device-btn')}>Về trang chủ</a>
                </div>
                :
                <>
                    <div className={cx('sidebar')}>
                        <Logo to={config.routes.admin} />
                        <Divide />
                        <NavLink to={config.routes.admin} className={cx('sidebar-title')}>Tổng quan</NavLink>
                        <div className={cx('menu')}>
                            <div className={cx('header')}>
                                <RiPagesLine className={cx('icon')} />
                                <span>Website</span>
                            </div>
                            <ul className={cx('nav-items')}>
                                <li className={cx('nav-item')}>
                                    <NavLink to={config.routes.adminPost} className={nav => cx('nav-link', { active: nav.isActive })}>{`Bài viết (${total.post})`}</NavLink>
                                </li>
                                <li className={cx('nav-item')}>
                                    <NavLink to={config.routes.adminCategory} className={nav => cx('nav-link', { active: nav.isActive })}>{`Categories (${total.category})`}</NavLink>
                                </li>
                                <li className={cx('nav-item')}>
                                    <NavLink to={config.routes.adminTag} className={nav => cx('nav-link', { active: nav.isActive })}>{`Tags (${total.tag})`}</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('menu')}>
                            <div className={cx('header')}>
                                <RiInformationLine className={cx('icon')} />
                                <span>Thông tin</span>
                            </div>
                            <ul className={cx('nav-items')}>
                                <li className={cx('nav-item')}>
                                    <NavLink to={config.routes.adminAbout} className={nav => cx('nav-link', { active: nav.isActive })}>Về bản thân</NavLink>
                                </li>
                                <li className={cx('nav-item')}>
                                    <NavLink to={config.routes.adminContact} className={nav => cx('nav-link', { active: nav.isActive })}>Liên hệ của tôi</NavLink>
                                </li>
                                <li className={cx('nav-item')}>
                                    <NavLink to={config.routes.adminMessage} className={nav => cx('nav-link', { active: nav.isActive })}>{`Lời nhắn (${total.message})`}</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('menu')}>
                            <div className={cx('header')}>
                                <RiFileCloudLine className={cx('icon')} />
                                <span>Tải lên</span>
                            </div>
                            <ul className={cx('nav-items')}>
                                <li className={cx('nav-item')}>
                                    <NavLink to={config.routes.adminUploadImage} className={nav => cx('nav-link', { active: nav.isActive })}>Hình ảnh</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('container')}>
                        {children}
                    </div>
                </>
            }
        </div>
    )
}

Dashboard.propTypes = {
    children: PropTypes.node.isRequired
}

export default Dashboard