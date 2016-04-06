import { Scrollbars } from 'react-custom-scrollbars';
import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';

export default function createTests(scrollbarWidth) {
    describe('hide tracks', () => {
        let node;
        beforeEach(() => {
            node = document.createElement('div');
            document.body.appendChild(node);
        });
        afterEach(() => {
            unmountComponentAtNode(node);
            document.body.removeChild(node);
        });

        describe('when native scrollbars have a width', () => {
            if (!scrollbarWidth) return;
            describe('when content is greater than wrapper', () => {
                it('should show tracks', done => {
                    render((
                        <Scrollbars
                            hideTracksWhenNotNeeded
                            style={{ width: 100, height: 100 }}>
                            <div style={{ width: 200, height: 200 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        setTimeout(() => {
                            const { trackHorizontal, trackVertical } = this.refs;
                            expect(trackHorizontal.style.visibility).toEqual('visible');
                            expect(trackVertical.style.visibility).toEqual('visible');
                            done();
                        }, 100);
                    });
                });
            });
            describe('when content is smaller than wrapper', () => {
                it('should hide tracks', done => {
                    render((
                        <Scrollbars
                            hideTracksWhenNotNeeded
                            style={{ width: 100, height: 100 }}>
                            <div style={{ width: 50, height: 50 }}/>
                        </Scrollbars>
                    ), node, function callback() {
                        setTimeout(() => {
                            const { trackHorizontal, trackVertical } = this.refs;
                            expect(trackHorizontal.style.visibility).toEqual('hidden');
                            expect(trackVertical.style.visibility).toEqual('hidden');
                            done();
                        }, 100);
                    });
                });
            });
        });
    });
}
