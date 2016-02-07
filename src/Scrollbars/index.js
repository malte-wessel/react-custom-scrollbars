import raf from 'raf';
import css from 'dom-css';
import React, { createClass, PropTypes, cloneElement } from 'react';
import getScrollbarWidth from '../utils/getScrollbarWidth';
import returnFalse from '../utils/returnFalse';

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
        renderView: PropTypes.func,
        renderTrackHorizontal: PropTypes.func,
        renderTrackVertical: PropTypes.func,
        renderThumbHorizontal: PropTypes.func,
        renderThumbVertical: PropTypes.func,
        autoHide: PropTypes.bool,
        autoHideTimeout: PropTypes.number,
        autoHideDuration: PropTypes.number,
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
            autoHideDuration: 200
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
        if (this.frameTimer) raf.cancel(this.frameTimer);
        if (this.hideTrackTimer) clearTimeout(this.hideTrackTimer);
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

    getWidth() {
        const { view } = this.refs;
        return view.clientWidth;
    },

    getHeight() {
        const { view } = this.refs;
        return view.clientHeight;
    },

    getValues() {
        const { view } = this.refs;
        const {
            scrollTop,
            scrollLeft,
            scrollHeight,
            scrollWidth,
            clientHeight,
            clientWidth
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
        const { container, view, trackHorizontal, trackVertical, thumbHorizontal, thumbVertical } = this.refs;
        view.addEventListener('scroll', this.handleScroll);
        if (!getScrollbarWidth()) return;
        container.addEventListener('mouseenter', this.handleContainerMouseEnter);
        container.addEventListener('mouseleave', this.handleContainerMouseLeave);
        trackHorizontal.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
        trackVertical.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
        thumbHorizontal.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
        thumbVertical.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
        document.addEventListener('mouseup', this.handleDocumentMouseUp);
        window.addEventListener('resize', this.handleWindowResize);
    },

    removeListeners() {
        if (typeof document === 'undefined') return;
        const { container, view, trackHorizontal, trackVertical, thumbHorizontal, thumbVertical } = this.refs;
        view.removeEventListener('scroll', this.handleScroll);
        if (!getScrollbarWidth()) return;
        container.removeEventListener('mouseenter', this.handleContainerMouseEnter);
        container.removeEventListener('mouseleave', this.handleContainerMouseLeave);
        trackHorizontal.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
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
    },

    handleVerticalTrackMouseDown(event) {
        const { view, thumbVertical, trackVertical } = this.refs;
        const { target, clientY } = event;
        const { top: targetTop } = target.getBoundingClientRect();
        const { scrollHeight } = view;
        const { offsetHeight: thumbOffsetHeight } = thumbVertical;
        const { offsetHeight: trackOffsetHeight } = trackVertical;
        const offset = Math.abs(targetTop - clientY);
        view.scrollTop = (offset - (thumbOffsetHeight / 2)) / trackOffsetHeight * scrollHeight;
    },

    handleHorizontalTrackMouseDown() {
        const { view, thumbHorizontal, trackHorizontal } = this.refs;
        const { target, clientX } = event;
        const { left: targetLeft } = target.getBoundingClientRect();
        const { scrollWidth } = view;
        const { offsetWidth: thumbOffsetWidth } = thumbHorizontal;
        const { offsetWidth: trackOffsetWidth } = trackHorizontal;
        const offset = Math.abs(targetLeft - clientX);
        view.scrollLeft = (offset - (thumbOffsetWidth / 2)) / trackOffsetWidth * scrollWidth;
    },

    handleVerticalThumbMouseDown(event) {
        this.handleDragStart(event);
        const { target, clientY } = event;
        const { offsetHeight } = target;
        const { top } = target.getBoundingClientRect();
        this.prevPageY = offsetHeight - (clientY - top);
    },

    handleHorizontalThumbMouseDown(event) {
        this.handleDragStart(event);
        const { target, clientX } = event;
        const { offsetWidth } = target;
        const { left } = target.getBoundingClientRect();
        this.prevPageX = offsetWidth - (clientX - left);
    },

    handleDocumentMouseUp() {
        this.handleDragEnd();
    },

    handleDocumentMouseMove(event) {
        if (this.dragging === false) return false;
        if (this.prevPageY) {
            const { clientY } = event;
            const { view, trackVertical, thumbVertical } = this.refs;
            const { top } = trackVertical.getBoundingClientRect();
            const { offsetHeight: thumbOffsetHeight } = thumbVertical;
            const { offsetHeight: trackOffsetHeight } = trackVertical;
            const { scrollHeight } = view;
            const offset = -(top - clientY);
            const thumbClickPosition = thumbOffsetHeight - this.prevPageY;
            view.scrollTop = (offset - thumbClickPosition) / trackOffsetHeight * scrollHeight;
            return false;
        }
        if (this.prevPageX) {
            const { clientX } = event;
            const { view, trackHorizontal, thumbHorizontal } = this.refs;
            const { left } = trackHorizontal.getBoundingClientRect();
            const { offsetWidth: thumbOffsetWidth } = thumbHorizontal;
            const { offsetWidth: trackOffsetWidth } = trackHorizontal;
            const { scrollWidth } = view;
            const offset = -(left - clientX);
            const thumbClickPosition = thumbOffsetWidth - this.prevPageX;
            view.scrollLeft = (offset - thumbClickPosition) / trackOffsetWidth * scrollWidth;
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
        this.hideTrackWhenNotMouseOver();
    },

    handleContainerMouseEnter() {
        const { autoHide } = this.props;
        this.mouseOver = true;
        if (!autoHide) return;
        this.showTrack();
    },

    handleContainerMouseLeave() {
        const { autoHide } = this.props;
        this.mouseOver = false;
        if (!autoHide) return;
        if (this.dragging) return;
        this.hideTrack();
    },

    showTrack() {
        const { trackHorizontal, trackVertical } = this.refs;
        if (this.hideTrackTimer) clearTimeout(this.hideTrackTimer);
        css(trackHorizontal, { opacity: 1 });
        css(trackVertical, { opacity: 1 });
    },

    showTrackWhenMouseOver() {
        if (!this.mouseOver) return;
        this.showTrack();
    },

    hideTrack() {
        const { autoHideTimeout } = this.props;
        const { trackHorizontal, trackVertical } = this.refs;
        if (this.hideTrackTimer) clearTimeout(this.hideTrackTimer);
        this.hideTrackTimer = setTimeout(() => {
            css(trackHorizontal, { opacity: 0 });
            css(trackVertical, { opacity: 0 });
        }, autoHideTimeout);
    },

    hideTrackWhenNotMouseOver() {
        if (this.mouseOver) return;
        this.hideTrack();
    },

    raf(callback) {
        if (this.frameTimer) raf.cancel(this.frameTimer);
        this.frameTimer = raf(() => {
            this.frameTimer = undefined;
            callback();
        });
    },

    update(callback) {
        this.raf(() => {
            const values = this.getValues();
            if (getScrollbarWidth()) {
                const { thumbHorizontal, thumbVertical } = this.refs;
                const { scrollLeft, scrollTop, clientWidth, clientHeight, scrollWidth, scrollHeight } = values;
                const thumbHorizontalX = scrollLeft * 100 / clientWidth;
                const thumbHorizontalWidth = clientWidth * 100 / scrollWidth;
                const thumbVerticalY = scrollTop * 100 / clientHeight;
                const thumbVerticalHeight = clientHeight * 100 / scrollHeight;
                const thumbHorizontalStyle = {
                    width: thumbHorizontalWidth < 100 ? `${thumbHorizontalWidth}%` : 0,
                    transform: `translateX(${thumbHorizontalX}%)`
                };
                const thumbVerticalStyle = {
                    height: thumbVerticalHeight < 100 ? `${thumbVerticalHeight}%` : 0,
                    transform: `translateY(${thumbVerticalY}%)`
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
