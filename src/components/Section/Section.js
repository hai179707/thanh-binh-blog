import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import styles from './Section.module.scss';
import Divide from '~/components/Divide';

const cx = classNames.bind(styles);

function Section({ children, title, subtitle }) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
            <Divide primary rounded width='96px' height='2px' />
            <div className={cx('subtitle')}>{subtitle}</div>
            <div className={cx('container')}>{children}</div>
        </div>
    )
}

Section.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string
}

export default Section