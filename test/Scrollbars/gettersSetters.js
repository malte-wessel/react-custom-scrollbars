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

    describe('getters', () => {
        function renderScrollbars(callback) {
            render((
                <Scrollbars style={{ width: 100, height: 100}}>
                    <div style={{ width: 200, height: 200}}/>
                </Scrollbars>
            ), node, callback);
        }
        describe('getScrollLeft', () => {
            it('should return scrollLeft', done => {
                renderScrollbars(function callback() {
                    this.scrollLeft(50);
                    expect(this.getScrollLeft()).toEqual(50);
                    done();
                });
            });
        });
        describe('getScrollTop', () => {
            it('should return scrollTop', done => {
                renderScrollbars(function callback() {
                    this.scrollTop(50);
                    expect(this.getScrollTop()).toEqual(50);
                    done();
                });
            });
        });
        describe('getScrollWidth', () => {
            it('should return scrollWidth', done => {
                renderScrollbars(function callback() {
                    expect(this.getScrollWidth()).toEqual(200);
                    done();
                });
            });
        });
        describe('getScrollHeight', () => {
            it('should return scrollHeight', done => {
                renderScrollbars(function callback() {
                    expect(this.getScrollHeight()).toEqual(200);
                    done();
                });
            });
        });
        describe('getClientWidth', () => {
            it('should return scrollWidth', done => {
                renderScrollbars(function callback() {
                    expect(this.getClientWidth()).toEqual(100);
                    done();
                });
            });
        });
        describe('getClientHeight', () => {
            it('should return scrollHeight', done => {
                renderScrollbars(function callback() {
                    expect(this.getClientHeight()).toEqual(100);
                    done();
                });
            });
        });
         describe('getPaddingWidth', () => {
            it('should return scrollHeight', done => {
                renderScrollbars(function callback() {
                    expect(this.getPaddingWidth()).toEqual(100);
                    done();
                });
            });
        });
         describe('getPaddingHeight', () => {
            it('should return scrollHeight', done => {
                renderScrollbars(function callback() {
                    expect(this.getPaddingHeight()).toEqual(100);
                    done();
                });
            });
        });
    });

    describe('setters', () => {
        function renderScrollbars(callback) {
            render((
                <Scrollbars style={{ width: 100, height: 100 }}>
                    <div style={{ width: 200, height: 200 }}/>
                </Scrollbars>
            ), node, callback);
        }
        describe('scrollLeft/scrollToLeft', () => {
            it('should scroll to given left value', done => {
                renderScrollbars(function callback() {
                    this.scrollLeft(50);
                    expect(this.getScrollLeft()).toEqual(50);
                    this.scrollToLeft();
                    expect(this.getScrollLeft()).toEqual(0);
                    this.scrollLeft(50);
                    this.scrollLeft();
                    expect(this.getScrollLeft()).toEqual(0);
                    done();
                });
            });
        });
        describe('scrollTop/scrollToTop', () => {
            it('should scroll to given top value', done => {
                renderScrollbars(function callback() {
                    this.scrollTop(50);
                    expect(this.getScrollTop()).toEqual(50);
                    this.scrollToTop();
                    expect(this.getScrollTop()).toEqual(0);
                    this.scrollTop(50);
                    this.scrollTop();
                    expect(this.getScrollTop()).toEqual(0);
                    done();
                });
            });
        });
        describe('scrollToRight', () => {
            it('should scroll to right', done => {
                renderScrollbars(function callback() {
                    this.scrollToRight();
                    expect(this.getScrollLeft()).toEqual(100);
                    done();
                });
            });
        });
        describe('scrollToBottom', () => {
            it('should scroll to bottom', done => {
                renderScrollbars(function callback() {
                    this.scrollToBottom();
                    expect(this.getScrollTop()).toEqual(100);
                    done();
                });
            });
        });
    });
}
