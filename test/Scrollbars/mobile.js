import { Scrollbars } from 'react-custom-scrollbars';
import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import { MOBILE_SCROLLBAR_WIDTH as scrollbarWidth } from '../../src/utils/getScrollbarWidth';
export default function createTests(envScrollbarWidth) {
    let node;
    beforeEach(() => {
        node = document.createElement('div');
        document.body.appendChild(node);
    });
    afterEach(() => {
        unmountComponentAtNode(node);
        document.body.removeChild(node);
    });

    describe('mobile', () => {
        if (envScrollbarWidth) return;
        it('should render scrollbar', done => {
            render((
                <Scrollbars mobile style={{ width: 100, height: 100 }}>
                    <div style={{ width: 200, height: 200 }}/>
                </Scrollbars>
            ), node, function callback() {
                setTimeout(() => {
                    const { view } = this;
                    expect(view.style.overflow).toEqual('scroll');
                    expect(view.style.marginBottom).toEqual(`${-scrollbarWidth}px`);
                    expect(view.style.marginRight).toEqual(`${-scrollbarWidth}px`);
                    done();
                }, 100);
            });
        });
    });
}
