import css from 'dom-css';
let scrollbarWidth = false;

export default function getScrollbarWidth() {
    if (scrollbarWidth !== false) return scrollbarWidth;
    /* istanbul ignore else */
    if (typeof document !== 'undefined') {
        const scrollDiv = document.createElement('div');
        css(scrollDiv, {
            overflow: 'scroll',
            MsOverflowStyle: 'scrollbar'
        });
        scrollDiv.className = 'react-custom-scrollbars-webkit-force-show-scrollbars';

        const div = document.createElement('div');
        css(div, {
            width: 100,
            height: 100,
            position: 'absolute',
            top: -9999
        });
        div.innerHTML += '<style>.react-custom-scrollbars-webkit-force-show-scrollbars::-webkit-scrollbar { visibility:visible; opacity:1; }</style>';
        div.appendChild(scrollDiv);

        document.body.appendChild(div);
        scrollbarWidth = (scrollDiv.offsetWidth - scrollDiv.clientWidth);
        document.body.removeChild(div);
    } else {
        scrollbarWidth = 0;
    }
    return scrollbarWidth || 0;
}
