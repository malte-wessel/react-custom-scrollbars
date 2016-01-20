import { Scrollbars } from 'react-custom-scrollbars';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

export default function createTests(scrollbarWidth, envScrollbarWidth) {
    describe('Scrollbars', () => {
        let node;
        beforeEach(() => {
            node = document.createElement('div');
            document.body.appendChild(node);
        });
        afterEach(() => {
            unmountComponentAtNode(node);
            document.body.removeChild(node);
        });

        describe('when rendering Scrollbars', () => {
            it('hides native scrollbars', done => {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    if (scrollbarWidth) {
                        const width = `-${scrollbarWidth}px`;
                        expect(this.refs.view.style.right).toEqual(width);
                        expect(this.refs.view.style.bottom).toEqual(width);
                    } else {
                        expect(this.refs.view.style.right).toEqual('');
                        expect(this.refs.view.style.bottom).toEqual('');
                    }
                    done();
                });
            });

            it('renders view', done => {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    expect(this.refs.view).toBeA(Node);
                    done();
                });
            });

            it('renders bars', done => {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    expect(this.refs.barHorizontal).toBeA(Node);
                    expect(this.refs.barVertical).toBeA(Node);
                    done();
                });
            });

            it('renders thumbs', done => {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    expect(this.refs.thumbHorizontal).toBeA(Node);
                    expect(this.refs.thumbVertical).toBeA(Node);
                    done();
                });
            });

            it('renders thumbs with correct size', done => {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        if (scrollbarWidth) {
                            expect(this.refs.thumbVertical.style.height).toEqual('50%');
                            expect(this.refs.thumbHorizontal.style.width).toEqual('50%');
                        } else {
                            expect(this.refs.thumbVertical.style.height).toEqual('');
                            expect(this.refs.thumbHorizontal.style.width).toEqual('');
                        }
                        done();
                    }, 100);
                });
            });
        });

        describe('when scrolling', () => {
            it('should update thumbs position', done => {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    this.scrollTop(50);
                    this.scrollLeft(50);
                    setTimeout(() => {
                        if (scrollbarWidth) {
                            expect(this.refs.thumbVertical.style.transform).toEqual('translateY(50%)');
                            expect(this.refs.thumbHorizontal.style.transform).toEqual('translateX(50%)');
                        } else {
                            expect(this.refs.thumbVertical.style.transform).toEqual('');
                            expect(this.refs.thumbHorizontal.style.transform).toEqual('');
                        }
                        done();
                    }, 100);
                });
            });

            describe('when scrolling y-axis', () => {
                it('should call `onScroll`', done => {
                    const spy = createSpy();
                    render((
                        <Scrollbars style={{ width: 100, height: 100 }} onScroll={spy}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        this.scrollTop(50);
                        setTimeout(() => {
                            expect(spy.calls.length).toEqual(1);
                            const args = spy.calls[0].arguments;
                            const event = args[0];
                            const values = args[1];
                            expect(event).toBeA(Event);
                            expect(values).toBeA(Object);

                            if (scrollbarWidth) {
                                expect(values.left).toEqual(0);
                                expect(values.top).toEqual(0.5);
                                expect(values.scrollLeft).toEqual(0);
                                expect(values.scrollTop).toEqual(50);
                                expect(values.scrollWidth).toEqual(200);
                                expect(values.scrollHeight).toEqual(200);
                                expect(values.clientWidth).toEqual(100);
                                expect(values.clientHeight).toEqual(100);
                            } else {
                                expect(values.left).toEqual(0);
                                expect(values.top).toEqual(values.scrollTop / (values.scrollHeight - (values.clientHeight)));
                                expect(values.scrollLeft).toEqual(0);
                                expect(values.scrollTop).toEqual(50);
                                expect(values.scrollWidth).toEqual(200);
                                expect(values.scrollHeight).toEqual(200);
                                expect(values.clientWidth).toEqual(100 - envScrollbarWidth);
                                expect(values.clientHeight).toEqual(100 - envScrollbarWidth);
                            }
                            done();
                        }, 100);
                    });
                });
            });

            describe('when scrolling x-axis', () => {
                it('should call `onScroll`', done => {
                    const spy = createSpy();
                    render((
                        <Scrollbars style={{ width: 100, height: 100 }} onScroll={spy}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        this.scrollLeft(50);
                        setTimeout(() => {
                            expect(spy.calls.length).toEqual(1);
                            const args = spy.calls[0].arguments;
                            const event = args[0];
                            const values = args[1];
                            expect(event).toBeA(Event);
                            expect(values).toBeA(Object);

                            if (scrollbarWidth) {
                                expect(values.left).toEqual(0.5);
                                expect(values.top).toEqual(0);
                                expect(values.scrollLeft).toEqual(50);
                                expect(values.scrollTop).toEqual(0);
                                expect(values.scrollWidth).toEqual(200);
                                expect(values.scrollHeight).toEqual(200);
                                expect(values.clientWidth).toEqual(100);
                                expect(values.clientHeight).toEqual(100);
                            } else {
                                expect(values.left).toEqual(values.scrollLeft / (values.scrollWidth - (values.clientWidth)));
                                expect(values.top).toEqual(0);
                                expect(values.scrollLeft).toEqual(50);
                                expect(values.scrollTop).toEqual(0);
                                expect(values.scrollWidth).toEqual(200);
                                expect(values.scrollHeight).toEqual(200);
                                expect(values.clientWidth).toEqual(100 - envScrollbarWidth);
                                expect(values.clientHeight).toEqual(100 - envScrollbarWidth);
                            }
                            done();
                        }, 100);
                    });
                });
            });
        });

        describe('when resizing window', () => {
            it('should update scrollbars', done => {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        const spy = spyOn(this, 'update');
                        window.dispatchEvent(new Event('resize'));
                        expect(spy.calls.length).toEqual(1);
                        done();
                    }, 100);
                });
            });
        });
    });
}
