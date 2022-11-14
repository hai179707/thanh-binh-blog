import PropTypes from 'prop-types'
import { forwardRef, useState } from 'react'
import classNames from 'classnames/bind'

import styles from './Image.module.scss'
import images from '~/assets/images'

const cx = classNames.bind(styles)

function Image({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) {
    const [fallback, setFallback] = useState('')
    const handleError = () => {
        setFallback(customFallback)
    }
    return (
        <img className={cx('wrapper', { [className]: className })} ref={ref} src={fallback || src} {...props} alt={alt} onError={handleError} />
    )
}

forwardRef(Image).propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
}

export default forwardRef(Image)