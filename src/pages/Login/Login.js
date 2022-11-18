import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import config from "~/config"
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

function Login() {
    const [emailValue, setEmailValue] = useState(localStorage.getItem('login-email') || '')
    const [passwordValue, setPasswordValue] = useState(localStorage.getItem('login-password') || '')
    const [rememberLoginData, setRememberLoginData] = useState(false)

    useEffect(() => {
        setRememberLoginData(!!localStorage.getItem('login-password'))
    }, [])

    const handleLoginSubmit = e => {
        e.preventDefault()
        if (rememberLoginData) {
            localStorage.setItem('login-email', emailValue)
            localStorage.setItem('login-password', passwordValue)
        }
        else {
            localStorage.removeItem('login-email')
            localStorage.removeItem('login-password')
        }
        window.location.href = config.routes.admin
    }

    const handleCheckRemember = e => {
        setRememberLoginData(e.target.checked)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form className={cx('login-form')} onSubmit={handleLoginSubmit}>
                    <h1 className={cx('title')}>Đăng nhập</h1>
                    <div className={cx('form-group')}>
                        <label>Email</label>
                        <input
                            type='email'
                            className={cx('form-inp')}
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                            placeholder='Nhập email'
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label>Mật khẩu</label>
                        <input
                            type='password'
                            className={cx('form-inp')}
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            placeholder='Nhập mật khẩu'
                        />
                    </div>
                    <div className={cx('form-group', 'remember')}>
                        <input
                            type='checkbox'
                            id='remember-login-data'
                            onChange={handleCheckRemember}
                            checked={rememberLoginData}
                        />
                        <label htmlFor="remember-login-data">Nhớ mật khẩu</label>
                    </div>
                    <button
                        type='submit'
                        className={cx('login-btn')}
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login