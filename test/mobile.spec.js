import createTests from './createTests';
const getScrollbarWidthModule = require('../src/utils/getScrollbarWidth');
const envScrollbarWidth = getScrollbarWidthModule.default();

describe('Mobile', () => {
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
