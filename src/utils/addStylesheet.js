export default function addStyleSheet(styles) {
    if (document.getElementById('react-custom-scrollbars-styles')) return;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'react-custom-scrollbars-styles';
    style.innerHTML = styles;
    document.body.appendChild(style);
}
