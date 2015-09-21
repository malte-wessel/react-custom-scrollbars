let stylesheetAdded = false;

export default function addStyleSheet(styles) {
    if (stylesheetAdded) return;
    stylesheetAdded = true;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles;
    document.body.appendChild(style);
}
