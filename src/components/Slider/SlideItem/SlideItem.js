import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import { Link } from "react-router-dom"

import styles from '../Slider.module.scss'

const cx = classNames.bind(styles)

function SlideItem({ data }) {
    return (
        <Link to={data.blogUrl} className={cx('item')}>
            <div className={cx('image')} style={{ backgroundImage: `url(${data.imageUrl})` }}>
                <div className={cx('overlay')}></div>
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
    data: PropTypes.object.isRequired
}

export default SlideItem