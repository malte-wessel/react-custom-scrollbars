import './sass/app.scss';
import React from 'react';
import { render } from 'react-dom';

import DefaultScrollbarsApp from './components/DefaultScrollbars/App';
import ColoredScrollbarsApp from './components/ColoredScrollbars/App';
import SpringScrollbarsApp from './components/SpringScrollbars/App';
import ShadowScrollbarsApp from './components/ShadowScrollbars/App';
import HorizontalScrollbarsApp from './components/HorizontalScrollbars/App';
import BothScrollbarsApp from './components/BothScrollbars/App';

render(<DefaultScrollbarsApp />, document.getElementById('default-scrollbars-root'));
render(<ColoredScrollbarsApp />, document.getElementById('colored-scrollbars-root'));
render(<SpringScrollbarsApp />, document.getElementById('spring-scrollbars-root'));
render(<ShadowScrollbarsApp />, document.getElementById('shadow-scrollbars-root'));
render(<HorizontalScrollbarsApp />, document.getElementById('horizontal-scrollbars-root'));
render(<BothScrollbarsApp />, document.getElementById('both-scrollbars-root'));
