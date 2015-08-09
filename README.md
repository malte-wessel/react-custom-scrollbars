react-custom-scrollbars
=========================

* lightweight scrollbars made of 100% react goodness
* native scrolling for mobile devices
* no dependencies
* no extra stylesheets
* fully customizable
* IE9+ support
* ^react@0.14.0-beta3
* inspired by noeldelgado's great [gemini-scrollbar](https://github.com/noeldelgado/gemini-scrollbar)
* [check out the demo](http://malte-wessel.github.io/react-custom-scrollbars/)

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
        view={props => <div {...props} className="view"/>}>
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

The following properties expect a react component to be returned. You can customize the component to your needs. 

* `scrollbarHorizontal`: (Function) Horizontal scrollbar component
* `scrollbarVertical`: (Function) Vertical scrollbar component
* `thumbHorizontal`: (Function) Horizontal thumb component
* `thumbVertical`: (Function) Vertical thumb component
* `view`: (Function) The component your content will be rendered in

**Don't forget to pass the received props to your custom component. Example:**

```javascript
class CustomScrollbars extends Component {
  render() {
    return (
      <Scrollbars
        // Set a custom className
        scrollbarHorizontal={props => <div {...props} className="scrollbar-vertical"/>}
        // Customize inline styles
        scrollbarVertical={({ style, ...props}) => {
          return <div style={{...style, padding: 20}} {...props}/>;
        }}>
        {this.props.children}
      </Scrollbars>
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

## License

MIT
