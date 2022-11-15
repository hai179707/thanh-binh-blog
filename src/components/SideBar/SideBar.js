import classNames from "classnames/bind"
import { RiUser3Line, RiUserHeartLine, RiBook2Line, RiFacebookBoxLine, RiInstagramLine, RiMenu4Line, RiCloseLine } from 'react-icons/ri'
import { TbWritingSign, TbBeach, TbBrandTiktok } from 'react-icons/tb'

import styles from './SideBar.module.scss'
import Logo from "../Logo"
import NavbarItem from "../NavbarItem"
import config from "~/config"
import Divide from "../Divide"
import images from "~/assets/images"
import Image from "../Image"
import { useEffect, useState } from "react"

const cx = classNames.bind(styles)

function SideBar() {
    const [mobile, setMobile] = useState(window.innerWidth <= 762)
    const [toggleMenu, setToggleMenu] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth
            setMobile(windowWidth <= 762)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('brand')}>
                    <Logo />
                </div>
                <div className={cx('navbar', { open: toggleMenu })}>
                    <NavbarItem title="Giới thiệu" to={config.routes.home} icon={<RiUser3Line />} onClick={() => setToggleMenu(false)} />
                    <NavbarItem title="Chuyện sống" to={config.routes.chuyenSong} icon={<RiUserHeartLine />} onClick={() => setToggleMenu(false)} />
                    <NavbarItem title="Chuyện học" to={config.routes.chuyenHoc} icon={<RiBook2Line />} onClick={() => setToggleMenu(false)} />
                    <NavbarItem title="Chuyện làm" to={config.routes.chuyenLam} icon={<TbWritingSign />} onClick={() => setToggleMenu(false)} />
                    <NavbarItem title="Chuyện chơi" to={config.routes.chuyenChoi} icon={<TbBeach />} onClick={() => setToggleMenu(false)} />
                    {mobile && <div className={cx('close')} onClick={() => setToggleMenu(!toggleMenu)}><RiCloseLine /></div>}
                </div>
                {mobile || <Divide />}
                <ul className={cx('social')}>
                    <li className={cx('social-item')}>
                        <a className={cx('social-link')} href='https://www.facebook.com/hai.nga.18'><RiFacebookBoxLine /></a>
                    </li>
                    <li className={cx('social-item')}>
                        <a className={cx('social-link')} href='https://www.facebook.com/hai.nga.18'><RiInstagramLine /></a>
                    </li>
                    <li className={cx('social-item')}>
                        <a className={cx('social-link')} href='https://www.facebook.com/hai.nga.18'><TbBrandTiktok /></a>
                    </li>
                </ul>
                {mobile || <Divide />}
                {mobile
                    &&
                    <div className={cx('toggle-nav')} onClick={() => setToggleMenu(!toggleMenu)}>
                        <div className={cx('menu')}><RiMenu4Line /></div>
                    </div>
                }
                <div className={cx('sidebar-bg')}>
                    <Image src={images.sidebarBg} alt='sidebar bg' />
                </div>

            </div>
        </div>
    )
}

export default SideBar