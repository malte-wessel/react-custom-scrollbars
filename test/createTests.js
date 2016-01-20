import { Scrollbars } from 'react-custom-scrollbars';
import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import simulant from 'simulant';


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

        describe('when Scrollbars are rendered', () => {
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

        describe('when rerendering Scrollbars', () => {
            function renderScrollbars(callback) {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, callback);
            }
            it('should update scrollbars', done => {
                renderScrollbars(function callback() {
                    const spy = spyOn(this, 'update').andCallThrough();
                    renderScrollbars(function rerenderCallback() {
                        expect(spy.calls.length).toEqual(1);
                        spy.restore();
                        done();
                    });
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
                        simulant.fire(window, 'resize');
                        expect(spy.calls.length).toEqual(1);
                        done();
                    }, 100);
                });
            });
        });

        describe('when clicking on horizontal bar', () => {
            // Not for mobile environment
            if (!scrollbarWidth) return;

            it('should scroll to the respective position', done => {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        const { view, barHorizontal: bar } = this.refs;
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

        describe('when clicking on vertical bar', () => {
            // Not for mobile environment
            if (!scrollbarWidth) return;

            it('should scroll to the respective position', done => {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        const { view, barVertical: bar } = this.refs;
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

        describe('when dragging horizontal thumb', () => {
            // Not for mobile environment
            if (!scrollbarWidth) return;

            it('should scroll to the respective position', done => {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        const { view, thumbHorizontal: thumb } = this.refs;
                        const { left } = thumb.getBoundingClientRect();
                        simulant.fire(thumb, 'mousedown', {
                            currentTarget: thumb,
                            clientX: left
                        });
                        simulant.fire(document, 'mousemove', {
                            clientX: left + 100
                        });
                        simulant.fire(document, 'mouseup');
                        expect(view.scrollLeft).toEqual(100);
                        done();
                    }, 100);
                });
            });

            it('should disable selection', done => {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        const { thumbHorizontal: thumb } = this.refs;
                        const { left } = thumb.getBoundingClientRect();
                        simulant.fire(thumb, 'mousedown', {
                            currentTarget: thumb,
                            clientX: left
                        });
                        expect(document.body.style.webkitUserSelect).toEqual('none');
                        simulant.fire(document, 'mouseup');
                        expect(document.body.style.webkitUserSelect).toEqual('');
                        done();
                    }, 100);
                });
            });
        });

        describe('when dragging vertical thumb', () => {
            // Not for mobile environment
            if (!scrollbarWidth) return;

            it('should scroll to the respective position', done => {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        const { view, thumbVertical: thumb } = this.refs;
                        const { top } = thumb.getBoundingClientRect();
                        simulant.fire(thumb, 'mousedown', {
                            currentTarget: thumb,
                            clientY: top
                        });
                        simulant.fire(document, 'mousemove', {
                            clientY: top + 100
                        });
                        simulant.fire(document, 'mouseup');
                        expect(view.scrollTop).toEqual(100);
                        done();
                    }, 100);
                });
            });

            it('should disable selection', done => {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        const { thumbVertical: thumb } = this.refs;
                        const { top } = thumb.getBoundingClientRect();
                        simulant.fire(thumb, 'mousedown', {
                            currentTarget: thumb,
                            clientY: top
                        });
                        expect(document.body.style.webkitUserSelect).toEqual('none');
                        simulant.fire(document, 'mouseup');
                        expect(document.body.style.webkitUserSelect).toEqual('');
                        done();
                    }, 100);
                });
            });
        });
    });
}
