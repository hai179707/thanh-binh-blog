import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"

import styles from './Logo.module.scss'
import Image from '../Image'
import images from '~/assets/images'
import config from '~/config'

const cx = classNames.bind(styles)

function Logo({ className }) {
    const [logoImage, setLogoImage] = useState(window.innerWidth <= 1135)

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth
            setLogoImage(windowWidth <= 1135)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Link to={config.routes.home} className={cx('wrapper', { [className]: className })}>
            <Image src={images.logoWhite} alt='logo' className={cx('logo-image')} />
            {logoImage || <div className={cx('logo-text')}>Bình <span>Bờm</span></div>}
        </Link>
    )
}

Logo.propTypes = {
    className: PropTypes.string
}

export default Logo