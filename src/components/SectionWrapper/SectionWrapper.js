import PropTypes from 'prop-types'
import classNames from "classnames/bind"

import styles from './SectionWrapper.module.scss'

const cx = classNames.bind(styles)

function SectionWrapper({ children }) {
    return (
        <div className={cx('wrapper')}>
            {children}
        </div>
    )
}

SectionWrapper.propTypes = {
    children: PropTypes.node.isRequired
}

export default SectionWrapper