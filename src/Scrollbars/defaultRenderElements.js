import React from 'react';

export function defaultRenderScrollbarHorizontal({ style, ...props }) {
    const finalStyle = {
        ...style,
        height: 6,
        right: 2,
        bottom: 2,
        left: 2,
        borderRadius: 3
    };
    return <div style={finalStyle} {...props} />;
}

export function defaultRenderScrollbarVertical({ style, ...props }) {
    const finalStyle = {
        ...style,
        width: 6,
        right: 2,
        bottom: 2,
        top: 2,
        borderRadius: 3
    };
    return <div style={finalStyle} {...props} />;
}

export function defaultRenderThumbHorizontal({ style, ...props }) {
    const finalStyle = {
        ...style,
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)'
    };
    return <div style={finalStyle} {...props} />;
}

export function defaultRenderThumbVertical({ style, ...props }) {
    const finalStyle = {
        ...style,
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)'
    };
    return <div style={finalStyle} {...props} />;
}

export function defaultRenderView({ style, ...props }) {
    const finalStyle = {...style};
    return <div style={finalStyle} {...props} />;
}
