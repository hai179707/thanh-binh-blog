import classNames from "classnames/bind"
import { Link } from "react-router-dom"
import { RiFacebookBoxLine, RiInstagramLine, RiMessengerLine, RiPhoneLine } from "react-icons/ri"
import { TbBrandTiktok } from "react-icons/tb"

import Logo from "~/components/Logo"
import styles from './Footer.module.scss'
import config from "~/config"
import GoToTop from "../GoToTop"

const cx = classNames.bind(styles)

function Footer() {
    const categoryList = [
        {
            path: config.routes.chuyenChoi,
            title: 'Chuyện Chơi'
        },
        {
            path: config.routes.chuyenHoc,
            title: 'Chuyện Học'
        },
        {
            path: config.routes.chuyenLam,
            title: 'Chuyện Làm'
        },
        {
            path: config.routes.chuyenSong,
            title: 'Chuyện Sống'
        }
    ]

    return (
        <div className={cx('wrapper')}>
            <div className={cx('brand')}>
                <Logo />
                <p className={cx('description')}>Blog của Đinh Thanh Bình</p>
            </div>
            <div className={cx('menu')}>
                <h1 className={cx('title')}>
                    Chuyên mục
                </h1>
                <ul className={cx('category-menu')}>
                    {categoryList.map((category, index) => (
                        <li key={index}><Link to={category.path} className={cx('category')} >{category.title}</Link></li>
                    ))}
                </ul>
            </div>
            <div className={cx('menu')}>
                <h1 className={cx('title')}>
                    Liên hệ
                </h1>
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
                    <li className={cx('social-item')}>
                        <a className={cx('social-link')} href='https://m.me/hai.nga.18'><RiMessengerLine /></a>
                    </li>
                    <li className={cx('social-item')}>
                        <a className={cx('social-link')} href='tel:0868902048'><RiPhoneLine /></a>
                    </li>
                </ul>
            </div>
            <GoToTop />
            <p className={cx('copyright')}><a href="https://www.facebook.com/ngthanhhai.1707">Copyright © 2022. Design by Thanh Hai</a></p>
        </div>
    )
}

export default Footer