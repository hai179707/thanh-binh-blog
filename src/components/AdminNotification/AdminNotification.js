import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './AdminNotification.module.scss'

const cx = classNames.bind(styles)

function AdminNotification({ type, title }) {
    return (
        <div className={cx('wrapper', { [type]: type })}>{title}</div>
    )
}

AdminNotification.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default AdminNotification