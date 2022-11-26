import classNames from "classnames/bind"
import { useEffect, useState } from "react"

import styles from './Introduce.module.scss'
import SectionWrapper from "~/components/SectionWrapper"
import Image from "~/components/Image"
import Divide from "~/components/Divide"
import * as aboutServices from '~/services/aboutServices.js'

const cx = classNames.bind(styles)

function Introduce() {
    const [aboutData, setAboutData] = useState({})
    const [selfIntroduce, setSelfIntroduce] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const result = await aboutServices.getAbout()
            setAboutData(result)
            setSelfIntroduce(result.selfIntroduce.split('\n'))
        }
        fetchApi()
    }, [])

    return (
        <SectionWrapper>
            <div className={cx('content')}>
                <div className={cx('image')}>
                    <Image src={aboutData.imageUrl} alt='introduce image' />
                </div>
                <div className={cx('text')}>
                    <h1 className={cx('title')}>
                        Đôi nét về mình <br />
                        <span>{aboutData.name}</span>
                    </h1>
                    <Divide primary width="100px" />
                    <div className={cx('introduce-text')}>
                        <div className={cx('introduce')}>
                            {selfIntroduce.map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                        <div className={cx('maxim')}>
                            <i>{aboutData.maxim}</i>
                            <span>Thanh Bình</span>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default Introduce