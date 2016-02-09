import { Scrollbars } from 'react-custom-scrollbars';
import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import simulant from 'simulant';

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
}
