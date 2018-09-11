import { getActualScrollbarWidth } from './getScrollbarWidth';

let isScrollbarAlwaysShow;

export default function scrollbarAlwaysShow() {
    if (isScrollbarAlwaysShow === undefined) {
        isScrollbarAlwaysShow = !!getActualScrollbarWidth();
    }
    return isScrollbarAlwaysShow;
}
