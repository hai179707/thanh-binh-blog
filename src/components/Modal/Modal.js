import PropTypes from 'prop-types'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'
import styles from './Modal.module.scss'
import { RiCloseLine } from 'react-icons/ri'

const cx = classNames.bind(styles)

function Modal({ isShowing, hide, children }) {
    const [_hide, setHide] = useState(false)

    const handleHide = () => {
        setHide(true)
        setTimeout(() => {
            hide()
            setHide(false)
        }, 300)
    }

    return isShowing ? ReactDOM.createPortal(
        <div className={cx('wrapper', { hide: _hide })}>
            <div className={cx('modal-overlay')} onClick={handleHide}></div>
            <div className={cx('modal-wrapper')} aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className={cx('modal-container')}>
                    {children}
                </div>
                <div className={cx('modal-close-button')} data-dismiss="modal" aria-label="Close" onClick={handleHide}>
                    <RiCloseLine width='1.6rem' />
                </div>
            </div>
        </div>, document.body
    ) : null
}

Modal.propTypes = {
    isShowing: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default Modal