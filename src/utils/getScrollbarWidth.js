import css from 'dom-css';
let scrollbarWidth = false;

export function actualBarWidth() {
  let result = 0
  /* istanbul ignore else */
  if (typeof document !== 'undefined') {
    const div = document.createElement('div');
    css(div, {
      width: 100,
      height: 100,
      position: 'absolute',
      top: -9999,
      overflow: 'scroll',
      MsOverflowStyle: 'scrollbar'
    });
    document.body.appendChild(div);
    result = (div.offsetWidth - div.clientWidth);
    document.body.removeChild(div);
  }
  return result
}

export default function getScrollbarWidth() {
  if (scrollbarWidth !== false)
    return scrollbarWidth;
  return scrollbarWidth = actualBarWidth() || 20
}
