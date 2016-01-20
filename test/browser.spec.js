import getScrollbarWidth from '../src/utils/getScrollbarWidth';
import createTests from './createTests';

describe('Browser', () => {
    createTests(getScrollbarWidth(), getScrollbarWidth());
});
