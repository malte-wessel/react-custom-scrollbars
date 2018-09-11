import React, { createElement } from 'react';
import { containerStyleAutoHeight, containerStyleDefault } from './styles';
import { omit } from '../utils/omit';
/* eslint-disable react/prop-types */

export function renderViewDefault(props) {
    return <div {...props}/>;
}


const omitContainerProps = [
    'onScroll',
    'onScrollFrame',
    'onScrollStart',
    'onScrollStop',
    'onUpdate',
    'renderView',
    'renderViewWrapper',
    'renderTrackHorizontal',
    'renderTrackVertical',
    'renderThumbHorizontal',
    'renderThumbVertical',
    'renderLayout',
    'tagName',
    'hideTracksWhenNotNeeded',
    'autoHide',
    'autoHideTimeout',
    'autoHideDuration',
    'thumbSize',
    'thumbMinSize',
    'universal',
    'autoHeight',
    'autoHeightMin',
    'autoHeightMax',
    'style',
    'children',
];
export function renderLayoutDefault(layout, props) {
    const { tagName, autoHeight, autoHeightMin, autoHeightMax, style } = props;

    const { view, trackHorizontal, trackVertical, thumbHorizontal, thumbVertical } = layout;

    const containerStyle = {
        ...containerStyleDefault,
        ...(autoHeight && {
            ...containerStyleAutoHeight,
            minHeight: autoHeightMin,
            maxHeight: autoHeightMax
        }),
        ...style
    };

    const containerProps = {
        ...omit(props, omitContainerProps),
        style: containerStyle,
    };

    const container = createElement(tagName, containerProps,
        view,
        trackVertical,
        thumbVertical,
        trackHorizontal,
        thumbHorizontal
    );

    return container;
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
