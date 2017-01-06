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

export default function createTests(scrollbarSize, scrollbarWidth) {
    rendering(scrollbarSize, scrollbarWidth);
    gettersSetters(scrollbarSize, scrollbarWidth);
    scrolling(scrollbarSize, scrollbarWidth);
    resizing(scrollbarSize, scrollbarWidth);
    clickTrack(scrollbarSize, scrollbarWidth);
    dragThumb(scrollbarSize, scrollbarWidth);
    flexbox(scrollbarSize, scrollbarWidth);
    autoHide(scrollbarSize, scrollbarWidth);
    autoHeight(scrollbarSize, scrollbarWidth);
    hideTracks(scrollbarSize, scrollbarWidth);
    universal(scrollbarSize, scrollbarWidth);
    onUpdate(scrollbarSize, scrollbarWidth);
}
