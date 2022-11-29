import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import { RiUser3Line, RiUserHeartLine, RiBook2Line, RiFacebookBoxLine, RiInstagramLine, RiMenu4Line, RiCloseLine } from 'react-icons/ri'
import { TbWritingSign, TbBeach, TbBrandTiktok } from 'react-icons/tb'
import { useEffect, useState } from "react"

import styles from './SideBar.module.scss'
import Logo from "../Logo"
import NavbarItem from "../NavbarItem"
import config from "~/config"
import Divide from "../Divide"
import images from "~/assets/images"
import Image from "../Image"
import * as categoryService from '~/services/categoryServices.js'

const cx = classNames.bind(styles)

function SideBar({ contact }) {
    const [mobile, setMobile] = useState(window.innerWidth <= 762)
    const [toggleMenu, setToggleMenu] = useState(false)
    const [categories, setCategories] = useState([])

    const { facebook, instagram, tiktok } = contact

    useEffect(() => {
        const fetchApi = async () => {
            const categoryRes = await categoryService.getCategory()
            setCategories(categoryRes)
        }
        fetchApi()

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
                    {categories.length > 0 &&
                        <>
                            <NavbarItem title={categories[0].name} to={`/category/${categories[0].path}`} icon={<RiUserHeartLine />} onClick={() => setToggleMenu(false)} />
                            <NavbarItem title={categories[1].name} to={`/category/${categories[1].path}`} icon={<RiBook2Line />} onClick={() => setToggleMenu(false)} />
                            <NavbarItem title={categories[2].name} to={`/category/${categories[2].path}`} icon={<TbWritingSign />} onClick={() => setToggleMenu(false)} />
                            <NavbarItem title={categories[3].name} to={`/category/${categories[3].path}`} icon={<TbBeach />} onClick={() => setToggleMenu(false)} />
                        </>
                    }
                    {mobile && <div className={cx('close')} onClick={() => setToggleMenu(!toggleMenu)}><RiCloseLine /></div>}
                </div>
                {mobile || <Divide />}
                <ul className={cx('social')}>
                    <li className={cx('social-item')}>
                        <a className={cx('social-link')} href={`https://www.facebook.com/${facebook}`}><RiFacebookBoxLine /></a>
                    </li>
                    <li className={cx('social-item')}>
                        <a className={cx('social-link')} href={`https://www.instagram.com/${instagram}`}><RiInstagramLine /></a>
                    </li>
                    <li className={cx('social-item')}>
                        <a className={cx('social-link')} href={`https://www.tiktok.com/@${tiktok}`}><TbBrandTiktok /></a>
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


SideBar.propTypes = {
    contact: PropTypes.object
}

export default SideBar