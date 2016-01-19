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
        const sequence = [];
        const stick = [];
        const unstick = [];

        // Run through title items, collect uids and
        // determine if an item gets sticked or unsticked
        for (const uid in itemsByUid) {
            if (!itemsByUid.hasOwnProperty(uid)) continue;
            sequence.push(uid);
            const values = valuesByUid[uid];
            const { top } = values;
            // This item will get sticked
            if (scrollTop > top) stick.push(uid);
            // This item will get unsticked
            else unstick.push(uid);
        }

        // Make sure that the collected uids are in the correct order
        // Sorts sequence by top value (ASC)
        sequence.sort((auid, buid) => {
            const avalues = valuesByUid[auid];
            const bvalues = valuesByUid[buid];
            const { top: atop } = avalues;
            const { top: btop } = bvalues;
            return atop - btop;
        });

        // Run through items that will get sticked
        stick.forEach(uid => {
            let translateY = 0;
            const values = valuesByUid[uid];
            const { height } = values;
            const idx = sequence.indexOf(uid);

            const ancestorUid = sequence[idx + 1];
            // If there's an ancestor item, check if we need to
            // move the current item out of the viewport to
            // make way for the ancestor
            if (ancestorUid) {
                const ancestorValues = valuesByUid[ancestorUid];
                const { top: ancestorTop } = ancestorValues;
                // This is the value determines how far the ancestor would
                // overlay the current item
                const diff = ancestorTop - scrollTop - height;
                // If its lower than 0, the ancestor overlays the current item
                if (diff < 0) {
                    // Move item out of the viewport
                    if (Math.abs(diff) < height) translateY = diff;
                    // Item is out of viewport, just let it there
                    else translateY = -height;
                }
            }

            // The container functions as placeholder,
            // so we need to make sure it has the title's height,
            // when the title is absolute positioned
            containerStylesByUid[uid] = { height };

            titleStylesByUid[uid] = {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                transform: `translateY(${translateY}px)`
            };
        });

        unstick.forEach(uid => {
            titleStylesByUid[uid] = {
                position: '',
                top: '',
                left: '',
                right: '',
                transform: 'translateY(0px)'
            };
        });

        // Apply styles
        for (const uid in itemsByUid) {
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
