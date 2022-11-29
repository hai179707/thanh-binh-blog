import PropTypes from 'prop-types'
import Tippy from "@tippyjs/react/headless"
import classNames from "classnames/bind"
import { useState } from "react"
import { RiArrowDropDownLine, RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri"
import { createSearchParams, useLocation, useNavigate } from "react-router-dom"
import styles from './AdminPageAndLimitControl.module.scss'

const cx = classNames.bind(styles)

function AdminPageAndLimitControl({ nextPage, prevPage, setLimit }) {
    const location = useLocation()
    const navigate = useNavigate()
    const page = Number(new URLSearchParams(location.search).get('page'))
    const limit = Number(new URLSearchParams(location.search).get('limit'))

    const [currPage, setCurrPage] = useState(page || 1)
    const [limitPost, setLimitPost] = useState(limit || 20)


    const changeQueryUrl = (page, limit) => {
        const params = { page, limit }
        navigate({
            pathname: location.pathname,
            search: `?${createSearchParams(params)}`
        })
    }

    const handlePrevPage = () => {
        if (currPage > 1) {
            console.log('prev')
            setCurrPage(currPage - 1)
            changeQueryUrl(currPage - 1, limitPost)
            prevPage()
        }
    }

    const handleNextPage = () => {
        if (currPage < 9) {
            console.log('next')
            setCurrPage(currPage + 1)
            changeQueryUrl(currPage + 1, limitPost)
            nextPage()
        }
    }

    const handleChangeLimit = limit => {
        setLimitPost(limit)
        setLimit(limit)
        changeQueryUrl(currPage, limit)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('hrv')}>
                <Tippy
                    interactive
                    trigger='click'
                    placement='top'
                    render={attrs => (
                        <div className={cx('hrv-popper')} tabIndex="-1" {...attrs}>
                            <ul className={cx('actions')}>
                                <li className={cx('action')} onClick={() => handleChangeLimit(10)}>Hiển thị 10</li>
                                <li className={cx('action')} onClick={() => handleChangeLimit(20)}>Hiển thị 20</li>
                                <li className={cx('action')} onClick={() => handleChangeLimit(50)}>Hiển thị 50</li>
                            </ul>
                        </div>
                    )}
                >
                    <button className={cx('hrv-btn')}><span>{`Hiển thị ${limitPost}`}</span><RiArrowDropDownLine className={cx('icon')} /></button>
                </Tippy>
            </div>
            <div className={cx('navigation')}>
                <RiArrowLeftLine className={cx('prev')} title='Trang trước' onClick={handlePrevPage} />
                <div className={cx('current')}>{`${currPage}`}</div>
                <RiArrowRightLine className={cx('next')} title='Trang sau' onClick={handleNextPage} />
            </div>
        </div>
    )
}

AdminPageAndLimitControl.propTypes = {
    nextPage: PropTypes.func,
    prevPage: PropTypes.func,
    setLimit: PropTypes.func
}

export default AdminPageAndLimitControl