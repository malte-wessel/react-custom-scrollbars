import React, { createClass } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default createClass({

    displayName: 'App',

    render() {
        return (
           <Scrollbars style={{height: 100, width: 100}}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
        );
    }
});
