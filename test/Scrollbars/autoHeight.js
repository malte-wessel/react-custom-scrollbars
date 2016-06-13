import { Scrollbars } from 'react-custom-scrollbars';
import { render, unmountComponentAtNode, findDOMNode } from 'react-dom';
import React, { createClass } from 'react';

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
                    const view = this.refs.view;
                    expect(scrollbars.style.position).toEqual('relative');
                    expect(scrollbars.style.minHeight).toEqual('0px');
                    expect(scrollbars.style.maxHeight).toEqual('100px');
                    expect(view.style.position).toEqual('relative');
                    expect(view.style.minHeight).toEqual(`${scrollbarWidth}px`);
                    expect(view.style.maxHeight).toEqual(`${100 + scrollbarWidth}px`);
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
                    expect(this.refs.view.style.marginRight).toEqual(`-${100 + scrollbarWidth}px`);
                    expect(this.refs.view.style.marginBottom).toEqual(`-${100 + scrollbarWidth}px`);
                    done();
                });
            });
        });

        describe('when native scrollbars have no width', () => {
            it('shows bars', done => {
                render((
                    <Scrollbars
                        autoHeight
                        autoHeightMax={100}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        expect(this.refs.trackVertical.style.display).toEqual('');
                        expect(this.refs.trackHorizontal.style.display).toEqual('');
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
                        const view = this.refs.view;
                        const thumbVertical = this.refs.thumbVertical;
                        expect(scrollbars.clientHeight).toEqual(0 + (envScrollbarWidth - scrollbarWidth));
                        expect(view.clientHeight).toEqual(100);
                        expect(view.scrollHeight).toEqual(150);
                        expect(thumbVertical.clientHeight).toEqual(30);
                        done();
                    }, 100);
                });
            });
        });

        describe('when content is larger than maxHeight', () => {
            it('should show scrollbars', done => {
                render((
                    <Scrollbars
                        autoHeight
                        autoHeightMax={100}>
                        <div style={{ height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        const scrollbars = findDOMNode(this);
                        const view = this.refs.view;
                        const thumbVertical = this.refs.thumbVertical;
                        expect(scrollbars.clientHeight).toEqual(0);
                        expect(view.clientHeight).toEqual(100 - (envScrollbarWidth - scrollbarWidth));
                        expect(view.scrollHeight).toEqual(300);
                        if (scrollbarWidth) {
                            // 100 / 200 * 96 = 48
                            expect(thumbVertical.clientHeight).toEqual(30);
                        }
                        done();
                    }, 100);
                });
            });
        });

        describe('when minHeight is greater than 0', () => {
            it('should have height greater than 0', done => {
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
                        const view = this.refs.view;
                        const thumbVertical = this.refs.thumbVertical;
                        expect(scrollbars.clientHeight).toEqual(100);
                        expect(view.clientHeight).toEqual(100 - (envScrollbarWidth - scrollbarWidth));
                        expect(thumbVertical.clientHeight).toEqual(0);
                        done();
                    }, 100);
                });
            });
        });

        describe('when using perecentages', () => {
            it('should use calc', done => {
                const Root = createClass({
                    render() {
                        return (
                            <div style={{ width: 500, height: 500 }}>
                                <Scrollbars
                                    ref="scrollbars"
                                    autoHeight
                                    autoHeightMin="50%"
                                    autoHeightMax="100%">
                                    <div style={{ width: 200, height: 200 }}/>
                                </Scrollbars>
                            </div>
                        );
                    }
                });
                render(<Root/>, node, function callback() {
                    setTimeout(() => {
                        const { scrollbars } = this.refs;
                        const $scrollbars = findDOMNode(scrollbars);
                        const view = scrollbars.refs.view;
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
                    const view = this.refs.view;
                    expect(scrollbars.style.position).toEqual('relative');
                    expect(scrollbars.style.minHeight).toEqual('10em');
                    expect(scrollbars.style.maxHeight).toEqual('100em');
                    expect(view.style.position).toEqual('relative');
                    expect(view.style.minHeight).toEqual(`calc(10em + ${scrollbarWidth}px)`);
                    expect(view.style.maxHeight).toEqual(`calc(100em + ${scrollbarWidth}px)`);
                    done();
                });
            });
        });
    });
}
