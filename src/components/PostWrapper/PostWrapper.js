import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import styles from './PostWrapper.module.scss'

const cx = classNames.bind(styles)

function PostWrapper({ children }) {
    return (
        <div className={cx('wrapper')}>
            {children}
        </div>
    )
}

PostWrapper.propTypes = {
    children: PropTypes.node.isRequired
}

export default PostWrapper