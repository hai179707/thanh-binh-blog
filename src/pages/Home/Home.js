import classNames from "classnames/bind"
// import Section from "~/components/Section/Section"

import { Slider as HomeSlider } from "~/components/Slider"
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    return (
        <div className={cx('wrapper')}>
            <HomeSlider />
            {/* <Section title="Chuyện Chơi" subtitle="Đi đâu cũng được, “chính mình” là được">
                <HomeSlider />
            </Section> */}
        </div>
    )
}

export default Home