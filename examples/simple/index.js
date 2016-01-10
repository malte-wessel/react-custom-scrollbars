import './sass/app.scss';
import React from 'react';
import { render } from 'react-dom';

import DefaultScrollbarsApp from './components/DefaultScrollbars/App';
import ColoredScrollbarsApp from './components/ColoredScrollbars/App';

render(<DefaultScrollbarsApp />, document.getElementById('default-scrollbars-root'));
render(<ColoredScrollbarsApp />, document.getElementById('colored-scrollbars-root'));
