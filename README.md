# Alto Design System
[![CircleCI](https://circleci.com/gh/beqom/alto.svg?style=svg)](https://circleci.com/gh/beqom/alto)

UX guidelines, HTML/CSS framework, and React components working together to craft exceptional experiences at beqom.

- [Alto website](https://beqom.github.io/alto)
- [React Demo](https://beqom.github.io/alto/storybook)

## Getting started

### Install

```sh
$ npm install @beqom/alto-ui --save
```

### Usage

```js
import Button from '@beqom/alto-ui/Button';
import TextField from '@beqom/alto-ui/Form/TextField';

const MyComponent = () => {
  <div>
    <TextField placeholder="Search..." />
    <Button outline success>
      Search
    </Button>
  </div>;
};
```

## Contributing

### Setup

1. Clone or download project
2. `yarn install` or (`npm install`)
3. `yarn test:output` or `npm run test:output`
4. `yarn start:app` or `npm run start:app`

### Deploying on Github

Checkout the branch you want to deploy (usually `master`):

```sh
$ git checkout master
```

Be sure that all commits have beed pushed to Github. Then run:

```sh
$ npm run deploy
```

## React component Sass theming:

https://github.com/webpack-contrib/sass-loader/issues/49#issuecomment-90648288
