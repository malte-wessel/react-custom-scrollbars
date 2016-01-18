import React, { createClass, PropTypes } from 'react';
import scrollbarsShape from './scrollbarsShape';

let uid = 0;

export default createClass({

    displayName: 'StickyTitle',

    propTypes: {
        children: PropTypes.node.isRequired,
        style: PropTypes.object
    },

    contextTypes: {
        scrollbars: scrollbarsShape
    },

    componentWillMount() {
        this.uid = uid++;
    },

    componentDidMount() {
        const { scrollbars } = this.context;
        const { register } = scrollbars;
        const { container, title } = this.refs;
        register(this.uid, { container, title });
    },

    componentWillUnmount() {
        const { scrollbars } = this.context;
        const { unregister } = scrollbars;
        unregister(this.uid);
    },

    render() {
        const { children, style, ...props } = this.props;
        const finalStyle = {
            ...style,
            // Overflow hidden is needed in order to
            // get the correct height, when child has a margin
            overflow: 'hidden'
        };
        return (
            <div ref="container">
                <div {...props} ref="title" style={finalStyle}>
                    {children}
                </div>
            </div>
        );
    }

});
