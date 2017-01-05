import getScrollbarWidth from '../src/utils/getScrollbarWidth';
import createTests from './Scrollbars';
import { scrollbarSize } from '../src/Scrollbars/styles';

describe('Scrollbars (browser)', () => {
    createTests(scrollbarSize, getScrollbarWidth());
});
