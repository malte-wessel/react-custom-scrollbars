import React, { createClass } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default createClass({

    displayName: 'ColoredScrollbars',

    getInitialState() {
        return {
            top: 0
        };
    },

    handleScroll(event, values) {
        const { top } = values;
        this.setState({ top });
    },

    renderView({ style, ...props}) {
        const { top } = this.state;
        const viewStyle = {
            backgroundColor: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(top * 255)}, ${Math.round(255)})`,
            color: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))})`
        };
        return (
            <div
                className="box"
                style={{...style, ...viewStyle}}
                {...props}/>
        )
    },

    renderThumb({ style, ...props}) {
        const { top } = this.state;
        const thumbStyle = {
            backgroundColor: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))})`
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    },

    render() {
        return (
            <Scrollbars
                renderView={this.renderView}
                renderThumbHorizontal={this.renderThumb}
                renderThumbVertical={this.renderThumb}
                onScroll={this.handleScroll}
                {...this.props}/>
        );
    }
});
