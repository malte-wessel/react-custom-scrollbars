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
import onUpdate from './onUpdate';

export default function createTests(scrollbarWidth) {
    rendering(scrollbarWidth);
    gettersSetters(scrollbarWidth);
    scrolling(scrollbarWidth);
    resizing(scrollbarWidth);
    clickTrack(scrollbarWidth);
    dragThumb(scrollbarWidth);
    flexbox(scrollbarWidth);
    autoHide(scrollbarWidth);
    autoHeight(scrollbarWidth);
    hideTracks(scrollbarWidth);
    universal(scrollbarWidth);
    onUpdate(scrollbarWidth);
}
