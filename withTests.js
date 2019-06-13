/* eslint-disable import/no-extraneous-dependencies */
import { withTests } from '@storybook/addon-jest';
import results from './.jest-test-results.json';

export default withTests({
  results,
});
