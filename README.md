# Alto UI

[Documentation](https://beqom.github.io/alto-ui)

## Getting started

### Install

```sh
$ npm install @beqom/alto-ui --save

# or

$ npm add @beqom/alto-ui
```

Wrap the app inside AltoUIRoot:

```js
import AltoUIRoot from '@beqom/alto-ui/AltoUIRoot';

const App = () => {
  <AltoUIRoot resetCSS>
    <Router />
  </AltoUIRoot>
}
```

It will setup some basic styles and allow you to provide a custom theme.

**Props**:
- resetCSS: `bool` - should add a reset CSS
- theme: `object` - a custom theme

### Usage

```js
import Button from '@beqom/alto-ui/Button';
import TextField from '@beqom/alto-ui/Form/TextField';

const MyComponent = () => {
  <div>
    <TextField placeholder="Search..." />
    <Button outline success>Search</Button>
  </div>
}
```

## Contributing

### Setup

1. Clone or download project
2. `yarn install` or (`npm install`)
4. `yarn test:output` or `npm run test:output`
3. `yarn start` or `npm start`


### Deploying on Github

Checkout the branch you want to deploy (usually `master`):

```sh
$ git checkout master
```

Be sure taht all commits have beed pushed to Github. Then run:

```sh
$ npm run deploy

# or

$ yarn deploy
```
