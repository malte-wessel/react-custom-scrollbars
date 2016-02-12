const getScrollbarWidthModule = require('../src/utils/getScrollbarWidth');
const envScrollbarWidth = getScrollbarWidthModule.default();
import createTests from './Scrollbars';

describe('Scrollbars (mobile)', () => {
    const mobileScrollbarsWidth = 0;
    let getScrollbarWidthSpy;

    before(() => {
        getScrollbarWidthSpy = spyOn(getScrollbarWidthModule, 'default');
        getScrollbarWidthSpy.andReturn(mobileScrollbarsWidth);
    });

    after(() => {
        getScrollbarWidthSpy.restore();
    });

    createTests(mobileScrollbarsWidth, envScrollbarWidth);
});
