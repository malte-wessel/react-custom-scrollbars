import raf, { cancel as caf } from 'raf';
import css from 'dom-css';
import React, { createClass, PropTypes, cloneElement } from 'react';
import getScrollbarWidth from '../utils/getScrollbarWidth';
import returnFalse from '../utils/returnFalse';
import getInnerWidth from '../utils/getInnerWidth';
import getInnerHeight from '../utils/getInnerHeight';

import {
    containerStyleDefault,
    viewStyleScrollbarsVisible,
    viewStyleScrollbarsInvisible,
    viewStyleUniversalInitial,
    trackHorizontalStyleDefault,
    trackVerticalStyleDefault,
    thumbHorizontalStyleDefault,
    thumbVerticalStyleDefault,
    disableSelectStyle,
    disableSelectStyleReset
} from './styles';

import {
    renderViewDefault,
    renderTrackHorizontalDefault,
    renderTrackVerticalDefault,
    renderThumbHorizontalDefault,
    renderThumbVerticalDefault
} from './defaultRenderElements';

export default createClass({

    displayName: 'Scrollbars',

    propTypes: {
        onScroll: PropTypes.func,
        onScrollFrame: PropTypes.func,
        onScrollStart: PropTypes.func,
        onScrollStop: PropTypes.func,
        renderView: PropTypes.func,
        renderTrackHorizontal: PropTypes.func,
        renderTrackVertical: PropTypes.func,
        renderThumbHorizontal: PropTypes.func,
        renderThumbVertical: PropTypes.func,
        autoHide: PropTypes.bool,
        autoHideTimeout: PropTypes.number,
        autoHideDuration: PropTypes.number,
        thumbSize: PropTypes.number,
        thumbMinSize: PropTypes.number,
        universal: PropTypes.bool,
        style: PropTypes.object,
        children: PropTypes.node,
    },

    getDefaultProps() {
        return {
            renderView: renderViewDefault,
            renderTrackHorizontal: renderTrackHorizontalDefault,
            renderTrackVertical: renderTrackVerticalDefault,
            renderThumbHorizontal: renderThumbHorizontalDefault,
            renderThumbVertical: renderThumbVerticalDefault,
            autoHide: false,
            autoHideTimeout: 1000,
            autoHideDuration: 200,
            thumbMinSize: 30,
            universal: false
        };
    },

    getInitialState() {
        return {
            didMountUniversal: false
        };
    },

    componentDidMount() {
        this.addListeners();
        this.update();
        this.componentDidMountUniversal();
    },

    componentDidMountUniversal() { // eslint-disable-line react/sort-comp
        const { universal } = this.props;
        if (!universal) return;
        this.setState({ didMountUniversal: true });
    },

    componentDidUpdate() {
        this.update();
    },

    componentWillUnmount() {
        this.removeListeners();
        if (this.requestFrame) caf(this.requestFrame);
        if (this.hideTrackTimeout) clearTimeout(this.hideTrackTimeout);
        if (this.detectScrollingInterval) clearInterval(this.detectScrollingInterval);
    },

    getScrollLeft() {
        const { view } = this.refs;
        return view.scrollLeft;
    },

    getScrollTop() {
        const { view } = this.refs;
        return view.scrollTop;
    },

    getScrollWidth() {
        const { view } = this.refs;
        return view.scrollWidth;
    },

    getScrollHeight() {
        const { view } = this.refs;
        return view.scrollHeight;
    },

    getClientWidth() {
        const { view } = this.refs;
        return view.clientWidth;
    },

    getClientHeight() {
        const { view } = this.refs;
        return view.clientHeight;
    },

    getValues() {
        const { view } = this.refs;
        const {
            scrollLeft,
            scrollTop,
            scrollWidth,
            scrollHeight,
            clientWidth,
            clientHeight
        } = view;

        return {
            left: (scrollLeft / (scrollWidth - clientWidth)) || 0,
            top: (scrollTop / (scrollHeight - clientHeight)) || 0,
            scrollLeft,
            scrollTop,
            scrollWidth,
            scrollHeight,
            clientWidth,
            clientHeight
        };
    },

    getThumbHorizontalWidth() {
        const { thumbSize, thumbMinSize } = this.props;
        const { view, trackHorizontal } = this.refs;
        const { scrollWidth, clientWidth } = view;
        const trackWidth = getInnerWidth(trackHorizontal);
        const width = clientWidth / scrollWidth * trackWidth;
        if (trackWidth === width) return 0;
        if (thumbSize) return thumbSize;
        return Math.max(width, thumbMinSize);
    },

    getThumbVerticalHeight() {
        const { thumbSize, thumbMinSize } = this.props;
        const { view, trackVertical } = this.refs;
        const { scrollHeight, clientHeight } = view;
        const trackHeight = getInnerHeight(trackVertical);
        const height = clientHeight / scrollHeight * trackHeight;
        if (trackHeight === height) return 0;
        if (thumbSize) return thumbSize;
        return Math.max(height, thumbMinSize);
    },

    scrollLeft(left = 0) {
        const { view } = this.refs;
        view.scrollLeft = left;
    },

    scrollTop(top = 0) {
        const { view } = this.refs;
        view.scrollTop = top;
    },

    scrollToLeft() {
        const { view } = this.refs;
        view.scrollLeft = 0;
    },

    scrollToTop() {
        const { view } = this.refs;
        view.scrollTop = 0;
    },

    scrollToRight() {
        const { view } = this.refs;
        view.scrollLeft = view.scrollWidth;
    },

    scrollToBottom() {
        const { view } = this.refs;
        view.scrollTop = view.scrollHeight;
    },

    addListeners() {
        if (typeof document === 'undefined') return;
        const { view, trackHorizontal, trackVertical, thumbHorizontal, thumbVertical } = this.refs;
        view.addEventListener('scroll', this.handleScroll);
        if (!getScrollbarWidth()) return;
        trackHorizontal.addEventListener('mouseenter', this.handleTrackMouseEnter);
        trackHorizontal.addEventListener('mouseleave', this.handleTrackMouseLeave);
        trackHorizontal.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
        trackVertical.addEventListener('mouseenter', this.handleTrackMouseEnter);
        trackVertical.addEventListener('mouseleave', this.handleTrackMouseLeave);
        trackVertical.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
        thumbHorizontal.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
        thumbVertical.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
        document.addEventListener('mouseup', this.handleDocumentMouseUp);
        window.addEventListener('resize', this.handleWindowResize);
    },

    removeListeners() {
        if (typeof document === 'undefined') return;
        const { view, trackHorizontal, trackVertical, thumbHorizontal, thumbVertical } = this.refs;
        view.removeEventListener('scroll', this.handleScroll);
        if (!getScrollbarWidth()) return;
        trackHorizontal.removeEventListener('mouseenter', this.handleTrackMouseEnter);
        trackHorizontal.removeEventListener('mouseleave', this.handleTrackMouseLeave);
        trackHorizontal.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
        trackVertical.removeEventListener('mouseenter', this.handleTrackMouseEnter);
        trackVertical.removeEventListener('mouseleave', this.handleTrackMouseLeave);
        trackVertical.removeEventListener('mousedown', this.handleVerticalTrackMouseDown);
        thumbHorizontal.removeEventListener('mousedown', this.handleHorizontalThumbMouseDown);
        thumbVertical.removeEventListener('mousedown', this.handleVerticalThumbMouseDown);
        document.removeEventListener('mouseup', this.handleDocumentMouseUp);
        window.removeEventListener('resize', this.handleWindowResize);
    },

    handleScroll(event) {
        const { onScroll, onScrollFrame } = this.props;
        if (onScroll) onScroll(event);
        this.update(values => {
            const { scrollLeft, scrollTop } = values;
            this.viewScrollLeft = scrollLeft;
            this.viewScrollTop = scrollTop;
            if (onScrollFrame) onScrollFrame(values);
        });
        this.detectScrolling();
    },

    handleScrollStart() {
        const { onScrollStart } = this.props;
        if (onScrollStart) onScrollStart();
        this.handleScrollStartAutoHide();
    },

    handleScrollStartAutoHide() {
        const { autoHide } = this.props;
        if (!autoHide) return;
        this.showTrack();
    },

    handleScrollStop() {
        const { onScrollStop } = this.props;
        if (onScrollStop) onScrollStop();
        this.handleScrollStopAutoHide();
    },

    handleScrollStopAutoHide() {
        const { autoHide } = this.props;
        if (!autoHide) return;
        this.hideTrack();
    },

    detectScrolling() {
        if (this.scrolling) return;
        this.scrolling = true;
        this.handleScrollStart();
        this.detectScrollingInterval = setInterval(() => {
            if (this.lastViewScrollLeft === this.viewScrollLeft
                && this.lastViewScrollTop === this.viewScrollTop) {
                clearInterval(this.detectScrollingInterval);
                this.scrolling = false;
                this.handleScrollStop();
            }
            this.lastViewScrollLeft = this.viewScrollLeft;
            this.lastViewScrollTop = this.viewScrollTop;
        }, 100);
    },

    handleHorizontalTrackMouseDown() {
        const { view, trackHorizontal } = this.refs;
        const { scrollWidth, clientWidth } = view;
        const trackWidth = getInnerWidth(trackHorizontal);
        const { target, clientX } = event;
        const { left: targetLeft } = target.getBoundingClientRect();
        const thumbWidth = this.getThumbHorizontalWidth();
        const offset = Math.abs(targetLeft - clientX);
        view.scrollLeft = (offset - thumbWidth / 2) / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
    },

    handleVerticalTrackMouseDown(event) {
        const { view, trackVertical } = this.refs;
        const { scrollHeight, clientHeight } = view;
        const trackHeight = getInnerHeight(trackVertical);
        const { target, clientY } = event;
        const { top: targetTop } = target.getBoundingClientRect();
        const thumbHeight = this.getThumbVerticalHeight();
        const offset = Math.abs(targetTop - clientY);
        view.scrollTop = (offset - thumbHeight / 2) / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
    },

    handleHorizontalThumbMouseDown(event) {
        this.handleDragStart(event);
        const { target, clientX } = event;
        const { offsetWidth } = target;
        const { left } = target.getBoundingClientRect();
        this.prevPageX = offsetWidth - (clientX - left);
    },

    handleVerticalThumbMouseDown(event) {
        this.handleDragStart(event);
        const { target, clientY } = event;
        const { offsetHeight } = target;
        const { top } = target.getBoundingClientRect();
        this.prevPageY = offsetHeight - (clientY - top);
    },

    handleDocumentMouseUp() {
        this.handleDragEnd();
    },

    handleDocumentMouseMove(event) {
        if (this.dragging === false) return false;
        if (this.prevPageX) {
            const { clientX } = event;
            const { view, trackHorizontal } = this.refs;
            const { scrollWidth, clientWidth } = view;
            const trackWidth = getInnerWidth(trackHorizontal);
            const { left: trackLeft } = trackHorizontal.getBoundingClientRect();
            const thumbWidth = this.getThumbHorizontalWidth();
            const clickPosition = thumbWidth - this.prevPageX;
            const offset = -(trackLeft - clientX);
            view.scrollLeft = (offset - clickPosition) / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
            return false;
        }
        if (this.prevPageY) {
            const { clientY } = event;
            const { view, trackVertical } = this.refs;
            const { scrollHeight, clientHeight } = view;
            const trackHeight = getInnerHeight(trackVertical);
            const { top: trackTop } = trackVertical.getBoundingClientRect();
            const thumbHeight = this.getThumbVerticalHeight();
            const clickPosition = thumbHeight - this.prevPageY;
            const offset = -(trackTop - clientY);
            view.scrollTop = (offset - clickPosition) / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
            return false;
        }
    },

    handleWindowResize() {
        this.update();
    },

    handleDragStart(event) {
        if (!document) return;
        event.stopImmediatePropagation();
        this.dragging = true;
        css(document.body, disableSelectStyle);
        document.addEventListener('mousemove', this.handleDocumentMouseMove);
        document.onselectstart = returnFalse;
    },

    handleDragEnd() {
        if (!this.dragging) return;
        if (!document) return;
        this.dragging = false;
        this.prevPageX = this.prevPageY = 0;
        css(document.body, disableSelectStyleReset);
        document.removeEventListener('mousemove', this.handleDocumentMouseMove);
        document.onselectstart = undefined;
        this.handleDragEndAutoHide();
    },

    handleDragEndAutoHide() {
        const { autoHide } = this.props;
        if (!autoHide) return;
        this.hideTrack();
    },

    handleTrackMouseEnter() {
        this.trackMouseOver = true;
        this.handleTrackMouseEnterAutoHide();
    },

    handleTrackMouseEnterAutoHide() {
        const { autoHide } = this.props;
        if (!autoHide) return;
        this.showTrack();
    },

    handleTrackMouseLeave() {
        this.trackMouseOver = false;
        this.handleTrackMouseLeaveAutoHide();
    },

    handleTrackMouseLeaveAutoHide() {
        const { autoHide } = this.props;
        if (!autoHide) return;
        this.hideTrack();
    },

    showTrack() {
        if (this.trackVisible) return;
        this.trackVisible = true;
        const { trackHorizontal, trackVertical } = this.refs;
        if (this.hideTrackTimeout) clearTimeout(this.hideTrackTimeout);
        css(trackHorizontal, { opacity: 1 });
        css(trackVertical, { opacity: 1 });
    },

    hideTrack() {
        if (this.dragging) return;
        if (this.scrolling) return;
        if (this.trackMouseOver) return;
        if (!this.trackVisible) return;
        this.trackVisible = false;
        const { autoHideTimeout } = this.props;
        const { trackHorizontal, trackVertical } = this.refs;
        if (this.hideTrackTimeout) clearTimeout(this.hideTrackTimeout);
        this.hideTrackTimeout = setTimeout(() => {
            css(trackHorizontal, { opacity: 0 });
            css(trackVertical, { opacity: 0 });
        }, autoHideTimeout);
    },

    raf(callback) {
        if (this.requestFrame) raf.cancel(this.requestFrame);
        this.requestFrame = raf(() => {
            this.requestFrame = undefined;
            callback();
        });
    },

    update(callback) {
        this.raf(() => {
            const values = this.getValues();
            if (getScrollbarWidth()) {
                const { thumbHorizontal, thumbVertical, trackHorizontal, trackVertical } = this.refs;
                const { scrollLeft, clientWidth, scrollWidth } = values;
                const trackHorizontalWidth = getInnerWidth(trackHorizontal);
                const thumbHorizontalWidth = this.getThumbHorizontalWidth();
                const thumbHorizontalX = scrollLeft / (scrollWidth - clientWidth) * (trackHorizontalWidth - thumbHorizontalWidth);
                const thumbHorizontalStyle = {
                    width: thumbHorizontalWidth,
                    transform: `translateX(${thumbHorizontalX}px)`
                };
                const { scrollTop, clientHeight, scrollHeight } = values;
                const trackVerticalHeight = getInnerHeight(trackVertical);
                const thumbVerticalHeight = this.getThumbVerticalHeight();
                const thumbVerticalY = scrollTop / (scrollHeight - clientHeight) * (trackVerticalHeight - thumbVerticalHeight);
                const thumbVerticalStyle = {
                    height: thumbVerticalHeight,
                    transform: `translateY(${thumbVerticalY}px)`
                };
                css(thumbHorizontal, thumbHorizontalStyle);
                css(thumbVertical, thumbVerticalStyle);
            }
            if (typeof callback !== 'function') return;
            callback(values);
        });
    },

    render() {
        const scrollbarWidth = getScrollbarWidth();
        const {
            onScroll,
            onScrollFrame,
            onScrollStart,
            onScrollStop,
            renderView,
            renderTrackHorizontal,
            renderTrackVertical,
            renderThumbHorizontal,
            renderThumbVertical,
            autoHide,
            autoHideTimeout,
            autoHideDuration,
            thumbSize,
            thumbMinSize,
            universal,
            style,
            children,
            ...props
        } = this.props;

        const { didMountUniversal } = this.state;

        const containerStyle = {
            ...containerStyleDefault,
            ...style
        };

        const viewStyle = scrollbarWidth ? {
            ...viewStyleScrollbarsVisible,
            right: -scrollbarWidth,
            bottom: -scrollbarWidth,
            ...(universal && !didMountUniversal
                ? viewStyleUniversalInitial
                : undefined
            )
        } : viewStyleScrollbarsInvisible;

        const trackHorizontalStyle = {
            ...trackHorizontalStyleDefault,
            ...(autoHide
                ? { transition: `opacity ${autoHideDuration}ms`, opacity: 0 }
                : undefined
            ),
            ...(!scrollbarWidth || universal && !didMountUniversal
                ? { display: 'none' }
                : undefined
            )
        };

        const trackVerticalStyle = {
            ...trackVerticalStyleDefault,
            ...(autoHide
                ? { transition: `opacity ${autoHideDuration}ms`, opacity: 0 }
                : undefined
            ),
            ...(!scrollbarWidth || universal && !didMountUniversal
                ? { display: 'none' }
                : undefined
            )
        };

        return (
            <div {...props} style={containerStyle} ref="container">
                {cloneElement(
                    renderView({ style: viewStyle }),
                    { ref: 'view' },
                    children
                )}
                {cloneElement(
                    renderTrackHorizontal({ style: trackHorizontalStyle }),
                    { ref: 'trackHorizontal' },
                    cloneElement(
                        renderThumbHorizontal({ style: thumbHorizontalStyleDefault }),
                        { ref: 'thumbHorizontal' }
                    )
                )}
                {cloneElement(
                    renderTrackVertical({ style: trackVerticalStyle }),
                    { ref: 'trackVertical' },
                    cloneElement(
                        renderThumbVertical({ style: thumbVerticalStyleDefault }),
                        { ref: 'thumbVertical' }
                    )
                )}
            </div>
        );
    }
});
