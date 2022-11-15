import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import { Link } from "react-router-dom"

import styles from '../Slider.module.scss'
import Image from "~/components/Image"

const cx = classNames.bind(styles)

function SlideItem({ data, index }) {
    return (
        <Link to={data.blogUrl} className={cx('item', `item-${index + 1}`)}>
            <div className={cx('image')}>
                <div className={cx('overlay')}></div>
                <Image src={data.imageUrl} alt='slide bg' />
            </div>
            <div className={cx('text')}>
                <h1 className={cx('title')}>{data.title}</h1>
                <p className={cx('description')}>{data.description}</p>
                <button className={cx('btn')}>Đọc thêm</button>
            </div>
        </Link>
    )
}

SlideItem.propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}

export default SlideItem