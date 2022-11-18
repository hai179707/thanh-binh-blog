import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './MessageItem.module.scss'
import useDateFormat from '~/hooks/useDateFormat'

const cx = classNames.bind(styles)

function MessageItem({ data }) {
    const date = useDateFormat(data.createAt)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('name')}><span>{data.name}</span><span className={cx('email')}>{`(${data.email})`}</span></div>
            <div className={cx('message')}>{data.message}</div>
            <div className={cx('date')}>{date}</div>
        </div>
    )
}

MessageItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default MessageItem