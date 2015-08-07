export default function getScrollbarWidth(className) {
    const div = document.createElement('div');
    div.className = className;
    document.body.appendChild(div);
    const scrollbarWidth = (div.offsetWidth - div.clientWidth);
    document.body.removeChild(div);
    return scrollbarWidth;
}
