import css from 'dom-css';
import React, { createClass, PropTypes, cloneElement } from 'react';
import getScrollbarWidth from './utils/getScrollbarWidth';
import returnFalse from './utils/returnFalse';

function getDefaultScrollbarHorizontal({ style, ...props }) {
    const finalStyle = {
        ...style,
        right: 2,
        bottom: 2,
        left: 2,
        borderRadius: 3
    };
    return <div style={finalStyle} {...props} />;
}

function getDefaultScrollbarVertical({ style, ...props }) {
    const finalStyle = {
        ...style,
        right: 2,
        bottom: 2,
        top: 2,
        borderRadius: 3
    };
    return <div style={finalStyle} {...props} />;
}

function getDefaultThumbHorizontal({ style, ...props }) {
    const finalStyle = {
        ...style,
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)'
    };
    return <div style={finalStyle} {...props} />;
}

function getDefaultThumbVertical({ style, ...props }) {
    const finalStyle = {
        ...style,
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)'
    };
    return <div style={finalStyle} {...props} />;
}

function getDefaultView({ style, ...props }) {
    const finalStyle = {...style};
    return <div style={finalStyle} {...props} />;
}

export default createClass({

    displayName: 'Scrollbars',

    propTypes: {
        scrollbarHorizontal: PropTypes.func,
        scrollbarVertical: PropTypes.func,
        thumbHorizontal: PropTypes.func,
        thumbVertical: PropTypes.func,
        view: PropTypes.func,
        onScroll: PropTypes.func
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

    componentWillMount() {
        this.needsUpdate = true;
    },

    getInitialState() {
        return {
            x: 0,
            y: 0,
            width: '100%',
            height: '100%',
            heightPercentageInner: 100,
            widthPercentageInner: 100
        };
    },

    componentDidMount() {
        this.addListeners();
        this.update();
    },

    componentWillReceiveProps() {
        this.needsUpdate = true;
    },

    componentDidUpdate() {
        this.update();
    },

    componentWillUnmount() {
        this.removeListeners();
    },

    addListeners() {
        this.refs.view.addEventListener('scroll', this.handleScroll);
        this.refs.barVertical.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
        this.refs.barHorizontal.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
        this.refs.thumbVertical.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
        this.refs.thumbHorizontal.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
        document.addEventListener('mouseup', this.handleDocumentMouseUp);
        window.addEventListener('resize', this.handleWindowResize);
    },

    removeListeners() {
        this.refs.view.removeEventListener('scroll', this.handleScroll);
        this.refs.barVertical.removeEventListener('mousedown', this.handleVerticalTrackMouseDown);
        this.refs.barHorizontal.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
        this.refs.thumbVertical.removeEventListener('mousedown', this.handleVerticalThumbMouseDown);
        this.refs.thumbHorizontal.removeEventListener('mousedown', this.handleHorizontalThumbMouseDown);
        document.removeEventListener('mouseup', this.handleDocumentMouseUp);
        window.removeEventListener('resize', this.handleWindowResize);
    },

    getPosition($view = this.refs.view) {
        const scrollTop = $view.scrollTop;
        const scrollLeft = $view.scrollLeft;
        const scrollHeight = $view.scrollHeight;
        const scrollWidth = $view.scrollWidth;
        const clientHeight = $view.clientHeight;
        const clientWidth = $view.clientWidth;
        const y = (scrollTop * 100) / clientHeight;
        const x = (scrollLeft * 100) / clientWidth;
        return {
            x, y,
            scrollLeft, scrollTop,
            scrollWidth, scrollHeight,
            clientWidth, clientHeight,
            left: (scrollLeft / (scrollWidth - clientWidth)) || 0,
            top: (scrollTop / (scrollHeight - clientHeight)) || 0
        };
    },

    getInnerSizePercentage($view = this.refs.view) {
        return {
            widthPercentageInner: $view.clientWidth * 100 / $view.scrollWidth,
            heightPercentageInner: $view.clientHeight * 100 / $view.scrollHeight
        };
    },

    scrollTop(top = 0) {
        const $view = this.refs.view;
        $view.scrollTop = top;
        this.needsUpdate = true;
        this.update();
    },

    scrollToTop() {
        const $view = this.refs.view;
        $view.scrollTop = 0;
        this.needsUpdate = true;
        this.update();
    },

    scrollToBottom() {
        const $view = this.refs.view;
        $view.scrollTop = $view.scrollHeight;
        this.needsUpdate = true;
        this.update();
    },

    scrollLeft(left = 0) {
        const $view = this.refs.view;
        $view.scrollLeft = left;
        this.needsUpdate = true;
        this.update();
    },

    scrollToLeft() {
        const $view = this.refs.view;
        $view.scrollLeft = 0;
        this.needsUpdate = true;
        this.update();
    },

    scrollToRight() {
        const $view = this.refs.view;
        $view.scrollLeft = $view.scrollWidth;
        this.needsUpdate = true;
        this.update();
    },

    update() {
        if (getScrollbarWidth() === 0) return;
        if (!this.needsUpdate) return;

        const sizeInnerPercentage = this.getInnerSizePercentage();
        const { x, y } = this.getPosition();
        this.needsUpdate = false;
        this.setState({
            ...sizeInnerPercentage,
            x, y
        });
    },

    handleScroll(event) {
        const position = this.getPosition();
        const { x, y, ...values } = position;
        const { onScroll } = this.props;
        if (onScroll) onScroll(event, values);
        this.setState({x, y});
    },

    handleVerticalTrackMouseDown(event) {
        const $thumb = this.refs.thumbVertical;
        const $bar = this.refs.barVertical;
        const $view = this.refs.view;
        const offset = Math.abs(event.target.getBoundingClientRect().top - event.clientY);
        const thumbHalf = $thumb.offsetHeight / 2;
        const thumbPositionPercentage = (offset - thumbHalf) * 100 / $bar.offsetHeight;
        $view.scrollTop = thumbPositionPercentage * $view.scrollHeight / 100;
    },

    handleHorizontalTrackMouseDown() {
        const $thumb = this.refs.thumbHorizontal;
        const $bar = this.refs.barHorizontal;
        const $view = this.refs.view;
        const offset = Math.abs(event.target.getBoundingClientRect().left - event.clientX);
        const thumbHalf = $thumb.offsetWidth / 2;
        const thumbPositionPercentage = (offset - thumbHalf) * 100 / $bar.offsetWidth;
        $view.scrollLeft = thumbPositionPercentage * $view.scrollWidth / 100;
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
        if (this.cursorDown === false) return void 0;

        if (this.prevPageY) {
            const $bar = this.refs.barVertical;
            const $thumb = this.refs.thumbVertical;
            const $view = this.refs.view;
            const offset = ($bar.getBoundingClientRect().top - event.clientY) * -1;
            const thumbClickPosition = ($thumb.offsetHeight - this.prevPageY);
            const thumbPositionPercentage = (offset - thumbClickPosition) * 100 / $bar.offsetHeight;
            $view.scrollTop = thumbPositionPercentage * $view.scrollHeight / 100;
            return void 0;
        }

        if (this.prevPageX) {
            const $bar = this.refs.barHorizontal;
            const $thumb = this.refs.thumbHorizontal;
            const $view = this.refs.view;
            const offset = ($bar.getBoundingClientRect().left - event.clientX) * -1;
            const thumbClickPosition = ($thumb.offsetWidth - this.prevPageX);
            const thumbPositionPercentage = (offset - thumbClickPosition) * 100 / $bar.offsetWidth;
            $view.scrollLeft = thumbPositionPercentage * $view.scrollWidth / 100;
            return void 0;
        }
    },

    handleWindowResize() {
        this.needsUpdate = true;
        this.update();
    },

    dragStart(event) {
        event.stopImmediatePropagation();
        this.cursorDown = true;
        css(document.body, {
            '-webkit-touch-callout': 'none',
            '-webkit-user-select': 'none',
            '-khtml-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none'
        });
        document.addEventListener('mousemove', this.handleDocumentMouseMove);
        document.onselectstart = returnFalse;
    },

    dragEnd() {
        this.cursorDown = false;
        this.prevPageX = this.prevPageY = 0;
        css(document.body, {
            '-webkit-touch-callout': '',
            '-webkit-user-select': '',
            '-khtml-user-select': '',
            '-moz-user-select': '',
            '-ms-user-select': '',
            'user-select': ''
        });
        document.removeEventListener('mousemove', this.handleDocumentMouseMove);
        document.onselectstart = null;
    },

    render() {
        const scrollbarWidth = getScrollbarWidth();

        const {
            x, y,
            widthPercentageInner,
            heightPercentageInner
        } = this.state;

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

        const thumbTranslateX = 'translateX(' + x + '%)';
        const thumbTranslateY = 'translateY(' + y + '%)';

        const containerStyle = {
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            ...style
        };

        const thumbStyle = {
            position: 'relative',
            display: 'block'
        };

        const thumbHorizontalStyle = {
            ...thumbStyle,
            height: '100%',
            width: (widthPercentageInner < 100) ? (widthPercentageInner + '%') : 0,
            MsTransform: thumbTranslateX,
            WebkitTransform: thumbTranslateX,
            transform: thumbTranslateX
        };

        const thumbVerticalStyle = {
            ...thumbStyle,
            width: '100%',
            height: (heightPercentageInner < 100) ? (heightPercentageInner + '%') : 0,
            MsTransform: thumbTranslateY,
            WebkitTransform: thumbTranslateY,
            transform: thumbTranslateY
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
            : {
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'scroll',
                WebkitOverflowScrolling: 'touch'
            };

        const scrollbarStyle = {
            position: 'absolute',
            zIndex: 1
        };

        const scrollbarHorizontalStyle = {
            ...scrollbarStyle,
            height: widthPercentageInner < 100 ? 6 : 0
        };

        const scrollbarVerticalStyle = {
            ...scrollbarStyle,
            width: heightPercentageInner < 100 ? 6 : 0
        };

        return (
            <div {...props} style={containerStyle}>
                {
                    cloneElement(
                        scrollbarHorizontal({ style: scrollbarHorizontalStyle }),
                        { ref: 'barHorizontal' },
                        cloneElement(
                            thumbHorizontal({ style: thumbHorizontalStyle }),
                            { ref: 'thumbHorizontal' }
                        )
                    )
                }
                {
                    cloneElement(
                        scrollbarVertical({ style: scrollbarVerticalStyle }),
                        { ref: 'barVertical' },
                        cloneElement(
                            thumbVertical({ style: thumbVerticalStyle }),
                            { ref: 'thumbVertical' }
                        )
                    )
                }
                {
                    cloneElement(
                        view({ style: viewStyle }),
                        { ref: 'view' },
                        children
                    )
                }
            </div>
        );
    }
});
