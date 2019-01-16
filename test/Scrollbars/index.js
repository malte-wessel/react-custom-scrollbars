import rendering from './rendering';
import gettersSetters from './gettersSetters';
import scrolling from './scrolling';
import resizing from './resizing';
import clickTrack from './clickTrack';
import dragThumb from './dragThumb';
import flexbox from './flexbox';
import autoHide from './autoHide';
import autoHeight from './autoHeight';
import hideTracks from './hideTracks';
import universal from './universal';
import mobile from './mobile';
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
    autoHeight(scrollbarWidth, envScrollbarWidth);
    hideTracks(scrollbarWidth, envScrollbarWidth);
    universal(scrollbarWidth, envScrollbarWidth);
    mobile(scrollbarWidth, envScrollbarWidth);
    onUpdate(scrollbarWidth, envScrollbarWidth);
}
