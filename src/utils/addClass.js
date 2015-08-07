export default function addClass(el, classNames) {
    if (el.classList) {
        return classNames.forEach(cl => {
            el.classList.add(cl);
        });
    }
    el.className += ' ' + classNames.join(' ');
}
