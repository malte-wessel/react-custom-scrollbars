import raf from 'raf';
import css from 'dom-css';
import React, { createClass, PropTypes, cloneElement } from 'react';
import getScrollbarWidth from './utils/getScrollbarWidth';
import returnFalse from './utils/returnFalse';

import {
    thumbHorizontalStyle,
    thumbVerticalStyle,
    viewStyleScrollbarsInvisible,
    scrollbarHorizontalStyle,
    scrollbarVerticalStyle,
    disableSelectStyle,
    resetDisableSelectStyle
} from './styles';

import {
    getDefaultScrollbarHorizontal,
    getDefaultScrollbarVertical,
    getDefaultThumbHorizontal,
    getDefaultThumbVertical,
    getDefaultView
} from './elementGetters';

export default createClass({

    displayName: 'Scrollbars',

    propTypes: {
        onScroll: PropTypes.func,
        scrollbarHorizontal: PropTypes.func,
        scrollbarVertical: PropTypes.func,
        thumbHorizontal: PropTypes.func,
        thumbVertical: PropTypes.func,
        view: PropTypes.func,
        style: PropTypes.object,
        children: PropTypes.node,
    },

    getDefaultProps() {
        return {
            scrollbarHorizontal: getDefaultScrollbarHorizontal,
            scrollbarVertical: getDefaultScrollbarVertical,
            thumbHorizontal: getDefaultThumbHorizontal,
            thumbVertical: getDefaultThumbVertical,
            view: getDefaultView
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

    getThumbHorizontalStyle(x, widthPercentageInner) {
        return {
            width: (widthPercentageInner < 100) ? (widthPercentageInner + '%') : 0,
            transform: 'translateX(' + x + '%)'
        };
    },

    getThumbVerticalStyle(y, heightPercentageInner) {
        return {
            height: (heightPercentageInner < 100) ? (heightPercentageInner + '%') : 0,
            transform: 'translateY(' + y + '%)'
        };
    },

    getScrollbarHorizontalStyle(widthPercentageInner) {
        return {
            height: widthPercentageInner < 100 ? 6 : 0
        };
    },

    getScrollbarVerticalStyle(heightPercentageInner) {
        return {
            width: heightPercentageInner < 100 ? 6 : 0
        };
    },

    setThumbHorizontalStyle(style) {
        const { thumbHorizontal } = this.refs;
        css(thumbHorizontal, style);
    },

    setThumbVerticalStyle(style) {
        const { thumbVertical } = this.refs;
        css(thumbVertical, style);
    },

    setScrollbarHorizontalStyle(style) {
        const { barHorizontal } = this.refs;
        css(barHorizontal, style);
    },

    setScrollbarVerticalStyle(style) {
        const { barVertical } = this.refs;
        css(barVertical, style);
    },

    raf(callback) {
        if (this.timer) raf.cancel(this.timer);
        this.timer = raf(() => {
            this.timer = undefined;
            callback();
        });
    },

    update() {
        if (getScrollbarWidth() === 0) return;
        this.raf(() => {
            const {
                widthPercentageInner,
                heightPercentageInner
            } = this.getInnerSizePercentage();

            const { x, y } = this.getPosition();

            this.setScrollbarHorizontalStyle(
                this.getScrollbarHorizontalStyle(widthPercentageInner)
            );
            this.setScrollbarVerticalStyle(
                this.getScrollbarVerticalStyle(heightPercentageInner)
            );
            this.setThumbHorizontalStyle(
                this.getThumbHorizontalStyle(x, widthPercentageInner)
            );
            this.setThumbVerticalStyle(
                this.getThumbVerticalStyle(y, heightPercentageInner)
            );
        });
    },

    handleScroll(event) {
        const { onScroll } = this.props;
        this.raf(() => {
            const { x, y, ...values } = this.getPosition();
            const {
                widthPercentageInner,
                heightPercentageInner
            } = this.getInnerSizePercentage();

            if (onScroll) onScroll(event, values);

            this.setThumbHorizontalStyle(
                this.getThumbHorizontalStyle(x, widthPercentageInner)
            );
            this.setThumbVerticalStyle(
                this.getThumbVerticalStyle(y, heightPercentageInner)
            );
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
        this.dragStart(event);
        const { currentTarget, clientY } = event;
        this.prevPageY = (currentTarget.offsetHeight - (clientY - currentTarget.getBoundingClientRect().top));
    },

    handleHorizontalThumbMouseDown(event) {
        this.dragStart(event);
        const { currentTarget, clientX } = event;
        this.prevPageX = (currentTarget.offsetWidth - (clientX - currentTarget.getBoundingClientRect().left));
    },

    handleDocumentMouseUp() {
        this.dragEnd();
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

    dragStart(event) {
        if (!document) return;
        event.stopImmediatePropagation();
        this.cursorDown = true;
        css(document.body, disableSelectStyle);
        document.addEventListener('mousemove', this.handleDocumentMouseMove);
        document.onselectstart = returnFalse;
    },

    dragEnd() {
        if (!document) return;
        this.cursorDown = false;
        this.prevPageX = this.prevPageY = 0;
        css(document.body, resetDisableSelectStyle);
        document.removeEventListener('mousemove', this.handleDocumentMouseMove);
        document.onselectstart = undefined;
    },

    scrollTop(top = 0) {
        const { view } = this.refs;
        view.scrollTop = top;
        this.update();
    },

    scrollToTop() {
        const { view } = this.refs;
        view.scrollTop = 0;
        this.update();
    },

    scrollToBottom() {
        const { view } = this.refs;
        view.scrollTop = view.scrollHeight;
        this.update();
    },

    scrollLeft(left = 0) {
        const { view } = this.refs;
        view.scrollLeft = left;
        this.update();
    },

    scrollToLeft() {
        const { view } = this.refs;
        view.scrollLeft = 0;
        this.update();
    },

    scrollToRight() {
        const { view } = this.refs;
        view.scrollLeft = view.scrollWidth;
        this.update();
    },

    addListeners() {
        this.refs.view.addEventListener('scroll', this.handleScroll);
        this.refs.barVertical.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
        this.refs.barHorizontal.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
        this.refs.thumbVertical.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
        this.refs.thumbHorizontal.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
        if (document) document.addEventListener('mouseup', this.handleDocumentMouseUp);
        if (window) window.addEventListener('resize', this.handleWindowResize);
    },

    removeListeners() {
        this.refs.view.removeEventListener('scroll', this.handleScroll);
        this.refs.barVertical.removeEventListener('mousedown', this.handleVerticalTrackMouseDown);
        this.refs.barHorizontal.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
        this.refs.thumbVertical.removeEventListener('mousedown', this.handleVerticalThumbMouseDown);
        this.refs.thumbHorizontal.removeEventListener('mousedown', this.handleHorizontalThumbMouseDown);
        if (document) document.removeEventListener('mouseup', this.handleDocumentMouseUp);
        if (window) window.removeEventListener('resize', this.handleWindowResize);
    },

    render() {
        const scrollbarWidth = getScrollbarWidth();
        const {
            style,
            scrollbarHorizontal,
            scrollbarVertical,
            thumbHorizontal,
            thumbVertical,
            view,
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
                position: 'absolute',
                top: 0,
                left: 0,
                right: -scrollbarWidth,
                bottom: -scrollbarWidth,
                overflow: 'scroll',
                WebkitOverflowScrolling: 'touch'
            }
            : viewStyleScrollbarsInvisible;

        return (
            <div {...props} style={containerStyle}>
                {cloneElement(
                    view({ style: viewStyle }),
                    { ref: 'view' },
                    children
                )}
                {cloneElement(
                    scrollbarHorizontal({ style: scrollbarHorizontalStyle }),
                    { ref: 'barHorizontal' },
                    cloneElement(
                        thumbHorizontal({ style: thumbHorizontalStyle }),
                        { ref: 'thumbHorizontal' }
                    )
                )}
                {cloneElement(
                    scrollbarVertical({ style: scrollbarVerticalStyle }),
                    { ref: 'barVertical' },
                    cloneElement(
                        thumbVertical({ style: thumbVerticalStyle }),
                        { ref: 'thumbVertical' }
                    )
                )}
            </div>
        );
    }
});
