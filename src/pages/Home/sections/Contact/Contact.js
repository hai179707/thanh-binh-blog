import classNames from "classnames/bind"

import styles from './Contact.module.scss'
import SectionWrapper from "~/components/SectionWrapper"
import { TbMessageCircle2 } from "react-icons/tb"
import ContactInfo from "~/components/ContactInfo"
import ContactForm from "~/components/ContactForm"

const cx = classNames.bind(styles)

function Contact() {
    return (
        <SectionWrapper>
            <div className={cx('content')}>
                <div className={cx('text')}>
                    <h2 className={cx('title')}><TbMessageCircle2 /><span>Liên hệ với tôi</span></h2>
                    <ContactInfo />
                </div>
                <ContactForm />
            </div>
        </SectionWrapper>
    )
}

export default Contact