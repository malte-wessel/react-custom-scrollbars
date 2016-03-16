import rendering from './rendering';
import gettersSetters from './gettersSetters';
import scrolling from './scrolling';
import resizing from './resizing';
import clickTrack from './clickTrack';
import dragThumb from './dragThumb';
import flexbox from './flexbox';
import autoHide from './autoHide';
import universal from './universal';
import onUpdate from './onUpdate';

export default function createTests(scrollbarWidth, envScrollbarWidth) {
    rendering(scrollbarWidth, envScrollbarWidth);
    gettersSetters(scrollbarWidth, envScrollbarWidth);
    scrolling(scrollbarWidth, envScrollbarWidth);
    resizing(scrollbarWidth, envScrollbarWidth);
    clickTrack(scrollbarWidth, envScrollbarWidth);
    dragThumb(scrollbarWidth, envScrollbarWidth);
    flexbox(scrollbarWidth, envScrollbarWidth);
    autoHide(scrollbarWidth, envScrollbarWidth);
    universal(scrollbarWidth, envScrollbarWidth);
    onUpdate(scrollbarWidth, envScrollbarWidth);
}
