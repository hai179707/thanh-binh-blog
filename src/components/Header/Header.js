import classNames from "classnames/bind"
import { useRef, useState } from "react"
import { RiSearch2Line, RiCloseLine, RiMessengerLine, RiPhoneLine, RiFilePaper2Line } from 'react-icons/ri'
import { Link } from "react-router-dom"

import styles from './Header.module.scss'

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

    const handleFocusInp = () => {
        setIsFocus(true)
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
                    onFocus={handleFocusInp}
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
                        <div className={cx('suggest-items')}>
                            <li className={cx('suggest-item')}>
                                <Link to={'/'} className={cx('suggest-link')}><RiFilePaper2Line /> abcabcasdsadas</Link>
                            </li>
                            <li className={cx('suggest-item')}>
                                <Link to={'/'} className={cx('suggest-link')}><RiFilePaper2Line /> abcabcasdsadas</Link>
                            </li>
                            <li className={cx('suggest-item')}>
                                <Link to={'/'} className={cx('suggest-link')}><RiFilePaper2Line /> abcabcasdsadas</Link>
                            </li>
                            <li className={cx('suggest-item')}>
                                <Link to={'/'} className={cx('suggest-link')}><RiFilePaper2Line /> abcabcasdsadas</Link>
                            </li>
                            <li className={cx('suggest-item')}>
                                <Link to={'/'} className={cx('suggest-link')}><RiFilePaper2Line /> abcabcasdsadas</Link>
                            </li>
                            <li className={cx('suggest-item')}>
                                <Link to={'/'} className={cx('suggest-link')}><RiFilePaper2Line /> abcabcasdsadas</Link>
                            </li>
                        </div>
                    </ul>
                }
            </div>
            <ul className={cx('contact')}>
                <li className={cx('contact-item')}>
                    <a href='https://m.me/hai.nga.18'><RiMessengerLine /></a>
                </li>
                <li className={cx('contact-item')}>
                    <a href='tel:0868902048'><RiPhoneLine /></a>
                </li>
            </ul>
        </div>
    )
}

export default Header