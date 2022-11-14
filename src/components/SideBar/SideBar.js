import classNames from "classnames/bind"

import styles from './SideBar.module.scss'

const cx = classNames.bind(styles)

function SideBar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    Bình <span>Blog</span>
                </div>
            </div>
        </div>
    )
}

export default SideBar