import { Scrollbars } from 'react-custom-scrollbars';
import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';

export default function createTests(scrollbarWidth) {
    let node;
    beforeEach(() => {
        node = document.createElement('div');
        document.body.appendChild(node);
    });
    afterEach(() => {
        unmountComponentAtNode(node);
        document.body.removeChild(node);
    });

    describe('universal', () => {
        describe('default', () => {
            describe('when rendered', () => {
                it('should hide overflow', done => {
                    class ScrollbarsTest extends Scrollbars {
                        // Override componentDidMount, so we can check, how the markup
                        // looks like on the first rendering
                        componentDidMount() {}
                    }
                    render((
                        <ScrollbarsTest universal style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </ScrollbarsTest>
                    ), node, function callback() {
                        const { view, trackHorizontal, trackVertical } = this;
                        expect(view.style.position).toEqual('absolute');
                        expect(view.style.overflow).toEqual('hidden');
                        expect(view.style.top).toEqual('0px');
                        expect(view.style.bottom).toEqual('0px');
                        expect(view.style.left).toEqual('0px');
                        expect(view.style.right).toEqual('0px');
                        expect(view.style.marginBottom).toEqual('0px');
                        expect(view.style.marginRight).toEqual('0px');
                        expect(trackHorizontal.style.display).toEqual('none');
                        expect(trackVertical.style.display).toEqual('none');
                        done();
                    });
                });
            });
            describe('when componentDidMount', () => {
                it('should rerender', done => {
                    render((
                        <Scrollbars universal style={{ width: 100, height: 100 }}>
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
        });
        describe('when using autoHeight', () => {
            describe('when rendered', () => {
                it('should hide overflow', done => {
                    class ScrollbarsTest extends Scrollbars {
                        // Override componentDidMount, so we can check, how the markup
                        // looks like on the first rendering
                        componentDidMount() {}
                    }
                    render((
                        <ScrollbarsTest universal autoHeight autoHeightMax={100}>
                            <div style={{ width: 200, height: 200 }}/>
                        </ScrollbarsTest>
                    ), node, function callback() {
                        const { view, trackHorizontal, trackVertical } = this;
                        expect(view.style.position).toEqual('relative');
                        expect(view.style.overflow).toEqual('hidden');
                        expect(view.style.marginBottom).toEqual('0px');
                        expect(view.style.marginRight).toEqual('0px');
                        expect(view.style.minHeight).toEqual('0px');
                        expect(view.style.maxHeight).toEqual('100px');
                        expect(trackHorizontal.style.display).toEqual('none');
                        expect(trackVertical.style.display).toEqual('none');
                        done();
                    });
                });
            });
            describe('when componentDidMount', () => {
                it('should rerender', done => {
                    render((
                        <Scrollbars universal autoHeight autoHeightMax={100}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        setTimeout(() => {
                            const { view } = this;
                            expect(view.style.overflow).toEqual('scroll');
                            expect(view.style.marginBottom).toEqual(`${-scrollbarWidth}px`);
                            expect(view.style.marginRight).toEqual(`${-scrollbarWidth}px`);
                            expect(view.style.minHeight).toEqual(`${scrollbarWidth}px`);
                            expect(view.style.maxHeight).toEqual(`${100 + scrollbarWidth}px`);
                            done();
                        });
                    });
                });
            });
        });
    });
}
