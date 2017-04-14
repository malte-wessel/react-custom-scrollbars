import { Scrollbars } from 'react-custom-scrollbars';
import { render, unmountComponentAtNode, findDOMNode } from 'react-dom';
import React, { Component } from 'react';

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
    describe('when scrollbars are in flexbox environment', () => {
        it('should still work', done => {
            class Root extends Component {
                render() {
                    return (
                        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column' }}>
                            <Scrollbars ref="scrollbars">
                                <div style={{ width: 10000, height: 10000 }}/>
                            </Scrollbars>
                        </div>
                    );
                }
            }
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
}
