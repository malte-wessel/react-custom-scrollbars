import css from 'dom-css';
let direction = false;

export default function getDirection() {
    if (direction !== false) return direction;
    /* istanbul ignore else */
    if (typeof document !== 'undefined') {
        const div = document.createElement('div');
        css(div, {display: 'none'});
        document.body.appendChild(div);
        ({ direction } = getComputedStyle(div));
        document.body.removeChild(div);
    } else{
        direction = 'ltr';
    }
    return direction;
}

export function isRtl(){
    return getDirection() === 'rtl';
}