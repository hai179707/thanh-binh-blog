import Tippy from "@tippyjs/react/headless"
import classNames from "classnames/bind"
import { useRef, useState } from "react"
import { RiSearch2Line, RiCloseLine, RiMessengerLine, RiPhoneLine, RiFilePaper2Line } from 'react-icons/ri'
import { IoMdPricetag } from 'react-icons/io'
import { Link } from "react-router-dom"

import styles from './Header.module.scss'
import { Popper as NavLinkPopper } from '../Popper'
import Divide from "../Divide"
import Image from "../Image"
import images from "~/assets/images"

const cx = classNames.bind(styles)

function Header() {
    const [searchValue, setSearchValue] = useState('')
    const [isFocus, setIsFocus] = useState(false)

    const inputRef = useRef()

    const handleChangeInp = e => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        }
    }

    const handleClear = () => {
        setSearchValue('')
        inputRef.current.focus()
    }

    const cancelShowOnMobile = () => {
        const windowWidth = window.innerWidth
        return windowWidth >= 762
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search', { inpFocus: isFocus })}>
                <button className={cx('searh-btn')}>
                    <RiSearch2Line />
                </button>
                {isFocus && <div className={cx('divide')}></div>}
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder='Tìm kiếm...'
                    onChange={handleChangeInp}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    className={cx('search-inp')}
                />
                {searchValue && (
                    <span
                        className={cx('clear-btn')}
                        onClick={handleClear}
                    >
                        <RiCloseLine />
                    </span>
                )}
                {isFocus &&
                    <ul className={cx('suggest')}>
                        <span className={cx('title')}>Đề xuất cho bạn</span>
                        <div className={cx('suggest-keyword-items')}>
                            <li className={cx('suggest-keyword-item')}>
                                <Link to={'/'} className={cx('suggest-keyword-link')}><RiFilePaper2Line /> abcabcasdsadas</Link>
                            </li>
                        </div>
                        <Divide opacity />
                        <span className={cx('title')}>Gợi ý kết quả</span>
                        <div className={cx('suggest-result-items')}>
                            <li className={cx('suggest-result-item')}>
                                <Link to={'/'} className={cx('suggest-result-link')}>
                                    <div className={cx('image')}>
                                        <Image src={images.sidebarBg} />
                                    </div>
                                    <div className={cx('text')}>
                                        <div className={cx('blog-title')}>Những cái “thú” khi về quê này bạn đã biết!</div>
                                        <div className={cx('blog-category')}><IoMdPricetag /> Chuyện làm</div>
                                    </div>
                                </Link>
                            </li>
                        </div>
                    </ul>
                }
            </div>
            <ul className={cx('contact')}>
                <Tippy
                    placement='bottom'
                    onShow={cancelShowOnMobile}
                    delay={400}
                    render={attrs => (
                        <div tabIndex="-1" {...attrs}>
                            <NavLinkPopper bottom>Messenger</NavLinkPopper>
                        </div>
                    )}
                >
                    <li className={cx('contact-item')}>
                        <a href='https://m.me/hai.nga.18'><RiMessengerLine /></a>
                    </li>
                </Tippy>
                <Tippy
                    placement='bottom'
                    onShow={cancelShowOnMobile}
                    delay={400}
                    render={attrs => (
                        <div tabIndex="-1" {...attrs}>
                            <NavLinkPopper bottom>Gọi</NavLinkPopper>
                        </div>
                    )}
                >
                    <li className={cx('contact-item')}>
                        <a href='tel:0868902048'><RiPhoneLine /></a>
                    </li>
                </Tippy>
            </ul>
        </div>
    )
}

export default Header