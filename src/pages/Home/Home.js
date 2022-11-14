import classNames from "classnames/bind"

import Header from "~/components/Header"
import MainContainer from "~/components/MainContainer/MainContainer"
import SideBar from "~/components/SideBar"
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    return (
        <div className={cx('wrapper')}>
            <SideBar />
            <Header />
            <MainContainer>
                <h1>Main content</h1>
            </MainContainer>
        </div>
    )
}

export default Home