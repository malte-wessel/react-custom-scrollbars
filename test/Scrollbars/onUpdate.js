import { Scrollbars } from 'react-custom-scrollbars';
import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';

export default function createTests() {
    let node;
    beforeEach(() => {
        node = document.createElement('div');
        document.body.appendChild(node);
    });
    afterEach(() => {
        unmountComponentAtNode(node);
        document.body.removeChild(node);
    });

    describe('onUpdate', () => {
        describe('when scrolling x-axis', () => {
            it('should call `onUpdate`', done => {
                const spy = createSpy();
                render((
                    <Scrollbars style={{ width: 100, height: 100 }} onUpdate={spy}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    this.scrollLeft(50);
                    setTimeout(() => {
                        expect(spy.calls.length).toEqual(1);
                        done();
                    }, 100);
                });
            });
        });
        describe('when scrolling y-axis', () => {
            it('should call `onUpdate`', done => {
                const spy = createSpy();
                render((
                    <Scrollbars style={{ width: 100, height: 100 }} onUpdate={spy}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    this.scrollTop(50);
                    setTimeout(() => {
                        expect(spy.calls.length).toEqual(1);
                        done();
                    }, 100);
                });
            });
        });

        describe('when resizing window', () => {
            it('should call onUpdate', done => {
                const spy = createSpy();
                render((
                    <Scrollbars style={{ width: 100, height: 100 }} onUpdate={spy}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    setTimeout(() => {
                        expect(spy.calls.length).toEqual(1);
                        done();
                    }, 100);
                });
            });
        });
    });
}
