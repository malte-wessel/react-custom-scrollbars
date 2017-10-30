import React from 'react';
/* eslint-disable react/prop-types */

export function renderViewDefault(props) {
    return <div {...props}/>;
}

export function renderTrackHorizontalDefault({ style, ...props }) {
    const finalStyle = {
        ...style,
        right: 2,
        bottom: 2,
        left: 2,
        borderRadius: 3
    };
    return <div style={finalStyle} {...props} />;
}

export function renderTrackVerticalDefault({ style, ...props }) {
    const finalStyle = {
        ...style,
        right: 2,
        bottom: 2,
        top: 2,
        borderRadius: 3
    };
    return <div style={finalStyle} {...props} />;
}

export function renderThumbHorizontalDefault({ style, ...props }) {
    const finalStyle = {
        ...style,
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)'
    };
    return <div style={finalStyle} {...props} />;
}

export function renderThumbVerticalDefault({ style, ...props }) {
    const finalStyle = {
        ...style,
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)'
    };
    return <div style={finalStyle} {...props} />;
}


export function renderArrowLeftHorizontalDefault({ style, ...props }) {
    const finalStyle = {
        ...style,
        backgroundColor: 'rgba(0,0,0,.2)',
        cursor: 'pointer',
        left: 0
    };
    return <div style={finalStyle} {...props} />;
}

export function renderArrowRightHorizontalDefault({ style, ...props }) {
    const finalStyle = {
        ...style,
        backgroundColor: 'rgba(0,0,0,.2)',
        cursor: 'pointer',
        right: 0
    };
    return <div style={finalStyle} {...props} />;
}


export function renderArrowTopVerticalDefault({ style, ...props }) {
    const finalStyle = {
        ...style,
        backgroundColor: 'rgba(0,0,0,.2)',
        cursor: 'pointer',
        top: 0
    };
    return <div style={finalStyle} {...props} />;
}

export function renderArrowBottomVerticalDefault({ style, ...props }) {
    const finalStyle = {
        ...style,
        backgroundColor: 'rgba(0,0,0,.2)',
        cursor: 'pointer',
        bottom: 0
    };
    return <div style={finalStyle} {...props} />;
}
