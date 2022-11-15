import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import { NavLink } from "react-router-dom"
import Tippy from '@tippyjs/react/headless'

import styles from './NavbarItem.module.scss'
import { Popper as NavLinkPopper } from '../Popper'

const cx = classNames.bind(styles)

function NavbarItem({ title, to, href, icon, onClick, className }) {
    let Comp = NavLink
    const props = {}

    if (to) {
        props.to = to
    }

    if (href) {
        Comp = 'a'
        props.href = href
    }

    const cancelShowOnDestop = () => {
        const windowWidth = window.innerWidth
        return windowWidth <= 1135 && windowWidth >= 762
    }

    return (
        <div>
            <Tippy
                placement='right'
                onShow={cancelShowOnDestop}
                delay={400}
                render={attrs => (
                    <div tabIndex="-1" {...attrs}>
                        <NavLinkPopper right>{title}</NavLinkPopper>
                    </div>
                )}
            >
                <Comp
                    {...props}
                    className={
                        href
                            ?
                            cx('navbar-item', { [className]: className })
                            :
                            nav => cx('navbar-item', { active: nav.isActive, [className]: className })
                    }
                    onClick={onClick}
                >
                    <span className={cx('icon')}>{icon}</span>
                    <span className={cx('title')}>{title}</span>
                </Comp>
            </Tippy>
        </div>
    )
}

NavbarItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.node,
    className: PropTypes.string
}

export default NavbarItem