import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './LayoutCard.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)


function LayoutCard({ children, to, href, primary = false, secondary = false, className }) {
    let Comp = 'div'
    const props = {}

    if (to) {
        Comp = Link
        props.to = to
    }

    if (href) {
        Comp = 'a'
        props.href = href
    }

    return (
        <Comp {...props} className={cx('wrapper', { [className]: className, primary, secondary })}>
            {children}
        </Comp>
    )
}

LayoutCard.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    href: PropTypes.string,
    to: PropTypes.string
}

export default LayoutCard