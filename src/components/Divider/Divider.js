import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import styles from './Divider.module.scss'

const cx = classNames.bind(styles)

function Divider({ width = '100%', height = "1px", primary = false, secondary = false, opacity = false, className }) {
    return (
        <div
            className={cx('divider', {
                [className]: className,
                primary,
                secondary,
                opacity
            })}
            style={{ width, height }}
        >
        </div>
    )
}

Divider.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    opacity: PropTypes.bool,
    className: PropTypes.string
}

export default Divider