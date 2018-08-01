import { actualScrollbarWidth } from './getScrollbarWidth';

let isScrollbarAlwaysShow;

export default function scrollbarAlwaysShow() {
    if (isScrollbarAlwaysShow === undefined) {
        isScrollbarAlwaysShow = !!actualScrollbarWidth();
    }
    return isScrollbarAlwaysShow;
}
