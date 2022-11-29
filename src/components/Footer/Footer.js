import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import classNames from "classnames/bind"
import { Link } from "react-router-dom"
import { RiFacebookBoxLine, RiInstagramLine, RiMessengerLine, RiPhoneLine } from "react-icons/ri"
import { TbBrandTiktok } from "react-icons/tb"

import Logo from "~/components/Logo"
import styles from './Footer.module.scss'
import GoToTop from "../GoToTop"
import { getCategory } from '~/services/categoryServices.js'

const cx = classNames.bind(styles)

function Footer({ contact }) {
    const [categories, setCategories] = useState([])
    const { facebook, instagram, tiktok, messenger, phone } = contact

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCategory()
            setCategories(result)
        }
        fetchApi()
    }, [])

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
                    {categories.map((category, index) => (
                        <li key={index}><Link to={`/category/${category.path}`} className={cx('category')} >{category.name}</Link></li>
                    ))}
                </ul>
            </div>
            <div className={cx('menu')}>
                <h1 className={cx('title')}>
                    Liên hệ
                </h1>
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
                    <li className={cx('social-item')}>
                        <a className={cx('social-link')} href={`https://m.me/${messenger}`}><RiMessengerLine /></a>
                    </li>
                    <li className={cx('social-item')}>
                        <a className={cx('social-link')} href={`tel:${phone}`}><RiPhoneLine /></a>
                    </li>
                </ul>
            </div>
            <GoToTop />
            <p className={cx('copyright')}><a href="https://www.facebook.com/ngthanhhai.1707">Copyright © 2022. Design by Thanh Hai</a></p>
        </div>
    )
}

Footer.propTypes = {
    contact: PropTypes.object
}

export default Footer