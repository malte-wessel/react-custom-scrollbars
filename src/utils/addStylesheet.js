export default function addStyleSheet(styles) {
    if (document.getElementById('react-scroller-styles')) return;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'react-scroller-styles';
    style.innerHTML = styles;
    document.body.appendChild(style);
}
