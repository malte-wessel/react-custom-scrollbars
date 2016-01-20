import { Scrollbars } from 'react-custom-scrollbars';
import { render, unmountComponentAtNode, findDOMNode } from 'react-dom';
import React, { createClass } from 'react';
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
            it('takes className', done => {
                render((
                    <Scrollbars className="foo">
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    expect(findDOMNode(this).className).toEqual('foo');
                    done();
                });
            });

            it('takes styles', done => {
                render((
                    <Scrollbars style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    expect(findDOMNode(this).style.width).toEqual('100px');
                    expect(findDOMNode(this).style.height).toEqual('100px');
                    expect(findDOMNode(this).style.overflow).toEqual('hidden');
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

            describe('when custom `renderScrollbarHorizontal` is passed', () => {
                it('should render custom element', done => {
                    render((
                        <Scrollbars
                            style={{ width: 100, height: 100 }}
                            renderScrollbarHorizontal={({style, ...props}) => <section style={{...style, color: 'red'}} {...props}/>}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        expect(this.refs.barHorizontal.tagName).toEqual('SECTION');
                        expect(this.refs.barHorizontal.style.position).toEqual('absolute');
                        expect(this.refs.barHorizontal.style.color).toEqual('red');
                        done();
                    });
                });
            });

            describe('when custom `renderScrollbarVertical` is passed', () => {
                it('should render custom element', done => {
                    render((
                        <Scrollbars
                            style={{ width: 100, height: 100 }}
                            renderScrollbarVertical={({style, ...props}) => <section style={{...style, color: 'red'}} {...props}/>}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        expect(this.refs.barVertical.tagName).toEqual('SECTION');
                        expect(this.refs.barVertical.style.position).toEqual('absolute');
                        expect(this.refs.barVertical.style.color).toEqual('red');
                        done();
                    });
                });
            });

            describe('when custom `renderThumbHorizontal` is passed', () => {
                it('should render custom element', done => {
                    render((
                        <Scrollbars
                            style={{ width: 100, height: 100 }}
                            renderThumbHorizontal={({style, ...props}) => <section style={{...style, color: 'red'}} {...props}/>}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        expect(this.refs.thumbHorizontal.tagName).toEqual('SECTION');
                        expect(this.refs.thumbHorizontal.style.position).toEqual('relative');
                        expect(this.refs.thumbHorizontal.style.color).toEqual('red');
                        done();
                    });
                });
            });

            describe('when custom `renderThumbVertical` is passed', () => {
                it('should render custom element', done => {
                    render((
                        <Scrollbars
                            style={{ width: 100, height: 100 }}
                            renderThumbVertical={({style, ...props}) => <section style={{...style, color: 'red'}} {...props}/>}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        expect(this.refs.thumbVertical.tagName).toEqual('SECTION');
                        expect(this.refs.thumbVertical.style.position).toEqual('relative');
                        expect(this.refs.thumbVertical.style.color).toEqual('red');
                        done();
                    });
                });
            });

            describe('when custom `renderView` is passed', () => {
                it('should render custom element', done => {
                    render((
                        <Scrollbars
                            style={{ width: 100, height: 100 }}
                            renderView={({style, ...props}) => <section style={{...style, color: 'red'}} {...props}/>}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        expect(this.refs.view.tagName).toEqual('SECTION');
                        expect(this.refs.view.style.color).toEqual('red');
                        if (scrollbarWidth) {
                            expect(this.refs.view.style.position).toEqual('absolute');
                        } else {
                            expect(this.refs.view.style.position).toEqual('relative');
                        }
                        done();
                    });
                });
            });

            describe('when native scrollbars have a width', () => {
                if (!scrollbarWidth) return;

                it('hides native scrollbars', done => {
                    render((
                        <Scrollbars style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        const width = `-${scrollbarWidth}px`;
                        expect(this.refs.view.style.right).toEqual(width);
                        expect(this.refs.view.style.bottom).toEqual(width);
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
                            expect(this.refs.thumbVertical.style.height).toEqual('50%');
                            expect(this.refs.thumbHorizontal.style.width).toEqual('50%');
                            done();
                        }, 100);
                    });
                });

                it('positions view absolute', done => {
                    render((
                        <Scrollbars style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        expect(this.refs.view.style.position).toEqual('absolute');
                        expect(this.refs.view.style.top).toEqual('0px');
                        expect(this.refs.view.style.left).toEqual('0px');
                        done();
                    });
                });
            });

            describe('when native scrollbars are overlayed', () => {
                if (scrollbarWidth) return;

                it('hides bars', done => {
                    render((
                        <Scrollbars style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        setTimeout(() => {
                            expect(this.refs.barVertical.style.width).toEqual('');
                            expect(this.refs.barHorizontal.style.height).toEqual('');
                            done();
                        }, 100);
                    });
                });

                it('hides thumbs', done => {
                    render((
                        <Scrollbars style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        setTimeout(() => {
                            expect(this.refs.thumbVertical.style.height).toEqual('');
                            expect(this.refs.thumbHorizontal.style.width).toEqual('');
                            done();
                        }, 100);
                    });
                });

                it('positions view relative', done => {
                    render((
                        <Scrollbars style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        expect(this.refs.view.style.position).toEqual('relative');
                        expect(this.refs.view.style.width).toEqual('100%');
                        expect(this.refs.view.style.height).toEqual('100%');
                        done();
                    });
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

        describe('when scrollbars are in flexbox environment', () => {
            it('hides thumbs', done => {
                const Root = createClass({
                    render() {
                        return (
                            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column'}}>
                                <Scrollbars ref="scrollbars">
                                    <div style={{ width: 10000, height: 10000 }}/>
                                </Scrollbars>
                            </div>
                        );
                    }
                });
                render(<Root/>, node, function callback() {
                    setTimeout(() => {
                        const { scrollbars } = this.refs;
                        const $scrollbars = findDOMNode(scrollbars);
                        const $view = scrollbars.refs.view;
                        expect($scrollbars.clientHeight).toBeGreaterThan(0);
                        expect($view.clientHeight).toBeGreaterThan(0);
                        done();
                    }, 100);
                });
            });
        });
    });
}
