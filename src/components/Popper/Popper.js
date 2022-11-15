import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import styles from './Popper.module.scss'

const cx = classNames.bind(styles)

function Popper({ children, right = false, bottom = false }) {
    return (
        <div className={cx('wrapper', { right, bottom })}>
            {children}
        </div>
    )
}

Popper.propTypes = {
    children: PropTypes.node.isRequired,
    right: PropTypes.bool,
    bottom: PropTypes.bool
}

export default Popper