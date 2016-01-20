import expect from 'expect';
window.expect = expect;

const context = require.context('./test', true, /.*\.js$/);
context.keys().forEach(context);
