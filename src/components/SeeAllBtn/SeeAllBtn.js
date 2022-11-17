import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import styles from './SeeAllBtn.module.scss'
import { RiArrowRightSLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function SeeAllBtn({ path, className }) {
    return (
        <Link to={path} className={cx('wrapper', { [className]: className })}>
            Xem tất cả
            <span><RiArrowRightSLine /></span>
        </Link>
    )
}

SeeAllBtn.propTypes = {
    path: PropTypes.string,
    className: PropTypes.string
}

export default SeeAllBtn