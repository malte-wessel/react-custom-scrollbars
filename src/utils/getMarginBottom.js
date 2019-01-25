import getScrollbarWidth from './getScrollbarWidth';
import scrollbarAlwaysShow from './scrollbarAlwaysShow';

export function getMarginBottom(hasHorizontalScroll) {
    const scrollbarWidth = getScrollbarWidth();
    if (hasHorizontalScroll) {
        return -scrollbarWidth;
    } else {
        return scrollbarAlwaysShow()
            ? -scrollbarWidth
            : 0;
    }
}