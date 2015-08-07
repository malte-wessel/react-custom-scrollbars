library-boilerplate
=========================

An opinionated setup I plan to use for my libraries.

It has CommonJS and UMD builds via Babel and Webpack, ESLint, and Mocha.  
It also has React-friendly examples folder with library code mapped to the sources.

If you use this, make sure to grep for “library-boilerplate” and replace every occurrence.
See `package.json` in the root and the example folder for the list of the available commands.

Note that this is an *opinionated* boilerplate. You might want to:

* Set `stage` to `2` in `.babelrc` so you don’t depend on language features that might be gone tomorrow;
* Remove `loose: ["all"]` from `.babelrc` so the behavior is spec-compliant.

You have been warned.
