import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import style from './Default.module.scss'
import SideBar from '~/components/SideBar'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import * as contactServices from '~/services/contactServices.js'

const cx = classNames.bind(style)

function Default({ children }) {
    const [contact, setContact] = useState({})

    useEffect(() => {
        const fetchApi = async () => {
            const result = await contactServices.getContact()
            setContact(result)
        }
        fetchApi()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <SideBar contact={contact} />
            <Header contact={contact} />
            <div className={cx('main-container')}>
                {children}
            </div>
            <Footer contact={contact} />
        </div>
    )
}

Default.propTypes = {
    children: PropTypes.node.isRequired
}

export default Default