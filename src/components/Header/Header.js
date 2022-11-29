import PropTypes from 'prop-types'
import Tippy from "@tippyjs/react/headless"
import classNames from "classnames/bind"
import { useEffect, useRef, useState } from "react"
import { RiSearch2Line, RiCloseLine, RiMessengerLine, RiPhoneLine } from 'react-icons/ri'
import { IoMdPricetag } from 'react-icons/io'
import { Link } from "react-router-dom"

import styles from './Header.module.scss'
import { Popper as NavLinkPopper } from '../Popper'
import Divide from "../Divide"
import Image from "../Image"
import { useDebounce } from '~/hooks'
import * as searchService from '~/services/searchServices.js'

const cx = classNames.bind(styles)

function Header({ contact }) {
    const [searchValue, setSearchValue] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [searchResult, setSearchResult] = useState([])

    const inputRef = useRef()

    const { messenger, phone } = contact

    const debouncedValue = useDebounce(searchValue, 1000)

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([])
            return
        }

        const fetchApi = async () => {
            const result = await searchService.search(debouncedValue)
            setSearchResult(result)
        }
        fetchApi()
    }, [debouncedValue])


    const handleChangeInp = e => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        }
    }

    const handleHideResult = () => {
        setTimeout(() => {
            setShowResult(false)
        }, 200)
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
            <div className={cx('search', { inpFocus: showResult })}>
                <button className={cx('searh-btn')}>
                    <RiSearch2Line />
                </button>
                {showResult && <div className={cx('divide')}></div>}
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder='Tìm kiếm...'
                    onChange={handleChangeInp}
                    onFocus={() => setShowResult(true)}
                    onBlur={handleHideResult}
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
                {showResult &&
                    <ul className={cx('suggest')}>
                        <span className={cx('title')}>Kết quả tìm kiếm</span>
                        {/* <div className={cx('suggest-keyword-items')}>
                            <li className={cx('suggest-keyword-item')}>
                                <Link to={'/'} className={cx('suggest-keyword-link')}><RiFilePaper2Line /> abcabcasdsadas</Link>
                            </li>
                        </div> */}
                        {searchResult.length > 0 &&
                            <>
                                <Divide opacity />
                                <span className={cx('title')}>Gợi ý kết quả</span>
                                <div className={cx('suggest-result-items')}>
                                    {searchResult.map((post, index) => (
                                        <li key={index} className={cx('suggest-result-item')}>
                                            <Link to={`/posts/${post.path}`} className={cx('suggest-result-link')}>
                                                <div className={cx('image')}>
                                                    <Image src={post.imageUrl} />
                                                </div>
                                                <div className={cx('text')}>
                                                    <div className={cx('blog-title')}>{post.title}</div>
                                                    <div className={cx('blog-category')}><IoMdPricetag /> {post.category.name}</div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </div>
                            </>
                        }
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
                            <NavLinkPopper bottom primary>Messenger</NavLinkPopper>
                        </div>
                    )}
                >
                    <li className={cx('contact-item')}>
                        <a href={`https://m.me/${messenger}`}><RiMessengerLine /></a>
                    </li>
                </Tippy>
                <Tippy
                    placement='bottom'
                    onShow={cancelShowOnMobile}
                    delay={400}
                    render={attrs => (
                        <div tabIndex="-1" {...attrs}>
                            <NavLinkPopper bottom primary>Gọi</NavLinkPopper>
                        </div>
                    )}
                >
                    <li className={cx('contact-item')}>
                        <a href={`tel:${phone}`}><RiPhoneLine /></a>
                    </li>
                </Tippy>
            </ul>
        </div>
    )
}

Header.propTypes = {
    contact: PropTypes.object
}

export default Header