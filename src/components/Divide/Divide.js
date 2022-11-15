import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import styles from './Divide.module.scss'

const cx = classNames.bind(styles)

function Divide({ width = '100%', height = "1px", primary = false, secondary = false, opacity = false, className }) {
    return (
        <div
            className={cx('divide', {
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

Divide.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    opacity: PropTypes.bool,
    className: PropTypes.string
}

export default Divide