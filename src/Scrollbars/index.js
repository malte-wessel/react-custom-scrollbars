import raf, { cancel as caf } from 'raf';
import css from 'dom-css';
import React, { createClass, PropTypes, cloneElement } from 'react';
import getScrollbarWidth from '../utils/getScrollbarWidth';
import returnFalse from '../utils/returnFalse';
import getInnerWidth from '../utils/getInnerWidth';
import getInnerHeight from '../utils/getInnerHeight';

import {
    containerStyleDefault,
    viewStyleDefault,
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
        onUpdate: PropTypes.func,
        renderView: PropTypes.func,
        renderTrackHorizontal: PropTypes.func,
        renderTrackVertical: PropTypes.func,
        renderThumbHorizontal: PropTypes.func,
        renderThumbVertical: PropTypes.func,
        autoHide: PropTypes.bool,
        autoHideTimeout: PropTypes.number,
        autoHideDuration: PropTypes.number,
        hideIfNotNeeded: PropTypes.bool,
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
            hideIfNotNeeded: false,
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
        caf(this.requestFrame);
        clearTimeout(this.hideTracksTimeout);
        clearInterval(this.detectScrollingInterval);
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
        if (typeof view !== 'undefined') {
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
        } else {
            return {};
        }
        
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

    getScrollLeftForOffset(offset) {
        const { view, trackHorizontal } = this.refs;
        const { scrollWidth, clientWidth } = view;
        const trackWidth = getInnerWidth(trackHorizontal);
        const thumbWidth = this.getThumbHorizontalWidth();
        return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
    },

    getScrollTopForOffset(offset) {
        const { view, trackVertical } = this.refs;
        const { scrollHeight, clientHeight } = view;
        const trackHeight = getInnerHeight(trackVertical);
        const thumbHeight = this.getThumbVerticalHeight();
        return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
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
        /* istanbul ignore if */
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
        window.addEventListener('resize', this.handleWindowResize);
    },

    removeListeners() {
        /* istanbul ignore if */
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
        window.removeEventListener('resize', this.handleWindowResize);
        // Possibly setup by `handleDragStart`
        this.teardownDragging();
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
        this.showTracks();
    },

    handleScrollStop() {
        const { onScrollStop } = this.props;
        if (onScrollStop) onScrollStop();
        this.handleScrollStopAutoHide();
    },

    handleScrollStopAutoHide() {
        const { autoHide } = this.props;
        if (!autoHide) return;
        this.hideTracks();
    },

    handleWindowResize() {
        this.update();
    },

    handleHorizontalTrackMouseDown() {
        const { view } = this.refs;
        const { target, clientX } = event;
        const { left: targetLeft } = target.getBoundingClientRect();
        const thumbWidth = this.getThumbHorizontalWidth();
        const offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
        view.scrollLeft = this.getScrollLeftForOffset(offset);
    },

    handleVerticalTrackMouseDown(event) {
        const { view } = this.refs;
        const { target, clientY } = event;
        const { top: targetTop } = target.getBoundingClientRect();
        const thumbHeight = this.getThumbVerticalHeight();
        const offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
        view.scrollTop = this.getScrollTopForOffset(offset);
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

    setupDragging() {
        css(document.body, disableSelectStyle);
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.handleDragEnd);
        document.onselectstart = returnFalse;
    },

    teardownDragging() {
        css(document.body, disableSelectStyleReset);
        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseup', this.handleDragEnd);
        document.onselectstart = undefined;
    },

    handleDragStart(event) {
        this.dragging = true;
        event.stopImmediatePropagation();
        this.setupDragging();
    },

    handleDrag(event) {
        if (this.prevPageX) {
            const { clientX } = event;
            const { view, trackHorizontal } = this.refs;
            const { left: trackLeft } = trackHorizontal.getBoundingClientRect();
            const thumbWidth = this.getThumbHorizontalWidth();
            const clickPosition = thumbWidth - this.prevPageX;
            const offset = -trackLeft + clientX - clickPosition;
            view.scrollLeft = this.getScrollLeftForOffset(offset);
        }
        if (this.prevPageY) {
            const { clientY } = event;
            const { view, trackVertical } = this.refs;
            const { top: trackTop } = trackVertical.getBoundingClientRect();
            const thumbHeight = this.getThumbVerticalHeight();
            const clickPosition = thumbHeight - this.prevPageY;
            const offset = -trackTop + clientY - clickPosition;
            view.scrollTop = this.getScrollTopForOffset(offset);
        }
        return false;
    },

    handleDragEnd() {
        this.dragging = false;
        this.prevPageX = this.prevPageY = 0;
        this.teardownDragging();
        this.handleDragEndAutoHide();
    },

    handleDragEndAutoHide() {
        const { autoHide } = this.props;
        if (!autoHide) return;
        this.hideTracks();
    },

    handleTrackMouseEnter() {
        this.trackMouseOver = true;
        this.handleTrackMouseEnterAutoHide();
    },

    handleTrackMouseEnterAutoHide() {
        const { autoHide } = this.props;
        if (!autoHide) return;
        this.showTracks();
    },

    handleTrackMouseLeave() {
        this.trackMouseOver = false;
        this.handleTrackMouseLeaveAutoHide();
    },

    handleTrackMouseLeaveAutoHide() {
        const { autoHide } = this.props;
        if (!autoHide) return;
        this.hideTracks();
    },

    showTracks() {
        const { trackHorizontal, trackVertical } = this.refs;
        clearTimeout(this.hideTracksTimeout);
        css(trackHorizontal, { opacity: 1 });
        css(trackVertical, { opacity: 1 });
    },

    hideTracks() {
        if (this.dragging) return;
        if (this.scrolling) return;
        if (this.trackMouseOver) return;
        const { autoHideTimeout } = this.props;
        const { trackHorizontal, trackVertical } = this.refs;
        clearTimeout(this.hideTracksTimeout);
        this.hideTracksTimeout = setTimeout(() => {
            css(trackHorizontal, { opacity: 0 });
            css(trackVertical, { opacity: 0 });
        }, autoHideTimeout);
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

    raf(callback) {
        if (this.requestFrame) raf.cancel(this.requestFrame);
        this.requestFrame = raf(() => {
            this.requestFrame = undefined;
            callback();
        });
    },

    update(callback) {
        this.raf(() => {
            const { onUpdate } = this.props;
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
            if (onUpdate) onUpdate(values);
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
            hideIfNotNeeded,
            thumbSize,
            thumbMinSize,
            universal,
            style,
            children,
            ...props
        } = this.props;
        
        const values = this.getValues();

        const { didMountUniversal } = this.state;

        const containerStyle = {
            ...containerStyleDefault,
            ...style
        };

        const viewStyle = {
            ...viewStyleDefault,
            ...(scrollbarWidth
                ? { right: -scrollbarWidth, bottom: -scrollbarWidth }
                : { right: 0, bottom: 0 }
            ),
            ...(universal && !didMountUniversal
                ? viewStyleUniversalInitial
                : undefined
            )
        };

        const { clientWidth, scrollWidth } = values;
        const trackHorizontalStyle = {
            ...trackHorizontalStyleDefault,
            ...(autoHide
                ? { transition: `opacity ${autoHideDuration}ms`, opacity: 0 }
                : undefined
            ),
            ...(!scrollbarWidth || universal && !didMountUniversal
                ? { display: 'none' }
                : undefined
            ),
            ...(hideIfNotNeeded && scrollWidth <= clientWidth
                ? { display: 'none' }
                : {}
            )
        };

        const { clientHeight, scrollHeight } = values;
        const trackVerticalStyle = {
            ...trackVerticalStyleDefault,
            ...(autoHide
                ? { transition: `opacity ${autoHideDuration}ms`, opacity: 0 }
                : undefined
            ),
            ...(!scrollbarWidth || universal && !didMountUniversal
                ? { display: 'none' }
                : undefined
            ),
            ...(hideIfNotNeeded && scrollHeight <= clientHeight
                ? { display: 'none' }
                : {}
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
