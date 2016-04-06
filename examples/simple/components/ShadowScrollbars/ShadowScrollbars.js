import css from 'dom-css';
import React, { createClass, PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default createClass({

    displayName: 'ShadowScrollbars',

    propTypes: {
        style: PropTypes.object
    },

    getInitialState() {
        return {
            scrollTop: 0,
            scrollHeight: 0,
            clientHeight: 0
        };
    },

    handleUpdate(values) {
        const { shadowTop, shadowBottom } = this.refs;
        const { scrollTop, scrollHeight, clientHeight } = values;
        const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20);
        const bottomScrollTop = scrollHeight - clientHeight;
        const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
        css(shadowTop, { opacity: shadowTopOpacity });
        css(shadowBottom, { opacity: shadowBottomOpacity });
    },

    render() {
        const { style, ...props } = this.props;
        const containerStyle = {
            ...style,
            position: 'relative'
        };
        const shadowTopStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)'
        };
        const shadowBottomStyle = {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)'
        };
        return (
            <div style={containerStyle}>
                <Scrollbars
					ref="scrollbars"
                    onUpdate={this.handleUpdate}
                    {...props}/>
                <div
                    ref="shadowTop"
                    style={shadowTopStyle}/>
                <div
                    ref="shadowBottom"
                    style={shadowBottomStyle}/>
            </div>
        );
    }
});
