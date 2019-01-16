import css from 'dom-css';
let scrollbarWidth = false;

export const MOBILE_SCROLLBAR_WIDTH = 12;

const getScrollbarWidth = (forceMobile) => {
    if (scrollbarWidth !== false) return scrollbarWidth || (forceMobile ? MOBILE_SCROLLBAR_WIDTH : 0);
    /* istanbul ignore else */
    if (typeof document !== 'undefined') {
        const div = document.createElement('div');
        css(div, {
            width: 100,
            height: 100,
            position: 'absolute',
            top: -9999,
            overflow: 'scroll',
            MsOverflowStyle: 'scrollbar'
        });
        document.body.appendChild(div);
        scrollbarWidth = (div.offsetWidth - div.clientWidth);
        document.body.removeChild(div);
    } else {
        scrollbarWidth = 0;
    }

    return scrollbarWidth || (forceMobile ? MOBILE_SCROLLBAR_WIDTH : 0);
};

export const isForcedMobile = (forceMobile) => forceMobile && getScrollbarWidth();

export default getScrollbarWidth;
