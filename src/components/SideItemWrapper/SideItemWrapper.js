import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import styles from './SideItemWrapper.module.scss'

const cx = classNames.bind(styles)

function SideItemWrapper({ children, title }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>{title}</div>
            {children}
        </div>
    )
}

SideItemWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
}

export default SideItemWrapper