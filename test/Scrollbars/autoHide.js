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

    describe('autoHide', () => {
        describe('when Scrollbars are rendered', () => {
            it('should hide tracks', done => {
                render((
                    <Scrollbars autoHide style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    expect(this.trackHorizontal.style.opacity).toEqual('0');
                    expect(this.trackVertical.style.opacity).toEqual('0');
                    done();
                });
            });
        });
        describe('enter/leave track', () => {
            describe('when entering horizontal track', () => {
                it('should show tracks', done => {
                    render((
                        <Scrollbars autoHide style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        const { trackHorizontal: track } = this;
                        simulant.fire(track, 'mouseenter');
                        expect(track.style.opacity).toEqual('1');
                        done();
                    });
                });
                it('should not hide tracks', done => {
                    render((
                        <Scrollbars
                            autoHide
                            autoHideTimeout={0}
                            style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        const { trackHorizontal: track } = this;
                        simulant.fire(track, 'mouseenter');
                        setTimeout(() => this.hideTracks(), 10);
                        setTimeout(() => {
                            expect(track.style.opacity).toEqual('1');
                        }, 100);
                        done();
                    });
                });
            });
            describe('when leaving horizontal track', () => {
                it('should hide tracks', done => {
                    render((
                        <Scrollbars
                            autoHide
                            autoHideTimeout={10}
                            autoHideDuration={10}
                            style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        const { trackHorizontal: track } = this;
                        simulant.fire(track, 'mouseenter');
                        simulant.fire(track, 'mouseleave');
                        setTimeout(() => {
                            expect(track.style.opacity).toEqual('0');
                            done();
                        }, 100);
                    });
                });
            });
            describe('when entering vertical track', () => {
                it('should show tracks', done => {
                    render((
                        <Scrollbars autoHide style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        const { trackVertical: track } = this;
                        simulant.fire(track, 'mouseenter');
                        expect(track.style.opacity).toEqual('1');
                        done();
                    });
                });
                it('should not hide tracks', done => {
                    render((
                        <Scrollbars
                            autoHide
                            autoHideTimeout={0}
                            style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        const { trackVertical: track } = this;
                        simulant.fire(track, 'mouseenter');
                        setTimeout(() => this.hideTracks(), 10);
                        setTimeout(() => {
                            expect(track.style.opacity).toEqual('1');
                        }, 100);
                        done();
                    });
                });
            });
            describe('when leaving vertical track', () => {
                it('should hide tracks', done => {
                    render((
                        <Scrollbars
                            autoHide
                            autoHideTimeout={10}
                            autoHideDuration={10}
                            style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        const { trackVertical: track } = this;
                        simulant.fire(track, 'mouseenter');
                        simulant.fire(track, 'mouseleave');
                        setTimeout(() => {
                            expect(track.style.opacity).toEqual('0');
                            done();
                        }, 100);
                    });
                });
            });
        });
        describe('when scrolling', () => {
            it('should show tracks', done => {
                render((
                    <Scrollbars autoHide style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    this.scrollTop(50);
                    setTimeout(() => {
                        const { trackHorizontal, trackVertical } = this;
                        expect(trackHorizontal.style.opacity).toEqual('1');
                        expect(trackVertical.style.opacity).toEqual('1');
                        done();
                    }, 100);
                });
            });
            it('should hide tracks after scrolling', done => {
                render((
                    <Scrollbars
                        autoHide
                        autoHideTimeout={10}
                        autoHideDuration={10}
                        style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    this.scrollTop(50);
                    setTimeout(() => {
                        const { trackHorizontal, trackVertical } = this;
                        expect(trackHorizontal.style.opacity).toEqual('0');
                        expect(trackVertical.style.opacity).toEqual('0');
                        done();
                    }, 300);
                });
            });
            it('should not hide tracks', done => {
                render((
                    <Scrollbars
                        autoHide
                        autoHideTimeout={0}
                        style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    this.scrollTop(50);
                    setTimeout(() => this.hideTracks());
                    setTimeout(() => {
                        const { trackHorizontal, trackVertical } = this;
                        expect(trackHorizontal.style.opacity).toEqual('1');
                        expect(trackVertical.style.opacity).toEqual('1');
                        done();
                    }, 50);
                });
            });
        });
        describe('when dragging x-axis', () => {
            it('should show tracks', done => {
                render((
                    <Scrollbars
                        autoHide
                        autoHideTimeout={10}
                        autoHideDuration={10}
                        style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    const { thumbHorizontal: thumb, trackHorizontal: track } = this;
                    const { left } = thumb.getBoundingClientRect();
                    simulant.fire(thumb, 'mousedown', {
                        target: thumb,
                        clientX: left + 1
                    });
                    simulant.fire(document, 'mousemove', {
                        clientX: left + 100
                    });
                    setTimeout(() => {
                        expect(track.style.opacity).toEqual('1');
                        done();
                    }, 100);
                });
            });

            it('should hide tracks on end', done => {
                render((
                    <Scrollbars
                        autoHide
                        autoHideTimeout={10}
                        autoHideDuration={10}
                        style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    const { thumbHorizontal: thumb, trackHorizontal: track } = this;
                    const { left } = thumb.getBoundingClientRect();
                    simulant.fire(thumb, 'mousedown', {
                        target: thumb,
                        clientX: left + 1
                    });
                    simulant.fire(document, 'mouseup');
                    setTimeout(() => {
                        expect(track.style.opacity).toEqual('0');
                        done();
                    }, 100);
                });
            });

            describe('and leaving track', () => {
                it('should not hide tracks', done => {
                    render((
                        <Scrollbars
                            autoHide
                            autoHideTimeout={10}
                            autoHideDuration={10}
                            style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        setTimeout(() => {
                            const { thumbHorizontal: thumb, trackHorizontal: track } = this;
                            const { left } = thumb.getBoundingClientRect();
                            simulant.fire(thumb, 'mousedown', {
                                target: thumb,
                                clientX: left + 1
                            });
                            simulant.fire(document, 'mousemove', {
                                clientX: left + 100
                            });
                            simulant.fire(track, 'mouseleave');
                            setTimeout(() => {
                                expect(track.style.opacity).toEqual('1');
                                done();
                            }, 200);
                        }, 100);
                    });
                });
            });
        });
        describe('when dragging y-axis', () => {
            it('should show tracks', done => {
                render((
                    <Scrollbars
                        autoHide
                        autoHideTimeout={10}
                        autoHideDuration={10}
                        style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    const { thumbVertical: thumb, trackVertical: track } = this;
                    const { top } = thumb.getBoundingClientRect();
                    simulant.fire(thumb, 'mousedown', {
                        target: thumb,
                        clientY: top + 1
                    });
                    simulant.fire(document, 'mousemove', {
                        clientY: top + 100
                    });
                    setTimeout(() => {
                        expect(track.style.opacity).toEqual('1');
                        done();
                    }, 100);
                });
            });
            it('should hide tracks on end', done => {
                render((
                    <Scrollbars
                        autoHide
                        autoHideTimeout={10}
                        autoHideDuration={10}
                        style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    const { thumbVertical: thumb, trackVertical: track } = this;
                    const { top } = thumb.getBoundingClientRect();
                    simulant.fire(thumb, 'mousedown', {
                        target: thumb,
                        clientY: top + 1
                    });
                    simulant.fire(document, 'mouseup');
                    setTimeout(() => {
                        expect(track.style.opacity).toEqual('0');
                        done();
                    }, 100);
                });
            });
            describe('and leaving track', () => {
                it('should not hide tracks', done => {
                    render((
                        <Scrollbars
                            autoHide
                            autoHideTimeout={10}
                            autoHideDuration={10}
                            style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        setTimeout(() => {
                            const { thumbVertical: thumb, trackVertical: track } = this;
                            const { top } = thumb.getBoundingClientRect();
                            simulant.fire(thumb, 'mousedown', {
                                target: thumb,
                                clientY: top + 1
                            });
                            simulant.fire(document, 'mousemove', {
                                clientY: top + 100
                            });
                            simulant.fire(track, 'mouseleave');
                            setTimeout(() => {
                                expect(track.style.opacity).toEqual('1');
                                done();
                            }, 200);
                        }, 100);
                    });
                });
            });
        });
    });

    describe('when autoHide is disabed', () => {
        describe('enter/leave track', () => {
            describe('when entering horizontal track', () => {
                it('should not call `showTracks`', done => {
                    render((
                        <Scrollbars style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        const spy = spyOn(this, 'showTracks');
                        const { trackHorizontal: track } = this;
                        simulant.fire(track, 'mouseenter');
                        expect(spy.calls.length).toEqual(0);
                        done();
                    });
                });
            });
            describe('when leaving horizontal track', () => {
                it('should not call `hideTracks`', done => {
                    render((
                        <Scrollbars style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        const spy = spyOn(this, 'hideTracks');
                        const { trackHorizontal: track } = this;
                        simulant.fire(track, 'mouseenter');
                        simulant.fire(track, 'mouseleave');
                        setTimeout(() => {
                            expect(spy.calls.length).toEqual(0);
                            done();
                        }, 100);
                    });
                });
            });
            describe('when entering vertical track', () => {
                it('should not call `showTracks`', done => {
                    render((
                        <Scrollbars style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        const spy = spyOn(this, 'showTracks');
                        const { trackVertical: track } = this;
                        simulant.fire(track, 'mouseenter');
                        expect(spy.calls.length).toEqual(0);
                        done();
                    });
                });
            });
            describe('when leaving vertical track', () => {
                it('should not call `hideTracks`', done => {
                    render((
                        <Scrollbars style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        const spy = spyOn(this, 'hideTracks');
                        const { trackVertical: track } = this;
                        simulant.fire(track, 'mouseenter');
                        simulant.fire(track, 'mouseleave');
                        setTimeout(() => {
                            expect(spy.calls.length).toEqual(0);
                            done();
                        }, 100);
                    });
                });
            });
        });
    });
}
