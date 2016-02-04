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

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowResize);
    },

    componentWillUnmount() {
        window.removeListeners('resize', this.handleWindowResize);
    },

    handleScroll(event, values) {
        const { scrollTop, scrollHeight, clientHeight } = values;
        this.setState({ scrollTop, scrollHeight, clientHeight });
    },

    handleWindowResize() {
        const { scrollbars } = this.refs;
        const { scrollTop, scrollHeight, clientHeight } = scrollbars.getValues();
        this.setState({ scrollTop, scrollHeight, clientHeight });
    },

    render() {
        const { style } = this.props;
        const { scrollTop, scrollHeight, clientHeight } = this.state;
        const containerStyle = {
            ...style,
            position: 'relative'
        };
        const shadowTopStyle = {
            opacity: (scrollTop - 20) / 20,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0) 100%)'
        };
        const shadowBottomStyle = {
            opacity: !clientHeight ? 1 : (scrollHeight - clientHeight - scrollTop - 20) / 20,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0) 100%)'
        };

        return (
            <div style={containerStyle}>
                <Scrollbars
                    ref="scrollbars"
                    onScroll={this.handleScroll}
                    {...this.props}/>
                <div style={shadowTopStyle}/>
                <div style={shadowBottomStyle}/>
            </div>
        );
    }
});
