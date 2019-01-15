const getScrollbarWidthModule = require('../src/utils/getScrollbarWidth');
const envScrollbarWidth = getScrollbarWidthModule.default();
import { MOBILE_SCROLLBAR_WIDTH } from '../src/utils/getScrollbarWidth';
import createTests from './Scrollbars';

describe('Scrollbars (mobile)', () => {
    const mobileScrollbarsWidth = 0;
    let getScrollbarWidthSpy;

    before(() => {
        getScrollbarWidthSpy = spyOn(getScrollbarWidthModule, 'default');
        getScrollbarWidthSpy.andCall(forceMobile => (forceMobile ? MOBILE_SCROLLBAR_WIDTH : mobileScrollbarsWidth));
    });

    after(() => {
        getScrollbarWidthSpy.restore();
    });

    createTests(mobileScrollbarsWidth, envScrollbarWidth);
});
