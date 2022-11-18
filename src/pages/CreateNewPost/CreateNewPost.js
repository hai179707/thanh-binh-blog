import classNames from "classnames/bind"
import styles from './CreateNewPost.module.scss'

const cx = classNames.bind(styles)

function CreateNewPost() {
    return (
        <div className={cx('wrapper')}>
            Create post
        </div>
    )
}

export default CreateNewPost