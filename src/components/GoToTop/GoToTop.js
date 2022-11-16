import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import { RiArrowDropUpLine } from "react-icons/ri"
import styles from './GoToTop.module.scss'

const cx = classNames.bind(styles)

function GoToTop() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const showGoToTopBtn = () => {
            const scrollY = window.scrollY
            scrollY > 200 ? setShow(true) : setShow(false)
        }

        window.addEventListener('scroll', showGoToTopBtn)

        return () => {
            window.removeEventListener('scroll', showGoToTopBtn)
        }
    })

    const goToTop = () => {
        document.documentElement.scrollTop = 0
    }

    return (
        <div className={cx('wrapper', { show })} onClick={goToTop}>
            <RiArrowDropUpLine />
        </div>
    )
}

export default GoToTop