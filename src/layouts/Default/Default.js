import PropTypes from 'prop-types' 
import classNames from 'classnames/bind'
import style from './Default.module.scss'

const cx = classNames.bind(style)

function Default({ children }) {
    return (
        <div className={cx('wrapper')}>
            {children}
        </div>
    )
}

Default.propTypes = {
    children: PropTypes.node.isRequired
}

export default Default