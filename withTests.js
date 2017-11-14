/* eslint-disable import/no-extraneous-dependencies */
import withTests from 'storybook-addon-jest';
import jestTestResults from './.jest-test-results.json';

export default withTests(jestTestResults, {
  filesExt: '.test.js',
});
