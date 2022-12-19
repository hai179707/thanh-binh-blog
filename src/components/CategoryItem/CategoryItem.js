import PropTypes from 'prop-types'
import classNames from "classnames/bind"

import styles from './CategoryItem.module.scss'
import SeeAllBtn from '~/components/SeeAllBtn'

const cx = classNames.bind(styles)

function CategoryItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{data.name}</h2>
            {/* <p className={cx('subtitle')}>{subtitle}</p> */}
            <SeeAllBtn path={data.path} className={cx('see-all')} />
        </div>
    )
}

CategoryItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default CategoryItem