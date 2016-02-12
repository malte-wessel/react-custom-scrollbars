export default function getInnerWidth(el) {
    const { clientWidth } = el;
    const { paddingLeft, paddingRight } = getComputedStyle(el);
    return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
}
