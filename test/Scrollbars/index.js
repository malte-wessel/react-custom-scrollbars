import rendering from './rendering';
import gettersSetters from './gettersSetters';
import scrolling from './scrolling';
import resizing from './resizing';
import clickTrack from './clickTrack';
import dragThumb from './dragThumb';
import flexbox from './flexbox';

export default function Scrollbars(scrollbarWidth, envScrollbarWidth) {
    describe('Scrollbars', () => {
        rendering(scrollbarWidth, envScrollbarWidth);
        gettersSetters(scrollbarWidth, envScrollbarWidth);
        scrolling(scrollbarWidth, envScrollbarWidth);
        resizing(scrollbarWidth, envScrollbarWidth);
        clickTrack(scrollbarWidth, envScrollbarWidth);
        dragThumb(scrollbarWidth, envScrollbarWidth);
        flexbox(scrollbarWidth, envScrollbarWidth);
    });
}
