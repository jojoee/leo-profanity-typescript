# leo-profanity-typescript

Based on [jojoee/leo-profanity](https://github.com/jojoee/leo-profanity) v1.24, using [Jest](https://github.com/facebook/jest) instead of [Mocha](https://github.com/mochajs/mocha) for test framework

## TODO
- [x] [RollupJS](https://rollupjs.org/): multiple optimized bundles
- [x] [Jest](http://facebook.github.io/jest/): tests and coverage
- [x] [Prettier](https://github.com/prettier/prettier) and [TSLint](https://github.com/palantir/tslint): code formatting
- [x] [TypeDoc](http://typedoc.org/): docs automatic generation and deployment to `gh-pages`
- [ ] `*.d.ts`: automatic types file generation
- [x] [Travis](https://travis-ci.org/): build CI
- [x] [Coveralls](https://coveralls.io/): test coverage report
- [ ] Increase `coverageThreshold`
- [ ] `semantic-release`
- [ ] Support string for `add` and `remove` methods
- [ ] Deploy docs after commit
- [ ] Make it `static`
- [ ] Remove `require` syntax
- [ ] Test build files `.es5.js` and `.umd.js`
- [ ] Commit via `npm run commit` only

## NPM scripts

```
npm test
npm start: npm run build in watch mode
npm run test:watch: test in watch mode
npm run test:prod: linting + coverage
npm run build: generate bundles and typings, create docs
npm run lint: lints
npm run commit
```

## Reference
- [jojoee/leo-profanity](https://github.com/jojoee/leo-profanity)
- Start at commit f0bc9aa (264commits) of starter [alexjoverm/typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter)
- Alternative starter [bitjson/typescript-starter](https://github.com/bitjson/typescript-starter)
