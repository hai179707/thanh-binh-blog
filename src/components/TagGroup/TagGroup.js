import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import styles from './TagGroup.module.scss'
import { RiCloseLine } from 'react-icons/ri'

const cx = classNames.bind(styles)

function TagGroup({ data, className, close = false, onClick }) {
    return (
        <div className={cx('wrapper', { [className]: className })}>
            {data.map((tag, index) => (
                <div key={index}><span className={cx('name')}>{tag.name}</span>{close && <span onClick={onClick} className={cx('close')}><RiCloseLine /></span>}</div>
            ))}
        </div>
    )
}

TagGroup.propTypes = {
    data: PropTypes.array.isRequired,
    className: PropTypes.string,
    close: PropTypes.bool,
    onClick: PropTypes.func
}

export default TagGroup