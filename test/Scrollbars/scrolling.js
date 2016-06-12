import { Scrollbars } from 'react-custom-scrollbars';
import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';

export default function createTests(scrollbarWidth, envScrollbarWidth) {
    let node;
    beforeEach(() => {
        node = document.createElement('div');
        document.body.appendChild(node);
    });
    afterEach(() => {
        unmountComponentAtNode(node);
        document.body.removeChild(node);
    });

    describe('when scrolling', () => {
        describe('when native scrollbars have a width', () => {
            if (!scrollbarWidth) return;
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
                            // 50 / (200 - 100) * (96 - 48) = 24
                            expect(this.refs.thumbVertical.style.transform).toEqual('translateY(24px)');
                            expect(this.refs.thumbHorizontal.style.transform).toEqual('translateX(24px)');
                        } else {
                            expect(this.refs.thumbVertical.style.transform).toEqual('');
                            expect(this.refs.thumbHorizontal.style.transform).toEqual('');
                        }
                        done();
                    }, 100);
                });
            });
        });

        it('should not trigger a rerender', () => {
            render((
                <Scrollbars style={{ width: 100, height: 100 }}>
                    <div style={{ width: 200, height: 200 }}/>
                </Scrollbars>
            ), node, function callback() {
                const spy = spyOn(this, 'render').andCallThrough();
                this.scrollTop(50);
                expect(spy.calls.length).toEqual(0);
                spy.restore();
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
                        expect(event).toBeA(Event);
                        done();
                    }, 200);
                });
            });
            it('should call `onScrollFrame`', done => {
                const spy = createSpy();
                render((
                    <Scrollbars style={{ width: 100, height: 100 }} onScrollFrame={spy}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    this.scrollLeft(50);
                    setTimeout(() => {
                        expect(spy.calls.length).toEqual(1);
                        const args = spy.calls[0].arguments;
                        const values = args[0];
                        expect(values).toBeA(Object);

                        if (scrollbarWidth) {
                            expect(values).toEqual({
                                left: 0.5,
                                top: 0,
                                scrollLeft: 50,
                                scrollTop: 0,
                                scrollWidth: 200,
                                scrollHeight: 200,
                                clientWidth: 100,
                                clientHeight: 100
                            });
                        } else {
                            expect(values).toEqual({
                                left: values.scrollLeft / (values.scrollWidth - (values.clientWidth)),
                                top: 0,
                                scrollLeft: 50,
                                scrollTop: 0,
                                scrollWidth: 200,
                                scrollHeight: 200,
                                clientWidth: 100 - envScrollbarWidth,
                                clientHeight: 100 - envScrollbarWidth
                            });
                        }
                        done();
                    }, 200);
                });
            });
            it('should call `onScrollStart` once', done => {
                const spy = createSpy();
                render((
                    <Scrollbars style={{ width: 100, height: 100 }} onScrollStart={spy}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    let left = 0;
                    const interval = setInterval(() => {
                        this.scrollLeft(++left);
                        if (left >= 50) {
                            clearInterval(interval);
                            expect(spy.calls.length).toEqual(1);
                            done();
                        }
                    }, 10);
                });
            });
            it('should call `onScrollStop` once when scrolling stops', done => {
                const spy = createSpy();
                render((
                    <Scrollbars style={{ width: 100, height: 100 }} onScrollStop={spy}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    let left = 0;
                    const interval = setInterval(() => {
                        this.scrollLeft(++left);
                        if (left >= 50) {
                            clearInterval(interval);
                            setTimeout(() => {
                                expect(spy.calls.length).toEqual(1);
                                done();
                            }, 300);
                        }
                    }, 10);
                });
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
                        expect(event).toBeA(Event);
                        done();
                    }, 200);
                });
            });
            it('should call `onScrollFrame`', done => {
                const spy = createSpy();
                render((
                    <Scrollbars style={{ width: 100, height: 100 }} onScrollFrame={spy}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    this.scrollTop(50);
                    setTimeout(() => {
                        expect(spy.calls.length).toEqual(1);
                        const args = spy.calls[0].arguments;
                        const values = args[0];
                        expect(values).toBeA(Object);

                        if (scrollbarWidth) {
                            expect(values).toEqual({
                                left: 0,
                                top: 0.5,
                                scrollLeft: 0,
                                scrollTop: 50,
                                scrollWidth: 200,
                                scrollHeight: 200,
                                clientWidth: 100,
                                clientHeight: 100,
                            });
                        } else {
                            expect(values).toEqual({
                                left: 0,
                                top: values.scrollTop / (values.scrollHeight - (values.clientHeight)),
                                scrollLeft: 0,
                                scrollTop: 50,
                                scrollWidth: 200,
                                scrollHeight: 200,
                                clientWidth: 100 - envScrollbarWidth,
                                clientHeight: 100 - envScrollbarWidth,
                            });
                        }
                        done();
                    }, 200);
                });
            });
            it('should call `onScrollStart` once', done => {
                const spy = createSpy();
                render((
                    <Scrollbars style={{ width: 100, height: 100 }} onScrollStart={spy}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    let top = 0;
                    const interval = setInterval(() => {
                        this.scrollTop(++top);
                        if (top >= 50) {
                            clearInterval(interval);
                            expect(spy.calls.length).toEqual(1);
                            done();
                        }
                    }, 10);
                });
            });
            it('should call `onScrollStop` once when scrolling stops', done => {
                const spy = createSpy();
                render((
                    <Scrollbars style={{ width: 100, height: 100 }} onScrollStop={spy}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    let top = 0;
                    const interval = setInterval(() => {
                        this.scrollTop(++top);
                        if (top >= 50) {
                            clearInterval(interval);
                            setTimeout(() => {
                                expect(spy.calls.length).toEqual(1);
                                done();
                            }, 300);
                        }
                    }, 10);
                });
            });
        });
    });
}
