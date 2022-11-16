import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import style from './Default.module.scss'
import SideBar from '~/components/SideBar'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

const cx = classNames.bind(style)

function Default({ children }) {
    return (
        <div className={cx('wrapper')}>
            <SideBar />
            <Header />
            <div className={cx('main-container')}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

Default.propTypes = {
    children: PropTypes.node.isRequired
}

export default Default