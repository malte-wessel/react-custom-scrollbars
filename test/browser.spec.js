import getScrollbarWidth from '../src/utils/getScrollbarWidth';
import createTests from './Scrollbars';

describe('Scrollbars (browser)', () => {
    createTests(getScrollbarWidth(), getScrollbarWidth());
});
