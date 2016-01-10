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

    render() {
        const { top } = this.state;

        const viewStyle = {
            backgroundColor: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(top * 255)}, ${Math.round(255)})`,
            color: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))})`
        };
        const thumbStyle = {
            backgroundColor: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))})`
        };

        return (
            <Scrollbars
                renderView={({style, ...props}) => <div className="box" style={{...style, ...viewStyle}} {...props}/>}
                renderThumbHorizontal={({style, ...props}) => <div style={{...style, ...thumbStyle}} {...props}/>}
                renderThumbVertical={({style, ...props}) => <div style={{...style, ...thumbStyle}} {...props}/>}
                onScroll={this.handleScroll}
                {...this.props}/>
        );
    }
});
