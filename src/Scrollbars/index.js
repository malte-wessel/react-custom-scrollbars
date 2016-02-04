import raf from 'raf';
import css from 'dom-css';
import React, { createClass, PropTypes, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import getScrollbarWidth from '../utils/getScrollbarWidth';
import returnFalse from '../utils/returnFalse';

import {
    defaultThumbHorizontalStyle,
    defaultThumbVerticalStyle,
    defaultScrollbarHorizontalStyle,
    defaultScrollbarVerticalStyle,
    scrollbarsVisibleViewStyle,
    scrollbarsInvisibleViewStyle,
    disableSelectStyle,
    resetDisableSelectStyle
} from './styles';

import {
    defaultRenderScrollbarHorizontal,
    defaultRenderScrollbarVertical,
    defaultRenderThumbHorizontal,
    defaultRenderThumbVertical,
    defaultRenderView
} from './defaultRenderElements';

export default createClass({

    displayName: 'Scrollbars',

    propTypes: {
        onScroll: PropTypes.func,
        renderScrollbarHorizontal: PropTypes.func,
        renderScrollbarVertical: PropTypes.func,
        renderThumbHorizontal: PropTypes.func,
        renderThumbVertical: PropTypes.func,
        renderView: PropTypes.func,
        style: PropTypes.object,
        children: PropTypes.node,
    },

    getDefaultProps() {
        return {
            renderScrollbarHorizontal: defaultRenderScrollbarHorizontal,
            renderScrollbarVertical: defaultRenderScrollbarVertical,
            renderThumbHorizontal: defaultRenderThumbHorizontal,
            renderThumbVertical: defaultRenderThumbVertical,
            renderView: defaultRenderView
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
        if (this.timer) raf.cancel(this.timer);
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

    getPosition() {
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
            x: (scrollLeft * 100) / clientWidth,
            y: (scrollTop * 100) / clientHeight,
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

    getInnerSizePercentage() {
        const { view } = this.refs;
        return {
            widthPercentageInner: view.clientWidth * 100 / view.scrollWidth,
            heightPercentageInner: view.clientHeight * 100 / view.scrollHeight
        };
    },

    scrollTop(top = 0) {
        const { view } = this.refs;
        view.scrollTop = top;
    },

    scrollToTop() {
        const { view } = this.refs;
        view.scrollTop = 0;
    },

    scrollToBottom() {
        const { view } = this.refs;
        view.scrollTop = view.scrollHeight;
    },

    scrollLeft(left = 0) {
        const { view } = this.refs;
        view.scrollLeft = left;
    },

    scrollToLeft() {
        const { view } = this.refs;
        view.scrollLeft = 0;
    },

    scrollToRight() {
        const { view } = this.refs;
        view.scrollLeft = view.scrollWidth;
    },

    addListeners() {
        if (typeof document === 'undefined') return;
        this.refs.view.addEventListener('scroll', this.handleScroll);
        this.refs.barVertical.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
        this.refs.barHorizontal.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
        this.refs.thumbVertical.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
        this.refs.thumbHorizontal.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
        document.addEventListener('mouseup', this.handleDocumentMouseUp);
        window.addEventListener('resize', this.handleWindowResize);
    },

    removeListeners() {
        if (typeof document === 'undefined') return;
        this.refs.view.removeEventListener('scroll', this.handleScroll);
        this.refs.barVertical.removeEventListener('mousedown', this.handleVerticalTrackMouseDown);
        this.refs.barHorizontal.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
        this.refs.thumbVertical.removeEventListener('mousedown', this.handleVerticalThumbMouseDown);
        this.refs.thumbHorizontal.removeEventListener('mousedown', this.handleHorizontalThumbMouseDown);
        document.removeEventListener('mouseup', this.handleDocumentMouseUp);
        window.removeEventListener('resize', this.handleWindowResize);
    },

    handleScroll(event) {
        const { onScroll } = this.props;
        this.update(values => {
            if (!onScroll) return;
            onScroll(event, values);
        });
    },

    handleVerticalTrackMouseDown(event) {
        const { thumbVertical, barVertical, view } = this.refs;
        const offset = Math.abs(event.target.getBoundingClientRect().top - event.clientY);
        const thumbHalf = thumbVertical.offsetHeight / 2;
        const thumbPositionPercentage = (offset - thumbHalf) * 100 / barVertical.offsetHeight;
        view.scrollTop = thumbPositionPercentage * view.scrollHeight / 100;
    },

    handleHorizontalTrackMouseDown() {
        const { thumbHorizontal, barHorizontal, view } = this.refs;
        const offset = Math.abs(event.target.getBoundingClientRect().left - event.clientX);
        const thumbHalf = thumbHorizontal.offsetWidth / 2;
        const thumbPositionPercentage = (offset - thumbHalf) * 100 / barHorizontal.offsetWidth;
        view.scrollLeft = thumbPositionPercentage * view.scrollWidth / 100;
    },

    handleVerticalThumbMouseDown(event) {
        this.handleDragStart(event);
        const { currentTarget, clientY } = event;
        this.prevPageY = (currentTarget.offsetHeight - (clientY - currentTarget.getBoundingClientRect().top));
    },

    handleHorizontalThumbMouseDown(event) {
        this.handleDragStart(event);
        const { currentTarget, clientX } = event;
        this.prevPageX = (currentTarget.offsetWidth - (clientX - currentTarget.getBoundingClientRect().left));
    },

    handleDocumentMouseUp() {
        this.handleDragEnd();
    },

    handleDocumentMouseMove(event) {
        if (this.cursorDown === false) return false;
        if (this.prevPageY) {
            const { barVertical, thumbVertical, view } = this.refs;
            const offset = (barVertical.getBoundingClientRect().top - event.clientY) * -1;
            const thumbClickPosition = (thumbVertical.offsetHeight - this.prevPageY);
            const thumbPositionPercentage = (offset - thumbClickPosition) * 100 / barVertical.offsetHeight;
            view.scrollTop = thumbPositionPercentage * view.scrollHeight / 100;
            return false;
        }
        if (this.prevPageX) {
            const { barHorizontal, thumbHorizontal, view } = this.refs;
            const offset = (barHorizontal.getBoundingClientRect().left - event.clientX) * -1;
            const thumbClickPosition = (thumbHorizontal.offsetWidth - this.prevPageX);
            const thumbPositionPercentage = (offset - thumbClickPosition) * 100 / barHorizontal.offsetWidth;
            view.scrollLeft = thumbPositionPercentage * view.scrollWidth / 100;
            return false;
        }
    },

    handleWindowResize() {
        this.update();
    },

    handleDragStart(event) {
        if (!document) return;
        event.stopImmediatePropagation();
        this.cursorDown = true;
        css(document.body, disableSelectStyle);
        document.addEventListener('mousemove', this.handleDocumentMouseMove);
        document.onselectstart = returnFalse;
    },

    handleDragEnd() {
        if (!document) return;
        this.cursorDown = false;
        this.prevPageX = this.prevPageY = 0;
        css(document.body, resetDisableSelectStyle);
        document.removeEventListener('mousemove', this.handleDocumentMouseMove);
        document.onselectstart = undefined;
    },

    raf(callback) {
        if (this.timer) raf.cancel(this.timer);
        this.timer = raf(() => {
            this.timer = undefined;
            callback();
        });
    },

    update(callback) {
        const {
            thumbHorizontal,
            thumbVertical,
        } = this.refs;

        const {
            widthPercentageInner,
            heightPercentageInner
        } = this.getInnerSizePercentage();

        const { x, y, ...values } = this.getPosition();

        this.raf(() => {
            if (getScrollbarWidth() > 0) {
                const thumbHorizontalStyle = {
                    width: (widthPercentageInner < 100) ? (widthPercentageInner + '%') : 0,
                    transform: 'translateX(' + x + '%)'
                };
                const thumbVerticalStyle = {
                    height: (heightPercentageInner < 100) ? (heightPercentageInner + '%') : 0,
                    transform: 'translateY(' + y + '%)'
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
            renderScrollbarHorizontal,
            renderScrollbarVertical,
            renderThumbHorizontal,
            renderThumbVertical,
            renderView,
            onScroll,
            children,
            ...props
        } = this.props;

        const containerStyle = {
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            ...style
        };

        const viewStyle = scrollbarWidth > 0
            ? {
                ...scrollbarsVisibleViewStyle,
                right: -scrollbarWidth,
                bottom: -scrollbarWidth,
            }
            : scrollbarsInvisibleViewStyle;

        const finalScrollbarHorizontalStyle = scrollbarWidth > 0
            ? defaultScrollbarHorizontalStyle
            : { ...defaultScrollbarHorizontalStyle, display: 'none' };

        const finalScrollbarVerticalStyle = scrollbarWidth > 0
            ? defaultScrollbarVerticalStyle
            : { ...defaultScrollbarVerticalStyle, display: 'none' };

        return (
            <div {...props} style={containerStyle}>
                {cloneElement(
                    renderView({ style: viewStyle }),
                    { ref: 'view' },
                    children
                )}
                {cloneElement(
                    renderScrollbarHorizontal({ style: finalScrollbarHorizontalStyle }),
                    { ref: 'barHorizontal' },
                    cloneElement(
                        renderThumbHorizontal({ style: defaultThumbHorizontalStyle }),
                        { ref: 'thumbHorizontal' }
                    )
                )}
                {cloneElement(
                    renderScrollbarVertical({ style: finalScrollbarVerticalStyle }),
                    { ref: 'barVertical' },
                    cloneElement(
                        renderThumbVertical({ style: defaultThumbVerticalStyle }),
                        { ref: 'thumbVertical' }
                    )
                )}
            </div>
        );
    }
});
