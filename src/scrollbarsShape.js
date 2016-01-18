import { PropTypes } from 'react';

export default PropTypes.shape({
    register: PropTypes.func.isRequired,
    unregister: PropTypes.func.isRequired
}).isRequired;
