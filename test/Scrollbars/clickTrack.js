import { Scrollbars } from 'react-custom-scrollbars';
import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import simulant from 'simulant';

export default function createTests(scrollbarWidth) {
    // Not for mobile environment
    if (!scrollbarWidth) return;

    let node;
    beforeEach(() => {
        node = document.createElement('div');
        document.body.appendChild(node);
    });
    afterEach(() => {
        unmountComponentAtNode(node);
        document.body.removeChild(node);
    });

    describe('when clicking on horizontal track', () => {
        it('should scroll to the respective position', done => {
            render((
                <Scrollbars style={{ width: 100, height: 100 }}>
                    <div style={{ width: 200, height: 200 }}/>
                </Scrollbars>
            ), node, function callback() {
                setTimeout(() => {
                    const { view, trackHorizontal: bar } = this.refs;
                    const { left, width } = bar.getBoundingClientRect();
                    simulant.fire(bar, 'mousedown', {
                        target: bar,
                        clientX: left + (width / 2)
                    });
                    expect(view.scrollLeft).toEqual(50);
                    done();
                }, 100);
            });
        });
    });

    describe('when clicking on vertical track', () => {
        it('should scroll to the respective position', done => {
            render((
                <Scrollbars style={{ width: 100, height: 100 }}>
                    <div style={{ width: 200, height: 200 }}/>
                </Scrollbars>
            ), node, function callback() {
                setTimeout(() => {
                    const { view, trackVertical: bar } = this.refs;
                    const { top, height } = bar.getBoundingClientRect();
                    simulant.fire(bar, 'mousedown', {
                        target: bar,
                        clientY: top + (height / 2)
                    });
                    expect(view.scrollTop).toEqual(50);
                    done();
                }, 100);
            });
        });
    });
}
