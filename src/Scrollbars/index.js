import raf from 'raf';
import css from 'dom-css';
import React, { createClass, PropTypes, cloneElement } from 'react';
import getScrollbarWidth from '../utils/getScrollbarWidth';
import returnFalse from '../utils/returnFalse';
import getInnerWidth from '../utils/getInnerWidth';
import getInnerHeight from '../utils/getInnerHeight';

import {
    containerStyle,
    scrollbarsVisibleViewStyle,
    scrollbarsInvisibleViewStyle,
    defaultTrackHorizontalStyle,
    defaultTrackVerticalStyle,
    defaultThumbHorizontalStyle,
    defaultThumbVerticalStyle,
    disableSelectStyle,
    resetDisableSelectStyle
} from './styles';

import {
    defaultRenderView,
    defaultRenderTrackHorizontal,
    defaultRenderTrackVertical,
    defaultRenderThumbHorizontal,
    defaultRenderThumbVertical
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
        thumbMinSize: PropTypes.number,
        style: PropTypes.object,
        children: PropTypes.node,
    },

    getDefaultProps() {
        return {
            renderView: defaultRenderView,
            renderTrackHorizontal: defaultRenderTrackHorizontal,
            renderTrackVertical: defaultRenderTrackVertical,
            renderThumbHorizontal: defaultRenderThumbHorizontal,
            renderThumbVertical: defaultRenderThumbVertical,
            autoHide: false,
            autoHideTimeout: 1000,
            autoHideDuration: 200,
            thumbMinSize: 30
        };
    },

    componentDidMount() {
        this.addListeners();
        this.update();
    },

    componentDidUpdate() {
        this.update();
    },

    componentWillUnmount() {
        this.removeListeners();
        if (this.requestFrame) raf.cancel(this.requestFrame);
        if (this.hideTrackTimer) clearTimeout(this.hideTrackTimer);
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

    getThumbHorizontalConfig() {
        const { view, trackHorizontal } = this.refs;
        const { scrollWidth, clientWidth } = view;
        const trackWidth = getInnerWidth(trackHorizontal);
        const { thumbMinSize } = this.props;
        const width = clientWidth / scrollWidth * trackWidth;
        const finalWidth = Math.max(width, thumbMinSize);
        const diff = finalWidth - width;
        return { width, finalWidth, diff };
    },

    getThumbVerticalConfig() {
        const { view, trackVertical } = this.refs;
        const { scrollHeight, clientHeight } = view;
        const trackHeight = getInnerHeight(trackVertical);
        const { thumbMinSize } = this.props;
        const height = clientHeight / scrollHeight * trackHeight;
        const finalHeight = Math.max(height, thumbMinSize);
        const diff = finalHeight - height;
        return { height, finalHeight, diff };
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
        this.update(onScrollFrame);
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
        const { scrollWidth } = view;
        const trackWidth = getInnerWidth(trackHorizontal);
        const { target, clientX } = event;
        const { left: targetLeft } = target.getBoundingClientRect();
        const { width: thumbWidth, diff: thumbDiff } = this.getThumbHorizontalConfig();
        const offset = Math.abs(targetLeft - clientX);
        view.scrollLeft = (offset - (thumbWidth / 2) - (thumbDiff / 2)) / (trackWidth - thumbDiff) * scrollWidth;
    },

    handleVerticalTrackMouseDown(event) {
        const { view, trackVertical } = this.refs;
        const { scrollHeight } = view;
        const trackHeight = getInnerHeight(trackVertical);
        const { target, clientY } = event;
        const { top: targetTop } = target.getBoundingClientRect();
        const { height: thumbHeight, diff: thumbDiff } = this.getThumbVerticalConfig();
        const offset = Math.abs(targetTop - clientY);
        view.scrollTop = (offset - (thumbHeight / 2) - (thumbDiff / 2)) / (trackHeight - thumbDiff) * scrollHeight;
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
            const { scrollWidth } = view;
            const trackWidth = getInnerWidth(trackHorizontal);
            const { left: trackLeft } = trackHorizontal.getBoundingClientRect();
            const { finalWidth: thumbFinalWidth, diff: thumbDiff } = this.getThumbHorizontalConfig();
            const offset = -(trackLeft - clientX);
            const thumbClickPosition = thumbFinalWidth - this.prevPageX;
            view.scrollLeft = (offset - thumbClickPosition) / (trackWidth - thumbDiff) * scrollWidth;
            return false;
        }
        if (this.prevPageY) {
            const { clientY } = event;
            const { view, trackVertical } = this.refs;
            const { scrollHeight } = view;
            const trackHeight = getInnerHeight(trackVertical);
            const { top: trackTop } = trackVertical.getBoundingClientRect();
            const { finalHeight: thumbFinalHeight, diff: thumbDiff } = this.getThumbVerticalConfig();
            const offset = -(trackTop - clientY);
            const thumbClickPosition = thumbFinalHeight - this.prevPageY;
            view.scrollTop = (offset - thumbClickPosition) / (trackHeight - thumbDiff) * scrollHeight;
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
        css(document.body, resetDisableSelectStyle);
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
        if (this.hideTrackTimer) clearTimeout(this.hideTrackTimer);
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
        if (this.hideTrackTimer) clearTimeout(this.hideTrackTimer);
        this.hideTrackTimer = setTimeout(() => {
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
                const { finalWidth: thumbHorizontalWidth } = this.getThumbHorizontalConfig();
                const thumbHorizontalX = scrollLeft / (scrollWidth - clientWidth) * (trackHorizontalWidth - thumbHorizontalWidth);
                const thumbHorizontalStyle = {
                    width: thumbHorizontalWidth < trackHorizontalWidth ? thumbHorizontalWidth : 0,
                    transform: `translateX(${thumbHorizontalX}px)`
                };
                const { scrollTop, clientHeight, scrollHeight } = values;
                const trackVerticalHeight = getInnerHeight(trackVertical);
                const { finalHeight: thumbVerticalHeight } = this.getThumbVerticalConfig();
                const thumbVerticalY = scrollTop / (scrollHeight - clientHeight) * (trackVerticalHeight - thumbVerticalHeight);
                const thumbVerticalStyle = {
                    height: thumbVerticalHeight < trackVerticalHeight ? thumbVerticalHeight : 0,
                    transform: `translateY(${thumbVerticalY}px)`
                };
                this.viewScrollLeft = scrollLeft;
                this.viewScrollTop = scrollTop;
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
            style,
            renderTrackHorizontal,
            renderTrackVertical,
            renderThumbHorizontal,
            renderThumbVertical,
            renderView,
            autoHide,
            autoHideDuration,
            autoHideTimeout,
            onScroll,
            children,
            ...props
        } = this.props;

        const finalContainerStyle = {
            ...containerStyle,
            ...style
        };

        const viewStyle = scrollbarWidth ? {
            ...scrollbarsVisibleViewStyle,
            right: -scrollbarWidth,
            bottom: -scrollbarWidth,
        } : scrollbarsInvisibleViewStyle;

        const finalTrackHorizontalStyle = autoHide ? {
            ...defaultTrackHorizontalStyle,
            transition: `opacity ${autoHideDuration}ms`,
            opacity: 0
        } : defaultTrackHorizontalStyle;

        const finalTrackVerticalStyle = autoHide ? {
            ...defaultTrackVerticalStyle,
            transition: `opacity ${autoHideDuration}ms`,
            opacity: 0
        } : defaultTrackVerticalStyle;

        return (
            <div {...props} style={finalContainerStyle} ref="container">
                {cloneElement(
                    renderView({ style: viewStyle }),
                    { ref: 'view' },
                    children
                )}
                {scrollbarWidth ?
                    cloneElement(
                        renderTrackHorizontal({ style: finalTrackHorizontalStyle }),
                        { ref: 'trackHorizontal' },
                        cloneElement(
                            renderThumbHorizontal({ style: defaultThumbHorizontalStyle }),
                            { ref: 'thumbHorizontal' }
                        )
                    )
                    : undefined
                }
                {scrollbarWidth ?
                    cloneElement(
                        renderTrackVertical({ style: finalTrackVerticalStyle }),
                        { ref: 'trackVertical' },
                        cloneElement(
                            renderThumbVertical({ style: defaultThumbVerticalStyle }),
                            { ref: 'thumbVertical' }
                        )
                    )
                    : undefined
                }
            </div>
        );
    }
});
