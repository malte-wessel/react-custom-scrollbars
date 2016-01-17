react-custom-scrollbars
=========================

[![npm](https://img.shields.io/badge/npm-react--custom--scrollbars-brightgreen.svg?style=flat-square)]()
[![npm version](https://img.shields.io/npm/v/react-custom-scrollbars.svg?style=flat-square)](https://www.npmjs.com/package/react-custom-scrollbars)
[![npm downloads](https://img.shields.io/npm/dm/react-custom-scrollbars.svg?style=flat-square)](https://www.npmjs.com/package/react-custom-scrollbars)

* lightweight scrollbars made of 100% react goodness
* frictionless native browser scrolling
* native scrollbars for mobile devices
* fully customizable
* `requestAnimationFrame` for 60fps
* no extra stylesheets
* IE9+ support
* **[check out the demo](http://malte-wessel.github.io/react-custom-scrollbars/)**

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [API](#api)
- [Examples](#examples)
- [License](#license)

## Installation
```bash
npm install react-custom-scrollbars --save
```

## Usage
```javascript
import { Scrollbars } from 'react-custom-scrollbars';

class App extends Component {
  render() {
    return (
      <Scrollbars style={{ width: 500, height: 300 }}>
        <p>Lorem ipsum dolor sit amet, ...</p>
        <p>Lorem ipsum dolor sit amet, ...</p>
        <p>Lorem ipsum dolor sit amet, ...</p>
        <p>Lorem ipsum dolor sit amet, ...</p>
      </Scrollbars>
    );
  }
}
```

Don't forget to set the `viewport` meta tag, if you want to support mobile devices

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
```

## Customization
```javascript
import { Scrollbars } from 'react-custom-scrollbars';

class CustomScrollbars extends Component {
  render() {
    return (
      <Scrollbars
        className="container"
        renderScrollbarHorizontal={props => <div {...props} className="scrollbar-horizontal" />}
        renderScrollbarVertical={props => <div {...props} className="scrollbar-vertical"/>}
        renderThumbHorizontal={props => <div {...props} className="thumb-horizontal"/>}
        renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
        renderView={props => <div {...props} className="view"/>}>
        {this.props.children}
      </Scrollbars>
    );
  }
}

class App extends Component {
  render() {
    return (
      <CustomScrollbars style={{ width: 500, height: 300 }}>
        <p>Lorem ipsum dolor sit amet, ...</p>
        <p>Lorem ipsum dolor sit amet, ...</p>
        <p>Lorem ipsum dolor sit amet, ...</p>
        <p>Lorem ipsum dolor sit amet, ...</p>
      </CustomScrollbars>
    );
  }
}
```

## API

### `<Scrollbars>`

#### Props

* `onScroll`: (Function) Event handler. Will be called with the native scroll event and some handy values about the current position.
  * **Signature**: `onScroll(event, values)`
  * `event`: (Event) Native onScroll event
  * `values`: (Object) Values about the current position
    * `values.top`: (Number) scrollTop progess, from 0 to 1
    * `values.left`: (Number) scrollLeft progess, from 0 to 1
    * `values.clientWidth`: (Number) width of the view
    * `values.clientHeight`: (Number) height of the view
    * `values.scrollWidth`: (Number) native scrollWidth
    * `values.scrollHeight`: (Number) native scrollHeight
    * `values.scrollLeft`: (Number) native scrollLeft
    * `values.scrollTop`: (Number) native scrollTop
* **The following properties expect a react element to be returned. You can customize the element to your needs.**
* `renderScrollbarHorizontal`: (Function) Horizontal scrollbar element
* `renderScrollbarVertical`: (Function) Vertical scrollbar element
* `renderThumbHorizontal`: (Function) Horizontal thumb element
* `renderThumbVertical`: (Function) Vertical thumb element
* `renderView`: (Function) The element your content will be rendered in

**Don't forget to pass the received props to your custom element. Example:**

```javascript
import { Scrollbars } from 'react-custom-scrollbars';

class CustomScrollbars extends Component {
  render() {
    return (
      <Scrollbars
        // Set a custom className
        renderScrollbarHorizontal={props => <div {...props} className="scrollbar-vertical"/>}
        // Customize inline styles
        renderScrollbarVertical={({ style, ...props}) => {
          return <div style={{...style, padding: 20}} {...props}/>;
        }}>
        {this.props.children}
      </Scrollbars>
    );
  }
}
```

#### Methods

* `scrollTop(top)`: scroll to the top value
* `scrollLeft(left)`: scroll to the left value
* `scrollToTop()`: scroll to top
* `scrollToBottom()`: scroll to bottom
* `scrollToLeft()`: scroll to left
* `scrollToRight()`: scroll to right
* `getScrollLeft`: get scrollLeft value
* `getScrollTop`: get scrollTop value
* `getScrollWidth`: get scrollWidth value
* `getScrollHeight`: get scrollHeight value
* `getWidth`: get view client width
* `getHeight`: get view client height

```javascript
import { Scrollbars } from 'react-custom-scrollbars';

class App extends Component {
  handleClick() {
    this.refs.scrollbars.scrollToTop()
  },
  render() {
    return (
      <div>
        <Scrollbars
          ref="scrollbars"
          style={{ width: 500, height: 300 }}>
          {/* your content */}
        </Scrollbars>
        <button onClick={this.handleClick.bind(this)}>
            Scroll to top
        </button>
      </div>
    );
  }
}
```

### Receive values about the current position

```javascript
class CustomScrollbars extends Component {
  handleScroll(event, values) {
    console.log(values);
    /*
    {
        left: 0,
        top: 0.21513353115727002
        clientWidth: 952
        clientHeight: 300
        scrollWidth: 952
        scrollHeight: 1648
        scrollLeft: 0
        scrollTop: 290
    }
    */
  }
  render() {
    return (
      <Scrollbars onScroll={this.handleScroll}>
        {this.props.children}
      </Scrollbars>
    );
  }
}
```

## Examples

Run the simple example:
```bash
# Make sure that you've installed the dependencies
npm install
# Move to example directory
cd react-custom-scrollbars/examples/simple
npm install
npm start
```

## License

MIT
