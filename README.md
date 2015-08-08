react-custom-scrollbars
=========================

* lightweight react scrollbars
* inspired by noeldelgado's great [gemini-scrollbar](https://github.com/noeldelgado/gemini-scrollbar)
* native scrolling for mobile devices
* fully customizable
* no dependencies
* IE9+ support
* ^react@0.14.0-beta3
* [check out the demo](http://malte-wessel.github.io/react-custom-scrollbars/)

## Installation
```bash
npm install react-custom-scrollbars --save
```

## Usage
```javascript
class App extends Component {
  render() {
    return (
      <div style={{ width: 500, height: 300 }}>
        <Scrollbars>
          <p>Lorem ipsum dolor sit amet, ...</p>
          <p>Lorem ipsum dolor sit amet, ...</p>
          <p>Lorem ipsum dolor sit amet, ...</p>
          <p>Lorem ipsum dolor sit amet, ...</p>
        </Scrollbars>
      </div>
    );
  }
}
```

## Customization
```javascript
class CustomScrollbars extends Component {
  render() {
    return (
      <Scrollbars
        className="container"
        scrollbarHorizontal={props => <div {...props} className="scrollbar-horizontal" />}
        scrollbarVertical={props => <div {...props} className="scrollbar-vertical"/>}
        thumbHorizontal={props => <div {...props} className="thumb-horizontal"/>}
        thumbVertical={props => <div {...props} className="thumb-vertical"/>}
        view={props => <div {...props} className="view"/>}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div style={{ width: 500, height: 300 }}>
        <CustomScrollbars>
          <p>Lorem ipsum dolor sit amet, ...</p>
          <p>Lorem ipsum dolor sit amet, ...</p>
          <p>Lorem ipsum dolor sit amet, ...</p>
          <p>Lorem ipsum dolor sit amet, ...</p>
        </CustomScrollbars>
      </div>
    );
  }
}
```

## Examples

Run the simple example:
```bash
cd react-custom-scrollbars/examples/simple
npm install
npm start
```
