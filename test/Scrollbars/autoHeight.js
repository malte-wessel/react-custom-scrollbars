import { Scrollbars } from 'react-custom-scrollbars';
import { render, unmountComponentAtNode, findDOMNode } from 'react-dom';
import React, { Component } from 'react';

export default function createTests(scrollbarWidth, envScrollbarWidth) {
    describe('autoHeight', () => {
        let node;
        beforeEach(() => {
            node = document.createElement('div');
            document.body.appendChild(node);
        });
        afterEach(() => {
            unmountComponentAtNode(node);
            document.body.removeChild(node);
        });

        describe('when rendered', () => {
            it('should have min-height and max-height', done => {
                render((
                    <Scrollbars
                        autoHeight
                        autoHeightMin={0}
                        autoHeightMax={100}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    const scrollbars = findDOMNode(this);
                    expect(scrollbars.style.position).toEqual('relative');
                    expect(scrollbars.style.minHeight).toEqual('0px');
                    expect(scrollbars.style.maxHeight).toEqual('100px');
                    expect(this.view.style.position).toEqual('relative');
                    expect(this.view.style.minHeight).toEqual(`${scrollbarWidth}px`);
                    expect(this.view.style.maxHeight).toEqual(`${100 + scrollbarWidth}px`);
                    done();
                });
            });
        });

        describe('when native scrollbars have a width', () => {
            if (!scrollbarWidth) return;
            it('hides native scrollbars', done => {
                render((
                    <Scrollbars
                        autoHeight
                        autoHeightMax={100}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    const width = `-${scrollbarWidth}px`;
                    expect(this.view.style.marginRight).toEqual(width);
                    expect(this.view.style.marginBottom).toEqual(width);
                    done();
                });
            });
        });

        describe('when native scrollbars have no width', () => {
            if (scrollbarWidth) return;
            it('hides bars', done => {
                render((
                    <Scrollbars
                        autoHeight
                        autoHeightMax={100}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        expect(this.trackVertical.style.display).toEqual('none');
                        expect(this.trackHorizontal.style.display).toEqual('none');
                        done();
                    }, 100);
                });
            });
        });

        describe('when content is smaller than maxHeight', () => {
            it('should have the content\'s height', done => {
                render((
                    <Scrollbars
                        autoHeight
                        autoHeightMax={100}>
                        <div style={{ height: 50 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        const scrollbars = findDOMNode(this);
                        expect(scrollbars.clientHeight).toEqual(50 + (envScrollbarWidth - scrollbarWidth));
                        expect(this.view.clientHeight).toEqual(50);
                        expect(this.view.scrollHeight).toEqual(50);
                        expect(this.thumbVertical.clientHeight).toEqual(0);
                        done();
                    }, 100);
                });
            });
        });

        describe('when content is larger than maxHeight', () => {
            it.skip('should show scrollbars', done => {
                render((
                    <Scrollbars
                        autoHeight
                        autoHeightMax={100}>
                        <div style={{ height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        const scrollbars = findDOMNode(this);
                        expect(scrollbars.clientHeight).toEqual(100);
                        expect(this.view.clientHeight).toEqual(100 - (envScrollbarWidth - scrollbarWidth));
                        expect(this.view.scrollHeight).toEqual(200);
                        if (scrollbarWidth) {
                            // 100 / 200 * 96 = 48
                            expect(this.thumbVertical.clientHeight).toEqual(48);
                        }
                        done();
                    }, 100);
                });
            });
        });

        describe('when minHeight is greater than 0', () => {
            it.skip('should have height greater than 0', done => {
                render((
                    <Scrollbars
                        autoHeight
                        autoHeightMin={100}
                        autoHeightMax={200}>
                        <div/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        const scrollbars = findDOMNode(this);
                        expect(scrollbars.clientHeight).toEqual(100);
                        expect(this.view.clientHeight).toEqual(100 - (envScrollbarWidth - scrollbarWidth));
                        expect(this.thumbVertical.clientHeight).toEqual(0);
                        done();
                    }, 100);
                });
            });
        });

        describe('when using perecentages', () => {
            it('should use calc', done => {
                class Root extends Component {
                    render() {
                        return (
                            <div style={{ width: 500, height: 500 }}>
                                <Scrollbars
                                    ref={(ref) => { this.scrollbars = ref; }}
                                    autoHeight
                                    autoHeightMin="50%"
                                    autoHeightMax="100%">
                                    <div style={{ width: 200, height: 200 }}/>
                                </Scrollbars>
                            </div>
                        );
                    }
                }
                render(<Root/>, node, function callback() {
                    setTimeout(() => {
                        const $scrollbars = findDOMNode(this.scrollbars);
                        const view = this.scrollbars.view;
                        expect($scrollbars.clientWidth).toEqual(500);
                        expect($scrollbars.clientHeight).toEqual(250);
                        expect($scrollbars.style.position).toEqual('relative');
                        expect($scrollbars.style.minHeight).toEqual('50%');
                        expect($scrollbars.style.maxHeight).toEqual('100%');
                        expect(view.style.position).toEqual('relative');
                        expect(view.style.minHeight).toEqual(`calc(50% + ${scrollbarWidth}px)`);
                        expect(view.style.maxHeight).toEqual(`calc(100% + ${scrollbarWidth}px)`);
                        done();
                    }, 100);
                });
            });
        });

        describe('when using other units', () => {
            it('should use calc', done => {
                render((
                    <Scrollbars
                        autoHeight
                        autoHeightMin="10em"
                        autoHeightMax="100em">
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    const scrollbars = findDOMNode(this);
                    expect(scrollbars.style.position).toEqual('relative');
                    expect(scrollbars.style.minHeight).toEqual('10em');
                    expect(scrollbars.style.maxHeight).toEqual('100em');
                    expect(this.view.style.position).toEqual('relative');
                    expect(this.view.style.minHeight).toEqual(`calc(10em + ${scrollbarWidth}px)`);
                    expect(this.view.style.maxHeight).toEqual(`calc(100em + ${scrollbarWidth}px)`);
                    done();
                });
            });
        });
    });
}
