import { actualScrollbarWidth } from './getScrollbarWidth';

export default function scrollBarAlwaysShow() {
    return !!actualScrollbarWidth();
}
