import PropTypes from 'prop-types'

function Empty({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}

Empty.propTypes = {
    children: PropTypes.node.isRequired
}

export default Empty