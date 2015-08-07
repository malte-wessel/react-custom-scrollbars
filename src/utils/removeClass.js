export default function removeClass(el, classNames) {
    if (el.classList) {
        return classNames.forEach(cl => {
            el.classList.remove(cl);
        });
    }
    el.className = el.className.replace(new RegExp('(^|\\b)' + classNames.join('|') + '(\\b|$)', 'gi'), ' ');
}
