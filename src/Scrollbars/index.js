import raf, { cancel as caf } from 'raf';
import css from 'dom-css';
import { Component, createElement, cloneElement } from 'react';
import PropTypes from 'prop-types';

import isString from '../utils/isString';
import getScrollbarWidth from '../utils/getScrollbarWidth';
import returnFalse from '../utils/returnFalse';
import getInnerWidth from '../utils/getInnerWidth';
import getInnerHeight from '../utils/getInnerHeight';

import {
    containerStyleDefault,
    containerStyleAutoHeight,
    viewStyleDefault,
    viewStyleAutoHeight,
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

export default class Scrollbars extends Component {

    constructor(props, ...rest) {
      super(props, ...rest);

      this.handleTrackMouseEnter = this.handleTrackMouseEnter.bind(this);
      this.handleTrackMouseLeave = this.handleTrackMouseLeave.bind(this);
      this.handleHorizontalTrackMouseDown = this.handleHorizontalTrackMouseDown.bind(this);
      this.handleVerticalTrackMouseDown = this.handleVerticalTrackMouseDown.bind(this);
      this.handleHorizontalThumbMouseDown = this.handleHorizontalThumbMouseDown.bind(this);
      this.handleVerticalThumbMouseDown = this.handleVerticalThumbMouseDown.bind(this);
      this.handleWindowResize = this.handleWindowResize.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
      this.handleDrag = this.handleDrag.bind(this);
      this.handleDragEnd = this.handleDragEnd.bind(this);

      this.state = {
	      didMountUniversal: false
      };
    }

    componentDidMount() {
        this.addListeners();
        this.update();
        this.componentDidMountUniversal();
    }

    componentDidMountUniversal() { // eslint-disable-line react/sort-comp
        const { universal } = this.props;
        if (!universal) return;
        this.setState({ didMountUniversal: true });
    }

    componentDidUpdate() {
        this.update();
    }

    componentWillUnmount() {
        this.removeListeners();
        caf(this.requestFrame);
        clearTimeout(this.hideTracksTimeout);
        clearInterval(this.detectScrollingInterval);
    }

    getScrollLeft() {
        const { view } = this.refs;
        return view.scrollLeft;
    }

    getScrollTop() {
        const { view } = this.refs;
        return view.scrollTop;
    }

    getScrollWidth() {
        const { view } = this.refs;
        return view.scrollWidth;
    }

    getScrollHeight() {
        const { view } = this.refs;
        return view.scrollHeight;
    }

    getClientWidth() {
        const { view } = this.refs;
        return view.clientWidth;
    }

    getClientHeight() {
        const { view } = this.refs;
        return view.clientHeight;
    }

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
    }

    getThumbHorizontalWidth() {
        const { thumbSize, thumbMinSize } = this.props;
        const { view, trackHorizontal } = this.refs;
        const { scrollWidth, clientWidth } = view;
        const trackWidth = getInnerWidth(trackHorizontal);
        const width = Math.ceil(clientWidth / scrollWidth * trackWidth);
        if (trackWidth === width) return 0;
        if (thumbSize) return thumbSize;
        return Math.max(width, thumbMinSize);
    }

    getThumbVerticalHeight() {
        const { thumbSize, thumbMinSize } = this.props;
        const { view, trackVertical } = this.refs;
        const { scrollHeight, clientHeight } = view;
        const trackHeight = getInnerHeight(trackVertical);
        const height = Math.ceil(clientHeight / scrollHeight * trackHeight);
        if (trackHeight === height) return 0;
        if (thumbSize) return thumbSize;
        return Math.max(height, thumbMinSize);
    }

    getScrollLeftForOffset(offset) {
        const { view, trackHorizontal } = this.refs;
        const { scrollWidth, clientWidth } = view;
        const trackWidth = getInnerWidth(trackHorizontal);
        const thumbWidth = this.getThumbHorizontalWidth();
        return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
    }

    getScrollTopForOffset(offset) {
        const { view, trackVertical } = this.refs;
        const { scrollHeight, clientHeight } = view;
        const trackHeight = getInnerHeight(trackVertical);
        const thumbHeight = this.getThumbVerticalHeight();
        return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
    }

    scrollLeft(left = 0) {
        const { view } = this.refs;
        view.scrollLeft = left;
    }

    scrollTop(top = 0) {
        const { view } = this.refs;
        view.scrollTop = top;
    }

    scrollToLeft() {
        const { view } = this.refs;
        view.scrollLeft = 0;
    }

    scrollToTop() {
        const { view } = this.refs;
        view.scrollTop = 0;
    }

    scrollToRight() {
        const { view } = this.refs;
        view.scrollLeft = view.scrollWidth;
    }

    scrollToBottom() {
        const { view } = this.refs;
        view.scrollTop = view.scrollHeight;
    }

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
    }

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
    }

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
    }

    handleScrollStart() {
        const { onScrollStart } = this.props;
        if (onScrollStart) onScrollStart();
        this.handleScrollStartAutoHide();
    }

    handleScrollStartAutoHide() {
        const { autoHide } = this.props;
        if (!autoHide) return;
        this.showTracks();
    }

    handleScrollStop() {
        const { onScrollStop } = this.props;
        if (onScrollStop) onScrollStop();
        this.handleScrollStopAutoHide();
    }

    handleScrollStopAutoHide() {
        const { autoHide } = this.props;
        if (!autoHide) return;
        this.hideTracks();
    }

    handleWindowResize() {
        this.update();
    }

    handleHorizontalTrackMouseDown(event) {
        event.preventDefault();
        const { view } = this.refs;
        const { target, clientX } = event;
        const { left: targetLeft } = target.getBoundingClientRect();
        const thumbWidth = this.getThumbHorizontalWidth();
        const offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
        view.scrollLeft = this.getScrollLeftForOffset(offset);
    }

    handleVerticalTrackMouseDown(event) {
        event.preventDefault();
        const { view } = this.refs;
        const { target, clientY } = event;
        const { top: targetTop } = target.getBoundingClientRect();
        const thumbHeight = this.getThumbVerticalHeight();
        const offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
        view.scrollTop = this.getScrollTopForOffset(offset);
    }

    handleHorizontalThumbMouseDown(event) {
        event.preventDefault();
        this.handleDragStart(event);
        const { target, clientX } = event;
        const { offsetWidth } = target;
        const { left } = target.getBoundingClientRect();
        this.prevPageX = offsetWidth - (clientX - left);
    }

    handleVerticalThumbMouseDown(event) {
        event.preventDefault();
        this.handleDragStart(event);
        const { target, clientY } = event;
        const { offsetHeight } = target;
        const { top } = target.getBoundingClientRect();
        this.prevPageY = offsetHeight - (clientY - top);
    }

    setupDragging() {
        css(document.body, disableSelectStyle);
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.handleDragEnd);
        document.onselectstart = returnFalse;
    }

    teardownDragging() {
        css(document.body, disableSelectStyleReset);
        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseup', this.handleDragEnd);
        document.onselectstart = undefined;
    }

    handleDragStart(event) {
        this.dragging = true;
        event.stopImmediatePropagation();
        this.setupDragging();
    }

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
    }

    handleDragEnd() {
        this.dragging = false;
        this.prevPageX = this.prevPageY = 0;
        this.teardownDragging();
        this.handleDragEndAutoHide();
    }

    handleDragEndAutoHide() {
        const { autoHide } = this.props;
        if (!autoHide) return;
        this.hideTracks();
    }

    handleTrackMouseEnter() {
        this.trackMouseOver = true;
        this.handleTrackMouseEnterAutoHide();
    }

    handleTrackMouseEnterAutoHide() {
        const { autoHide } = this.props;
        if (!autoHide) return;
        this.showTracks();
    }

    handleTrackMouseLeave() {
        this.trackMouseOver = false;
        this.handleTrackMouseLeaveAutoHide();
    }

    handleTrackMouseLeaveAutoHide() {
        const { autoHide } = this.props;
        if (!autoHide) return;
        this.hideTracks();
    }

    showTracks() {
        const { trackHorizontal, trackVertical } = this.refs;
        clearTimeout(this.hideTracksTimeout);
        css(trackHorizontal, { opacity: 1 });
        css(trackVertical, { opacity: 1 });
    }

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
    }

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
    }

    raf(callback) {
        if (this.requestFrame) raf.cancel(this.requestFrame);
        this.requestFrame = raf(() => {
            this.requestFrame = undefined;
            callback();
        });
    }

    update(callback) {
        this.raf(() => this._update(callback));
    }

    _update(callback) {
        const { onUpdate, hideTracksWhenNotNeeded } = this.props;
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
            if (hideTracksWhenNotNeeded) {
                const trackHorizontalStyle = {
                    visibility: scrollWidth > clientWidth ? 'visible' : 'hidden'
                };
                const trackVerticalStyle = {
                    visibility: scrollHeight > clientHeight ? 'visible' : 'hidden'
                };
                css(trackHorizontal, trackHorizontalStyle);
                css(trackVertical, trackVerticalStyle);
            }
            css(thumbHorizontal, thumbHorizontalStyle);
            css(thumbVertical, thumbVerticalStyle);
        }
        if (onUpdate) onUpdate(values);
        if (typeof callback !== 'function') return;
        callback(values);
    }

    render() {
        const scrollbarWidth = getScrollbarWidth();
        /* eslint-disable no-unused-vars */
        const {
            onScroll,
            onScrollFrame,
            onScrollStart,
            onScrollStop,
            onUpdate,
            renderView,
            renderTrackHorizontal,
            renderTrackVertical,
            renderThumbHorizontal,
            renderThumbVertical,
            tagName,
            hideTracksWhenNotNeeded,
            autoHide,
            autoHideTimeout,
            autoHideDuration,
            thumbSize,
            thumbMinSize,
            universal,
            autoHeight,
            autoHeightMin,
            autoHeightMax,
            style,
            children,
            ...props
        } = this.props;
        /* eslint-enable no-unused-vars */

        const { didMountUniversal } = this.state;

        const containerStyle = {
            ...containerStyleDefault,
            ...(autoHeight && {
                ...containerStyleAutoHeight,
                minHeight: autoHeightMin,
                maxHeight: autoHeightMax
            }),
            ...style
        };

        const viewStyle = {
            ...viewStyleDefault,
            // Hide scrollbars by setting a negative margin
            marginRight: scrollbarWidth ? -scrollbarWidth : 0,
            marginBottom: scrollbarWidth ? -scrollbarWidth : 0,
            ...(autoHeight && {
                ...viewStyleAutoHeight,
                // Add scrollbarWidth to autoHeight in order to compensate negative margins
                minHeight: isString(autoHeightMin)
                    ? `calc(${autoHeightMin} + ${scrollbarWidth}px)`
                    : autoHeightMin + scrollbarWidth,
                maxHeight: isString(autoHeightMax)
                    ? `calc(${autoHeightMax} + ${scrollbarWidth}px)`
                    : autoHeightMax + scrollbarWidth
            }),
            // Override min/max height for initial universal rendering
            ...((autoHeight && universal && !didMountUniversal) && {
                minHeight: autoHeightMin,
                maxHeight: autoHeightMax
            }),
            // Override
            ...((universal && !didMountUniversal) && viewStyleUniversalInitial)
        };

        const trackAutoHeightStyle = {
            transition: `opacity ${autoHideDuration}ms`,
            opacity: 0
        };

        const trackHorizontalStyle = {
            ...trackHorizontalStyleDefault,
            ...(autoHide && trackAutoHeightStyle),
            ...((!scrollbarWidth || (universal && !didMountUniversal)) && {
                display: 'none'
            })
        };

        const trackVerticalStyle = {
            ...trackVerticalStyleDefault,
            ...(autoHide && trackAutoHeightStyle),
            ...((!scrollbarWidth || (universal && !didMountUniversal)) && {
                display: 'none'
            })
        };

        return createElement(tagName, { ...props, style: containerStyle, ref: 'container' }, [
            cloneElement(
                renderView({ style: viewStyle }),
                { key: 'view', ref: 'view' },
                children
            ),
            cloneElement(
                renderTrackHorizontal({ style: trackHorizontalStyle }),
                { key: 'trackHorizontal', ref: 'trackHorizontal' },
                cloneElement(
                    renderThumbHorizontal({ style: thumbHorizontalStyleDefault }),
                    { ref: 'thumbHorizontal' }
                )
            ),
            cloneElement(
                renderTrackVertical({ style: trackVerticalStyle }),
                { key: 'trackVertical', ref: 'trackVertical' },
                cloneElement(
                    renderThumbVertical({ style: thumbVerticalStyleDefault }),
                    { ref: 'thumbVertical' }
                )
            )
        ]);
    }
}

Scrollbars.propTypes = {
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
    tagName: PropTypes.string,
    thumbSize: PropTypes.number,
    thumbMinSize: PropTypes.number,
    hideTracksWhenNotNeeded: PropTypes.bool,
    autoHide: PropTypes.bool,
    autoHideTimeout: PropTypes.number,
    autoHideDuration: PropTypes.number,
    autoHeight: PropTypes.bool,
    autoHeightMin: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    autoHeightMax: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    universal: PropTypes.bool,
    style: PropTypes.object,
    children: PropTypes.node,
};

Scrollbars.defaultProps = {
    renderView: renderViewDefault,
    renderTrackHorizontal: renderTrackHorizontalDefault,
    renderTrackVertical: renderTrackVerticalDefault,
    renderThumbHorizontal: renderThumbHorizontalDefault,
    renderThumbVertical: renderThumbVerticalDefault,
    tagName: 'div',
    thumbMinSize: 30,
    hideTracksWhenNotNeeded: false,
    autoHide: false,
    autoHideTimeout: 1000,
    autoHideDuration: 200,
    autoHeight: false,
    autoHeightMin: 0,
    autoHeightMax: 200,
    universal: false,
};
