import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './PostGroupWrapper.module.scss'

const cx = classNames.bind(styles)

function PostGroupWrapper({ children, className }) {
    return (
        <div className={cx('wrapper', { [className]: className })}>
            {children}
        </div>
    )
}

PostGroupWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

export default PostGroupWrapper;