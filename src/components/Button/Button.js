import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import styles from './Button.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function Button({ to, href, title, children, primary = false, disable = false, secondary = false, rounded = false, outline = false, className, onClick }) {
    let Comp = 'button'
    const props = {
        onClick
    }

    if (to) {
        Comp = Link
        props.to = to
    }

    if (href) {
        Comp = 'a'
        props.href = href
    }

    const classNames = {
        [className]: className,
        primary,
        secondary,
        rounded,
        outline,
        disable
    }

    return (
        <Comp {...props} className={cx('wrapper', { ...classNames })}>{title || children}</Comp>
    )
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node,
    primary: PropTypes.bool,
    disable: PropTypes.bool,
    secondary: PropTypes.bool,
    rounded: PropTypes.bool,
    outline: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func
}

export default Button