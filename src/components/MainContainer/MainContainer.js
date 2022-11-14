import PropTypes from 'prop-types'
import classNames from "classnames/bind"

import styles from './MainContainer.module.scss'

const cx = classNames.bind(styles)

function MainContainer({ children }) {
    return (
        <div className={cx('wrapper')}>
            {children}
        </div>
    )
}

MainContainer.propTypes = {
    children: PropTypes.node
}

export default MainContainer