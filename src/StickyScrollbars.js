import css from 'dom-css';
import getScrollbarWidth from './utils/getScrollbarWidth';
import Scrollbars from './Scrollbars';
import React, { createClass, PropTypes } from 'react';
import scrollbarsShape from './scrollbarsShape';

const scrollbarWidth = getScrollbarWidth();

export default createClass({

    displayName: 'StickyScrollbars',

    propTypes: {
        onScroll: PropTypes.func
    },

    childContextTypes: {
        scrollbars: scrollbarsShape
    },

    getChildContext() {
        return {
            scrollbars: {
                register: this.register,
                unregister: this.register
            }
        };
    },

    componentWillMount() {
        this.itemsByUid = {};
        this.valuesByUid = {};
    },

    componentDidMount() {
        this.collectValues();
        window.addEventListener('resize', this.handleWindowResize);
    },

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    },

    register(uid, item) {
        this.itemsByUid[uid] = item;
    },

    unregister(uid) {
        this.itemsByUid[uid] = undefined;
    },

    collectValues() {
        const { itemsByUid } = this;
        const values = {};
        for (const uid in itemsByUid) {
            if (!itemsByUid.hasOwnProperty(uid)) continue;
            const item = itemsByUid[uid];
            const { container, title } = item;
            // Height from title
            const { clientHeight } = title;
            // Offset top from container
            const { offsetTop } = container;
            values[uid] = { height: clientHeight, top: offsetTop };
        }
        this.valuesByUid = values;
    },

    handleScroll(event, values) {
        const { onScroll } = this.props;
        if (onScroll) onScroll(event, values);
        this.update();
    },

    handleWindowResize() {
        this.collectValues();
        this.update();
    },

    update() {
        const { valuesByUid, itemsByUid } = this;
        const { scrollbars } = this.refs;
        const scrollTop = scrollbars.getScrollTop();
        const titleStylesByUid = {};
        const containerStylesByUid = {};

        for (const uid in itemsByUid) {
            if (!itemsByUid.hasOwnProperty(uid)) continue;
            const values = valuesByUid[uid];
            const { top, height } = values;
            containerStylesByUid[uid] = { height };

            if (scrollTop > top) {
                titleStylesByUid[uid] = {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0
                };
            } else {
                titleStylesByUid[uid] = {
                    position: '',
                    top: '',
                    left: '',
                    right: ''
                };
            }
        }

        for (const uid in titleStylesByUid) {
            if (!valuesByUid.hasOwnProperty(uid)) continue;
            const titleStyles = titleStylesByUid[uid];
            const containerStyles = containerStylesByUid[uid];
            const item = itemsByUid[uid];
            const { title, container } = item;
            css(title, titleStyles);
            css(container, containerStyles);
        }
    },

    renderView({ style, ...props}) {
        return (
            <div
                style={{
                    ...style,
                    position: 'static',
                    height: 'calc(100% + ' + scrollbarWidth + 'px)',
                    width: 'calc(100% + ' + scrollbarWidth + 'px)',
                    marginRight: -scrollbarWidth,
                    marginBottom: -scrollbarWidth,
                    top: 'auto',
                    left: 'auto',
                    right: 'auto',
                    bottom: 'auto'
                }}
                {...props}/>
        );
    },

    render() {
        return (
            <Scrollbars
                ref="scrollbars"
                {...this.props}
                renderView={this.renderView}
                onScroll={this.handleScroll}/>
        );
    }

});
