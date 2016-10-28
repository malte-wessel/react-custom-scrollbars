import { Scrollbars } from 'react-custom-scrollbars';
import { render, unmountComponentAtNode, findDOMNode } from 'react-dom';
import React from 'react';

export default function createTests(scrollbarWidth) {
    describe('rendering', () => {
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

            describe('when using custom tagName', () => {
                it('should use the defined tagName', done => {
                    render((
                        <Scrollbars
                            tagName="nav"
                            style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        const el = findDOMNode(this);
                        expect(el.tagName.toLowerCase()).toEqual('nav');
                        done();
                    });
                });
            });

            describe('when custom `renderView` is passed', () => {
                it('should render custom element', done => {
                    render((
                        <Scrollbars
                            style={{ width: 100, height: 100 }}
                            renderView={({ style, ...props }) => <section style={{ ...style, color: 'red' }} {...props}/>}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        expect(this.refs.view.tagName).toEqual('SECTION');
                        expect(this.refs.view.style.color).toEqual('red');
                        expect(this.refs.view.style.position).toEqual('absolute');
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
                        expect(this.refs.view.style.marginRight).toEqual(width);
                        expect(this.refs.view.style.marginBottom).toEqual(width);
                        done();
                    });
                });

                it('renders bars', done => {
                    render((
                        <Scrollbars style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        expect(this.refs.trackHorizontal).toBeA(Node);
                        expect(this.refs.trackVertical).toBeA(Node);
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
                            // 100 / 200 * 96 = 48
                            expect(this.refs.thumbVertical.style.height).toEqual('48px');
                            expect(this.refs.thumbHorizontal.style.width).toEqual('48px');
                            done();
                        }, 100);
                    });
                });

                it('the thumbs size should not be less than the given `thumbMinSize`', done => {
                    render((
                        <Scrollbars style={{ width: 100, height: 100 }}>
                            <div style={{ width: 2000, height: 2000 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        setTimeout(() => {
                            // 100 / 200 * 96 = 48
                            expect(this.refs.thumbVertical.style.height).toEqual('30px');
                            expect(this.refs.thumbHorizontal.style.width).toEqual('30px');
                            done();
                        }, 100);
                    });
                });

                describe('when thumbs have a fixed size', () => {
                    it('thumbs should have the given fixed size', done => {
                        render((
                            <Scrollbars thumbSize={50} style={{ width: 100, height: 100 }}>
                                <div style={{ width: 2000, height: 2000 }}/>
                            </Scrollbars>
                        ), node, function callback() {
                            setTimeout(() => {
                                // 100 / 200 * 96 = 48
                                expect(this.refs.thumbVertical.style.height).toEqual('50px');
                                expect(this.refs.thumbHorizontal.style.width).toEqual('50px');
                                done();
                            }, 100);
                        });
                    });
                });

                describe('when custom `renderTrackHorizontal` is passed', () => {
                    it('should render custom element', done => {
                        render((
                            <Scrollbars
                                style={{ width: 100, height: 100 }}
                                renderTrackHorizontal={({ style, ...props }) => <section style={{ ...style, height: 10, color: 'red' }} {...props}/>}>
                                <div style={{ width: 200, height: 200 }}/>
                            </Scrollbars>
                        ), node, function callback() {
                            expect(this.refs.trackHorizontal.tagName).toEqual('SECTION');
                            expect(this.refs.trackHorizontal.style.position).toEqual('absolute');
                            expect(this.refs.trackHorizontal.style.color).toEqual('red');
                            done();
                        });
                    });
                });

                describe('when custom `renderTrackVertical` is passed', () => {
                    it('should render custom element', done => {
                        render((
                            <Scrollbars
                                style={{ width: 100, height: 100 }}
                                renderTrackVertical={({ style, ...props }) => <section style={{ ...style, width: 10, color: 'red' }} {...props}/>}>
                                <div style={{ width: 200, height: 200 }}/>
                            </Scrollbars>
                        ), node, function callback() {
                            expect(this.refs.trackVertical.tagName).toEqual('SECTION');
                            expect(this.refs.trackVertical.style.position).toEqual('absolute');
                            expect(this.refs.trackVertical.style.color).toEqual('red');
                            done();
                        });
                    });

                    it('should render same style with default track', done => {
                        render((
                            <div>
                                <Scrollbars className="sc"
                                  style={{width: 100, height: 100}}>
                                    <div style={{ width: 200, height: 200 }}/>
                                </Scrollbars>
                                <Scrollbars className="sc"
                                  renderTrackVertical={p => <div {...p} />}
                                  style={{width: 100, height: 100}}>
                                    <div style={{ width: 200, height: 200 }}/>
                                </Scrollbars>
                            </div>
                        ), node, function callback() {
                            const node = findDOMNode(this);
                            const vTracks = node.querySelectorAll('.sc > div:last-child');

                            const attr1 = vTracks[0].getAttribute('style');
                            const attr2 = vTracks[1].getAttribute('style');

                            expect(attr1).toBe(attr2);
                            done();
                        });
                    });

                    it('should override default style.', done => {
                        render((
                            <Scrollbars
                                renderTrackHorizontal={({style, ...props}) => {
                                  return <div {...props} style={{...style, right: 4}} />;
                                }}>
                                <div style={{ width: 200, height: 200 }}/>
                            </Scrollbars>
                        ), node, function callback() {
                            expect(this.refs.trackHorizontal.style.right).toBe('4px');
                            done();
                        });
                    });
                });

                describe('when custom `renderThumbHorizontal` is passed', () => {
                    it('should render custom element', done => {
                        render((
                            <Scrollbars
                                style={{ width: 100, height: 100 }}
                                renderThumbHorizontal={({ style, ...props }) => <section style={{ ...style, color: 'red' }} {...props}/>}>
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
                                renderThumbVertical={({ style, ...props }) => <section style={{ ...style, color: 'red' }} {...props}/>}>
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

                it('should not override the scrollbars width/height values', done => {
                    render((
                        <Scrollbars
                            style={{ width: 100, height: 100 }}
                            renderTrackHorizontal={({ style, ...props }) =>
                                <div style={{ ...style, height: 10 }} {...props}/>}
                            renderTrackVertical={({ style, ...props }) =>
                                <div style={{ ...style, width: 10 }} {...props}/>}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        setTimeout(() => {
                            expect(this.refs.trackHorizontal.style.height).toEqual('10px');
                            expect(this.refs.trackVertical.style.width).toEqual('10px');
                            done();
                        }, 100);
                    });
                });

                describe('when view does not overflow container', () => {
                    it('should hide scrollbars', done => {
                        render((
                            <Scrollbars
                                style={{ width: 100, height: 100 }}
                                renderTrackHorizontal={({ style, ...props }) =>
                                    <div style={{ ...style, height: 10 }} {...props}/>}
                                renderTrackVertical={({ style, ...props }) =>
                                    <div style={{ ...style, width: 10 }} {...props}/>}>
                                <div style={{ width: 90, height: 90 }}/>
                            </Scrollbars>
                        ), node, function callback() {
                            setTimeout(() => {
                                expect(this.refs.thumbHorizontal.style.width).toEqual('0px');
                                expect(this.refs.thumbVertical.style.height).toEqual('0px');
                                done();
                            }, 100);
                        });
                    });
                });
            });

            describe('when native scrollbars have no width', () => {
                if (scrollbarWidth) return;

                it('hides bars', done => {
                    render((
                        <Scrollbars style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        setTimeout(() => {
                            expect(this.refs.trackVertical.style.display).toEqual('none');
                            expect(this.refs.trackHorizontal.style.display).toEqual('none');
                            done();
                        }, 100);
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
    });
}
