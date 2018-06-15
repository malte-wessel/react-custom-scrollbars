import { actualScrollbarWidth } from './getScrollbarWidth';

let isScrollBarAlwaysShow;

export default function scrollBarAlwaysShow() {
    if (isScrollBarAlwaysShow === undefined) {
        isScrollBarAlwaysShow = !!actualScrollbarWidth();
    }
    return isScrollBarAlwaysShow;
}
