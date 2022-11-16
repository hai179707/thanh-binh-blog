import classNames from "classnames/bind"

import styles from './Introduce.module.scss'
import SectionWrapper from "~/components/SectionWrapper"
import Image from "~/components/Image"
import images from "~/assets/images"
import Divide from "~/components/Divide"

const cx = classNames.bind(styles)

function Introduce() {
    return (
        <SectionWrapper>
            <div className={cx('content')}>
                <div className={cx('image')}>
                    <Image src={images.sidebarBg} alt='introduce image' />
                </div>
                <div className={cx('text')}>
                    <h1 className={cx('title')}>
                        Đôi nét về mình <br />
                        <span>Thanh Bình</span>
                    </h1>
                    <Divide primary width="100px" />
                    <div className={cx('introduce-text')}>
                        <div className={cx('introduce')}>
                            <p>Mình là Bình, một con người bé nhỏ trong hàng tỷ con người trên thế giới.</p>
                            <p>Mình tin rằng mỗi con người là một thế giới khác biệt với những niềm tin, mong ước, quan điểm sống đa dạng tạo nên vô vàn những góc nhìn hoàn toàn mới lạ về cuộc sống này.</p>
                            <p>Vậy nên, mình thích được đi đây đó, nói chuyện, làm việc với người này, người nọ. Lao vào những trải nghiệm mới mẻ, chờ đón những cơn gập ghềnh của của cuộc sống. Sau đó, trở nên hạnh phúc và đón nhận những điều thú vị!</p>
                            <p>Gần đây mình đang trải nghiệm thêm về trekking, hiking và camping. Mình cũng rất mong muốn được tìm các đối tác có liên quan đến lĩnh vực này. Nếu bạn có kế hoạch tương tự thì không quên ới mình nhé!</p>
                        </div>
                        <div className={cx('maxim')}>
                            <i>Hãy trở thành phiên bản tốt nhất của chính mình!</i>
                            <span>Thanh Bình</span>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default Introduce